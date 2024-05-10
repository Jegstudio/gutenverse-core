
import { __ } from '@wordpress/i18n';
import { withSelect, dispatch } from '@wordpress/data';
import { getPluginRequirementStatus } from './library-helper';
import { applyFilters } from '@wordpress/hooks';
import { IconDownloadSVG, IconDownload2SVG, IconCrownBannerSVG, IconKeySVG  } from 'gutenverse-core/icons';
import { importImage, importSingleLayoutContent } from 'gutenverse-core/requests';
import { injectImagesToContent } from 'gutenverse-core/helper';
import { parse } from '@wordpress/blocks';
import { Loader } from 'react-feather';

const ImportLayout = ({ data, activePage, closeImporter, plugins, importer, setPluginInstallMode }) => {
    const { isPro, slug, title, compatibleVersion, requirements, customAPI = null, customArgs = {} } = data;
    const pluginRequirement = getPluginRequirementStatus({
        plugins: plugins.installedPlugin,
        requirements,
        compatibleVersion
    });

    const insertBlocksTemplate = (data) => {
        return new Promise((resolve) => {
            const { insertBlocks } = dispatch('core/block-editor');
            const { contents, images } = data;
            const patterns = injectImagesToContent(contents, images);
            const blocks = parse(patterns);
            insertBlocks(blocks);
            resolve();
        });
    };

    const importContent = () => {
        dispatch( 'gutenverse/library' ).setLayoutProgress(__('Fetching Data', '--gctd--'));
        dispatch( 'gutenverse/library' ).setLockLayoutImport({
            layout: slug,
            title: title
        });

        const params = customAPI ? {
            slug,
            active: activePage,
            ...customArgs
        } : applyFilters(
            'gutenverse.library.import.parameter',
            {
                slug,
                active: activePage
            }
        );

        importSingleLayoutContent(params, customAPI).then(result => {
            const data = JSON.parse(result);
            dispatch( 'gutenverse/library' ).setLayoutProgress(__('Importing Assets', '--gctd--'));
            return importImage(data);
        }).then(result => {
            dispatch( 'gutenverse/library' ).setLayoutProgress(__('Deploying Content', '--gctd--'));
            return insertBlocksTemplate(result);
        }).finally(() => {
            setTimeout(() => {
                closeImporter();
                dispatch( 'gutenverse/library' ).setLockLayoutImport({
                    layout: null,
                    title: null
                });
            }, 200);
        }).catch((e) => {
            console.log(e);
            alert('Import Failed, please try again');
        });
    };

    const ImportButton = () => {
        if (pluginRequirement?.length) {
            return <div className="layout-button manage" onClick={() => {
                setPluginInstallMode(true);
            }}>
                <span>{__('Manage Required Plugin', '--gctd--')}</span>
            </div >;
        } else {
            return <div className="layout-button import-page" onClick={importContent}>
                <span>{__('Import this page', '--gctd--')}</span><IconDownload2SVG />
            </div >;
        }

    };

    const ProButton = () => {
        const { upgradeProUrl } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};

        return <a href={upgradeProUrl} target="_blank" rel="noreferrer" className="layout-button go-pro">
            {__('Upgrade to PRO', '--gctd--')}
            <IconCrownBannerSVG />
        </a>;
    };

    const renderButton = () => {
        if (isPro) {
            return <ProButton />;
        } else {
            return <ImportButton />;
        }
    };

    const theButton = () => {
        let button = applyFilters(
            'gutenverse.library.layout.import',
            renderButton(),
            <ImportButton />,
            isPro
        );

        if (importer.lockLayoutImport?.layout) {
            if (slug !== importer.lockLayoutImport?.layout) {
                button = <div className="layout-button import-page loading">
                    <Loader size={18} />
                    <span>{__('Importing ', '--gctd--')} {importer.lockLayoutImport?.title}</span>
                </div>;
            } else {
                button = <div className="layout-button import-page loading">
                    <Loader size={18} />
                    <span>{importer.layoutProgress}</span>
                </div>;
            }
        }

        return button;
    };

    return theButton();
};


export default withSelect(select => {
    const { getLibraryData, getPluginData, getImporterData } = select('gutenverse/library');

    return {
        library: getLibraryData(),
        plugins: getPluginData(),
        importer: getImporterData(),
    };
})(ImportLayout);
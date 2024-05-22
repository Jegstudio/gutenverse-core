import { __ } from '@wordpress/i18n';
import { importImage, importSingleSectionContent } from 'gutenverse-core/requests';
import { withSelect, dispatch } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { IconDownloadSVG, IconVerifiedSVG } from 'gutenverse-core/icons';
import { Loader } from 'react-feather';
import { injectImagesToContent } from 'gutenverse-core/helper';
import { parse } from '@wordpress/blocks';

const ImportSectionButton = ({ data, closeImporter, importer }) => {
    const { pro: isPro, slug, customAPI = null, customArgs = {} } = data;

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

    const importContent = (e) => {
        e.stopPropagation();
        dispatch( 'gutenverse/library' ).setSectionProgress(__('Fetching Data', '--gctd--'));
        dispatch( 'gutenverse/library' ).setLockSectionImport(slug);

        const params = customAPI ? {
            slug,
            ...customArgs
        } : applyFilters(
            'gutenverse.library.import.parameter',
            {
                slug,
            }
        );

        importSingleSectionContent(params, customAPI).then(result => {
            const data = JSON.parse(result);
            dispatch( 'gutenverse/library' ).setSectionProgress(__('Importing Assets', '--gctd--'));
            return importImage(data);
        }).then(result => {
            dispatch( 'gutenverse/library' ).setSectionProgress(__('Deploying Content', '--gctd--'));
            return insertBlocksTemplate(result);
        }).finally(() => {
            setTimeout(() => {
                closeImporter();
                dispatch( 'gutenverse/library' ).setLockSectionImport(null);
            }, 200);
        }).catch(() => {
            alert('Import Failed, please try again');
        });
    };

    const ImportButton = () => {
        return (
            <div className="section-button import-section">
                <div className="section-button-inner" onClick={importContent}>
                    <IconDownloadSVG />
                    <span>{__('Import this section', '--gctd--')}</span>
                </div>
            </div>
        );
    };

    const ProButton = () => {
        const { upgradeProUrl } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};

        return (
            <div className="section-button import-section">
                <div className="section-button-inner" onClick={() => { window.open(upgradeProUrl); }}>
                    <IconVerifiedSVG />
                    <span>{__('Upgrade to Pro', '--gctd--')}</span>
                </div>
            </div>
        );
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
            'gutenverse.library.section.import',
            renderButton(),
            <ImportButton />,
            isPro
        );

        if (importer.lockSectionImport) {
            if (slug != importer.lockSectionImport) {
                button = (
                    <div className="section-button import-section importing">
                        <div className="section-button-inner">
                            <span>{__('Import on Progress', '--gctd--')}</span>
                        </div>
                    </div>
                );
            } else {
                button = (
                    <div className="section-button import-section importing">
                        <div className="section-button-inner">
                            <div className="rotating">
                                <Loader size={18} />
                            </div>
                            <span>{importer.sectionProgress}</span>
                        </div>
                    </div>
                );
            }
        }

        return button;
    };

    return theButton();
};

export default withSelect(select => {
    const { getImporterData } = select('gutenverse/library');

    return {
        importer: getImporterData()
    };
})(ImportSectionButton);

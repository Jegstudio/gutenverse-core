
import { __ } from '@wordpress/i18n';
import { withSelect, dispatch, select } from '@wordpress/data';
import { getPluginRequirementStatus } from './library-helper';
import { applyFilters } from '@wordpress/hooks';
import { IconDownload2SVG } from 'gutenverse-core/icons';
import { importImage, importSingleLayoutContent } from 'gutenverse-core/requests';
import { injectImagesToContent } from 'gutenverse-core/helper';
import { parse } from '@wordpress/blocks';
import { Loader } from 'react-feather';
import ButtonUpgradePro from '../pro/button-upgrade-pro';
import { upgradeProUrl, clientUrl, activeTheme } from 'gutenverse-core/config';
import { store as editorStore } from '@wordpress/editor';
import { ImportNotice } from './library-helper';

const ImportLayout = ({ data, activePage, closeImporter, plugins, importer, setPluginInstallMode, setExporting, setLibraryError }) => {
    const { isPro, licenseType, slug, title, compatibleVersion, requirements, customAPI = null, customArgs = {} } = data;
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

            const renderingMode = select(editorStore).getRenderingMode();

            if (renderingMode === 'template-locked') {
                setLibraryError(() => {
                    return <ImportNotice
                        resolve={resolve}
                        blocks={blocks}
                        supportGlobalImport={false}
                        setLibraryError={setLibraryError}
                        processGlobalStyle={() => {}}
                    />;
                });
            } else {
                insertBlocks(blocks);
                resolve();
            }
        });
    };

    const importContent = () => {
        setExporting({show: true, message: 'Fetching Data...', progress: ''});
        dispatch( 'gutenverse/library' ).setLayoutProgress(__('Fetching Data', '--gctd--'));
        dispatch( 'gutenverse/library' ).setLockLayoutImport({
            layout: slug,
            title: title
        });

        let fail = 0;

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
        setTimeout(() => {
            setExporting({show: true, message: 'Fetching Data...', progress: '1/4'});
        }, 300);

        const processImages = async ({ images, contents }) => {
            let count = 0;
            const imgs = [];
            for (const img of images) {
                count++;
                setExporting(prev => ({ ...prev, message: `Importing Image Assets ${count} of ${images.length + 1}`, progress: '2/4' }));
                const result = await importImage(img).catch(() => {
                    imgs.push({id: 0, url: ''});
                    fail++;
                });
                if (result) {
                    imgs.push(result);
                }
            }
            return {
                images: imgs,
                contents
            };
        };

        importSingleLayoutContent(params, customAPI)
            .then(result => {
                const data = JSON.parse(result);
                dispatch('gutenverse/library').setLayoutProgress(__('Importing Assets', '--gctd--'));
                setExporting({show: true, message: 'Importing Assets...', progress: '2/4'});
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(processImages(data));
                    }, 1000); // 1 second delay
                });
            })
            .then(result => {
                dispatch('gutenverse/library').setLayoutProgress(__('Deploying Content', '--gctd--'));
                setExporting({show: true, message: 'Deploying Content...', progress: '3/4'});
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(insertBlocksTemplate(result));
                    }, 500); // 1 second delay
                });
            })
            .finally(() => {
                setExporting({show: true, message: 'Done!', progress: '4/4'});
                setTimeout(() => {
                    dispatch('gutenverse/library').setLockLayoutImport({
                        layout: null,
                        title: null
                    });
                    closeImporter();
                    setExporting({show: false, message: 'Done!', progress: ''});
                    if (fail) {
                        dispatch('gutenverse/library').setImportNotice(`${fail} image not imported.`);
                    }
                }, 300);
            })
            .catch(() => {
                setExporting({show: true, message: 'Failed!', progress: '4/4'});
                setTimeout(() => {
                    dispatch('gutenverse/library').setImportNotice('Please Try Again.');
                    setExporting({show: false, message: 'Failed!', progress: ''});
                }, 300);
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
        return <ButtonUpgradePro licenseType={licenseType} licenseActiveButton={ImportButton()} isBanner={true} link={`${upgradeProUrl}?utm_source=gutenverse&utm_medium=librarylayout&utm_client_site=${clientUrl}&utm_client_theme=${activeTheme}`} location="card-pro" customStyles={{ padding: '12px 20px' }}/>;
    };

    const renderButton = () => {
        if (isPro) {
            return <ProButton />;
        } else {
            return <ImportButton />;
        }
    };

    const theButton = () => {
        let button = renderButton();

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
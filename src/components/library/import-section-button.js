import { __ } from '@wordpress/i18n';
import { importImage, importSingleSectionContent } from 'gutenverse-core/requests';
import { withSelect, dispatch, useDispatch, select } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { IconDownload2SVG } from 'gutenverse-core/icons';
import { Loader } from 'react-feather';
import { getParentId, injectImagesToContent } from 'gutenverse-core/helper';
import { parse } from '@wordpress/blocks';
import ButtonUpgradePro from '../pro/button-upgrade-pro';
import { activeTheme, clientUrl, upgradeProUrl } from 'gutenverse-core/config';
import { store as editorStore } from '@wordpress/editor';

const ImportSectionButton = props => {
    const { data, closeImporter, importer, setShowOverlay, setExporting, setSelectItem, setLibraryError } = props;
    const { pro: isPro, slug, customAPI = null, customArgs = {} } = data;
    let fail = 0;

    const ImportNotice = ({ resolve, blocks }) => {
        const { setRenderingMode } = useDispatch(editorStore);
        const { insertBlocks } = dispatch('core/block-editor');

        const importContent = () => {
            resolve();
            setLibraryError(false);
            setRenderingMode('post-only');
            setTimeout(() => {
                insertBlocks(blocks);
            }, 500);
        };

        const cancelImport = () => {
            setLibraryError(false);
            resolve();
        };

        return <div id="gutenverse-warn">
            <div className="gutenverse-editor-warn">
                <div className="gutenverse-warn-wrapper">
                    <div className="gutenverse-warn-header">
                        <span>{__('Import Section Notice', '--gctd--')}</span>
                    </div>
                    <div className="gutenverse-warn-description">
                        {__('We can\'t import content because the Post Content is missing from your Template. Would you like to switch to Post View instead in order to import the content?', '--gctd--')}
                    </div>
                    <div className="gutenverse-warn-footer">
                        <button className="cancel" onClick={() => cancelImport()}>Dismiss</button>
                        <button className="primary" onClick={() => importContent()}>Keep Import</button>
                    </div>
                </div>
            </div>
        </div>;
    };

    const insertBlocksTemplate = (data) => {
        return new Promise((resolve) => {
            const { insertBlocks } = dispatch('core/block-editor');
            const { contents, images } = data;
            const patterns = injectImagesToContent(contents, images);

            const blocks = parse(patterns);
            const renderingMode = select(editorStore).getRenderingMode();

            if (renderingMode === 'template-locked') {
                setLibraryError(() => {
                    return <ImportNotice resolve={resolve} blocks={blocks} />;
                });
            } else {
                insertBlocks(blocks);
                resolve();
            }
        });
    };

    const importContent = (e) => {
        setExporting({ show: true, message: 'Fetching Data...', progress: '' });
        setSelectItem(data);
        setShowOverlay(true);
        setTimeout(() => {
            setExporting(prev => ({ ...prev, progress: '1/4' }));
        }, 1000);
        e.stopPropagation();
        dispatch('gutenverse/library').setSectionProgress(__('Fetching Data', '--gctd--'));
        dispatch('gutenverse/library').setLockSectionImport(slug);

        const params = customAPI ? {
            slug,
            ...customArgs
        } : applyFilters(
            'gutenverse.library.import.parameter',
            {
                slug,
            }
        );

        const processImages = async ({ images, contents }) => {
            let count = 0;
            const imgs = [];
            for (const img of images) {
                count++;
                setExporting(prev => ({ ...prev, message: `Importing Image Assets ${count} of ${images.length + 1}`, progress: '2/4' }));
                const result = await importImage(img).catch(() => {
                    imgs.push({ id: 0, url: '' });
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

        importSingleSectionContent(params, customAPI).then(result => {
            const data = JSON.parse(result);
            setExporting(prev => ({ ...prev, message: 'Importing Assets...', progress: '2/4' }));
            dispatch('gutenverse/library').setSectionProgress(__('Importing Assets', '--gctd--'));
            return processImages(data);
        }).then(result => {
            setExporting(prev => ({ ...prev, message: 'Deploying Content...', progress: '3/4' }));
            dispatch('gutenverse/library').setSectionProgress(__('Deploying Content', '--gctd--'));
            return insertBlocksTemplate(result);
        }).finally(() => {
            setExporting(prev => ({ ...prev, message: 'Done!', progress: '4/4' }));
            setTimeout(() => {
                setShowOverlay(false);
                dispatch('gutenverse/library').setLockSectionImport(null);
                closeImporter();
                setExporting({ show: false, message: 'Done!', progress: '' });
                if (fail) {
                    dispatch('gutenverse/library').setImportNotice(`${fail} image not imported.`);
                }
            }, 300);
        }).catch(() => {
            setExporting(prev => ({ ...prev, message: 'Failed!', progress: '4/4' }));
            setTimeout(() => {
                dispatch('gutenverse/library').setImportNotice('Please Try Again.');
                setShowOverlay(false);
                setExporting({ show: false, message: 'Failed!', progress: '' });
            }, 300);
        });
    };

    const ImportButton = () => {
        return (
            <div className="section-button import-section">
                <div className="section-button-inner" onClick={importContent}>
                    <span>{__('Import this section', '--gctd--')}</span>
                    <IconDownload2SVG />
                </div>
            </div>
        );
    };

    const ProButton = () => {
        return <ButtonUpgradePro licenseActiveButton={ImportButton()} link={`${upgradeProUrl}?utm_source=gutenverse&utm_medium=librarysection&utm_client_site=${clientUrl}&utm_client_theme=${activeTheme}`} isBanner={true} location="card-pro" />;
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

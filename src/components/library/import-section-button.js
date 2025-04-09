import { __ } from '@wordpress/i18n';
import { importImage, importSingleSectionContent } from 'gutenverse-core/requests';
import { withSelect, dispatch, useDispatch, select } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { IconDownload2SVG } from 'gutenverse-core/icons';
import { Loader } from 'react-feather';
import { injectImagesToContent } from 'gutenverse-core/helper';
import { parse } from '@wordpress/blocks';
import ButtonUpgradePro from '../pro/button-upgrade-pro';
import { activeTheme, clientUrl, upgradeProUrl } from 'gutenverse-core/config';
import { store as editorStore } from '@wordpress/editor';
import { createPortal, useState } from '@wordpress/element';
import Notice from '../notice';

const ImportSectionButton = props => {
    const { data, closeImporter, importer, setShowOverlay, setExporting, setSelectItem, setLibraryError, setSingleId, setSingleData, singleData } = props;
    const { pro: isPro, slug, customAPI = null, customArgs = {} } = data;
    const [editorWarn, setEditorWarn] = useState(false);
    let fail = 0;

    const ImportNotice = ({ resolve, blocks }) => {
        const { setRenderingMode } = useDispatch(editorStore);
        const { insertBlocks } = dispatch('core/block-editor');

        const editContent = () => {
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

        return <Notice
            icon={<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4286 0.517446C11.0653 -0.172482 9.93558 -0.172482 9.5723 0.517446L0.122776 18.4514C0.0377128 18.6121 -0.0044578 18.7922 0.000372931 18.9742C0.00520366 19.1562 0.0568709 19.3338 0.150341 19.4898C0.24381 19.6457 0.375894 19.7747 0.533723 19.8641C0.691551 19.9535 0.869741 20.0004 1.05093 20H19.95C20.131 20.0004 20.3091 19.9536 20.4668 19.8642C20.6246 19.7749 20.7565 19.646 20.8499 19.4901C20.9433 19.3342 20.9949 19.1567 20.9996 18.9749C21.0044 18.793 20.9622 18.613 20.8771 18.4524L11.4286 0.517446ZM11.5504 16.8352H9.45051V14.7253H11.5504V16.8352ZM9.45051 12.6154V7.34077H11.5504L11.5515 12.6154H9.45051Z" fill="#FFB200" />
            </svg>}
            title={__('Import Section Notice', '--gctd--')}
            description={__('We can\'t import content because the Post Content is missing from your Template. Would you like to switch to Post View instead in order to import the content?', '--gctd--')}
            buttonText={__('Keep Import', '--gctd--')}
            cancelButtonText={__('Dismiss', '--gctd--')}
            cancelButton={true}
            onClick={editContent}
            onClose={cancelImport}
        />;

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

    const allowGlobal = true;

    const ImportButton = () => {
        return (allowGlobal && !singleData) ? (
            <div className="section-button import-section">
                <div className="section-button-inner" onClick={() => {
                    setSingleId(data.id);
                    setSingleData(data);
                }}>
                    <span>{__('Select this section', '--gctd--')}</span>
                    <IconDownload2SVG />
                </div>
            </div>
        ) : (
            <div className="section-button import-section">
                <div className="section-button-inner" onClick={(e) => {
                    const renderingMode = select(editorStore).getRenderingMode();
                    if (renderingMode === 'template-locked') {
                        setEditorWarn(true);
                    } else {
                        importContent(e);
                        setSingleId(null);
                        setSingleData(null);
                    }
                }}>
                    <span>{__('Import this section', '--gctd--')}</span>
                    <IconDownload2SVG />
                </div>
                {editorWarn && createPortal(<EditNotice setEditorWarn={setEditorWarn} />, document.getElementById('gutenverse-root'))}
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

const EditNotice = ({ setEditorWarn }) => {
    const { setRenderingMode } = useDispatch(editorStore);

    const editContent = () => {
        setEditorWarn(false);
        setRenderingMode('post-only');
    };

    const cancelEdit = () => {
        setEditorWarn(false);
    };

    return <Notice
        icon={<svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.83268 5.83464C5.83268 3.53297 7.69768 1.66797 9.99935 1.66797C12.301 1.66797 14.166 3.53297 14.166 5.83464V8.33464H14.4993C15.2327 8.33464 15.8327 8.93464 15.8327 9.66797V15.5013C15.8327 16.6013 14.9327 17.5013 13.8327 17.5013H6.16602C5.06602 17.5013 4.16602 16.6013 4.16602 15.5013V9.66797C4.16602 8.93464 4.76602 8.33464 5.49935 8.33464H5.83268V5.83464ZM12.4993 5.83464V8.33464H7.49935V5.83464C7.49935 4.45297 8.61768 3.33464 9.99935 3.33464C11.381 3.33464 12.4993 4.45297 12.4993 5.83464ZM9.99935 10.2096C9.66796 10.2093 9.34634 10.3218 9.08746 10.5287C8.82858 10.7356 8.64787 11.0244 8.5751 11.3477C8.50232 11.671 8.54183 12.0095 8.68711 12.3073C8.83239 12.6051 9.07478 12.8446 9.37435 12.9863V15.0013C9.37435 15.1671 9.4402 15.326 9.55741 15.4432C9.67462 15.5605 9.83359 15.6263 9.99935 15.6263C10.1651 15.6263 10.3241 15.5605 10.4413 15.4432C10.5585 15.326 10.6243 15.1671 10.6243 15.0013V12.9863C10.9239 12.8446 11.1663 12.6051 11.3116 12.3073C11.4569 12.0095 11.4964 11.671 11.4236 11.3477C11.3508 11.0244 11.1701 10.7356 10.9112 10.5287C10.6524 10.3218 10.3307 10.2093 9.99935 10.2096Z" fill="#FFB200" />
        </svg>}
        title={__('Gutenverse Post Content is Locked', '--gctd--')}
        description={__('On "Show Template" mode, Sections cannot be imported. Please switch to Content Editing mode to import the content.', '--gctd--')}
        buttonText={__('Switch Mode', '--gctd--')}
        onClick={editContent}
        onClose={cancelEdit}
    />;
};

export default withSelect(select => {
    const { getImporterData } = select('gutenverse/library');

    return {
        importer: getImporterData()
    };
})(ImportSectionButton);

import { __ } from '@wordpress/i18n';
import { importImage, importSingleSectionContent } from 'gutenverse-core/requests';
import { withSelect, dispatch, select } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { IconDownload2SVG, IconEyeSVG } from 'gutenverse-core/icons';
import { Loader } from 'react-feather';
import { injectImagesToContent } from 'gutenverse-core/helper';
import { parse } from '@wordpress/blocks';
import ButtonUpgradePro from '../pro/button-upgrade-pro';
import { activeTheme, clientUrl, upgradeProUrl } from 'gutenverse-core/config';
import cryptoRandomString from 'crypto-random-string';
import { store as editorStore } from '@wordpress/editor';
import { ImportNotice } from './library-helper';
import { useGlobalStylesConfig } from 'gutenverse-core/editor-helper';
import { signal } from 'gutenverse-core/editor-helper';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import { v4 } from 'uuid';

const ImportSectionButton = props => {
    const {
        data,
        closeImporter,
        importer,
        setShowOverlay,
        setExporting,
        setSelectItem,
        setLibraryError,
        setSingleId,
        setSingleData,
        singleData,
        dataToImport,
        extractTypographyBlocks,
        unavailableGlobalFonts,
        unavailableGlobalColors,
        supportGlobalImport
    } = props;

    const { pro: isPro, licenseType, slug, customAPI = null, customArgs = {} } = data;

    const { userConfig, setUserConfig } = useGlobalStylesConfig();
    const customs = userConfig.settings.color && userConfig.settings.color.palette && userConfig.settings.color.palette.custom;
    const { addVariableFont } = dispatch('gutenverse/global-style');
    let fail = 0;
    const customPalette = customs ? customs.map(item => {
        return {
            ...item,
            key: item.key ? item.key : cryptoRandomString({ length: 6, type: 'alphanumeric' })
        };
    }) : [];

    const processGlobalStyle = () => {
        signal.globalStyleSignal.dispatch(v4());

        //import global Color
        let colorCount = 0;
        const newColor = [];
        for (const color of unavailableGlobalColors) {
            colorCount++;
            setExporting(prev => ({ ...prev, message: `Importing Global Color ${colorCount} of ${unavailableGlobalColors.length + 1}`, progress: '3/4' }));
            const key = cryptoRandomString({ length: 6, type: 'alphanumeric' });
            const colorData = color.color;
            if (colorData) {
                newColor.push({
                    slug: colorData.slug.toLowerCase(),
                    key: key,
                    name: colorData.name,
                    color: colorData.color
                });
            } else {
                newColor.push({
                    slug: color.id.toLowerCase(),
                    key: key,
                    name: color.id.toLowerCase(),
                    color: {}
                });
            }
        }

        setUserConfig((currentConfig) => {
            const newUserConfig = cloneDeep(currentConfig);
            const pathToSet = 'settings.color.palette.custom';

            set(newUserConfig, pathToSet, [...customPalette, ...newColor]);
            return newUserConfig;
        });

        //import global Font
        let fontCount = 0;

        for (const font of unavailableGlobalFonts) {
            fontCount++;
            setExporting(prev => ({ ...prev, message: `Importing Global Color ${fontCount} of ${unavailableGlobalFonts.length + 1}`, progress: '3/4' }));
            addVariableFont({
                id: font?.slug,
                name: font?.name,
                font: JSON.parse(font?.font),
            });
        }
    };

    const insertBlocksTemplate = (data, supportGlobalImport) => {
        return new Promise((resolve) => {
            const { insertBlocks } = dispatch('core/block-editor');
            const { contents, images, contents_global } = data;

            let patterns;
            if ('global' === dataToImport) {
                patterns = injectImagesToContent(contents_global, images);
            } else {
                patterns = injectImagesToContent(contents, images);
            }

            const blocks = parse(patterns);

            //handle elementId on section import
            const newBlocks = blocks.map(block => {
                const blocksString = JSON.stringify(block).replace(/class=\\"[^"]*\\"/g, 'class=\\"\\"');
                const removeClassName = blocksString.replace(/"className":"[^"]*"/g,  '"className":""');
                const contentWithNewId = removeClassName.replace(/"elementId":"guten-[^"]+"/g, () => {
                    const newId = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
                    return `"elementId":"${newId}"`;
                });
                return JSON.parse(contentWithNewId);
            });

            const renderingMode = select(editorStore).getRenderingMode();

            if (renderingMode === 'template-locked') {
                setLibraryError(() => {
                    return <ImportNotice
                        resolve={resolve}
                        blocks={newBlocks}
                        supportGlobalImport={supportGlobalImport}
                        setLibraryError={setLibraryError}
                        processGlobalStyle={processGlobalStyle}
                    />;
                });
            } else {
                supportGlobalImport && processGlobalStyle();
                insertBlocks(newBlocks);
                resolve();
            }
        });
    };

    const importContent = (e, supportGlobalImport) => {
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

        const processImages = async ({ images, contents, contents_global, global }) => {
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
                contents,
                contents_global,
                global
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
            return insertBlocksTemplate(result, supportGlobalImport);
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
        return !singleData ? (
            <div className="section-button import-section">
                <div className="section-button-inner" onClick={() => {
                    setSingleId(data.id);
                    setSingleData(data);
                }}>
                    <span>{__('Preview Section', '--gctd--')}</span>
                    <IconEyeSVG width={12.8} height= {12.8} />
                </div>
            </div>
        ) : (
            <div className="section-button import-section">
                <div className="section-button-inner" onClick={(e) => {
                    importContent(e, supportGlobalImport);
                    setSingleId(null);
                    setSingleData(null);
                }}>
                    <span>{__('Import this section', '--gctd--')}</span>
                    <IconDownload2SVG />
                </div>
            </div>
        );
    };

    const ProButton = () => {
        return <ButtonUpgradePro licenseType={licenseType} licenseActiveButton={ImportButton()} link={`${upgradeProUrl}?utm_source=gutenverse&utm_medium=librarysection&utm_client_site=${clientUrl}&utm_client_theme=${activeTheme}`} isBanner={true} location="card-pro" />;
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

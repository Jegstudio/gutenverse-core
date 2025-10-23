import { __, } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { useEffect, useState, useMemo, useRef } from '@wordpress/element';
import classnames from 'classnames';
import { RecursionProvider, BlockPreview } from '@wordpress/block-editor';
import { IconEmpty2SVG, IconArrowLeftSVG } from 'gutenverse-core/icons';
import { LeftSkeleton, RightSkeleton, FullSkeleton, Skeleton } from 'gutenverse-core/components';
import { importSingleSectionContent } from 'gutenverse-core/requests';
import { getGlobalVariable } from '../../styling/styling/global-style/index';
import ImportSectionButton from './import-section-button';
import { applyFilters } from '@wordpress/hooks';
import { parse } from '@wordpress/blocks';
import { hexToRgb } from 'gutenverse-core/editor-helper';

const SingleSectionContent = (props) => {
    const {
        setSingleId,
        backText,
        closeImporter,
        setSingleData,
        singleData,
        setExporting,
        setSelectItem,
        setLibraryError
    } = props;

    const [contentNormal, setContentNormal] = useState(null);
    const [contentGlobal, setContentGlobal] = useState(null);
    const { slug, customAPI = null, customArgs = {} } = singleData;
    const [selectedOption, setSelectedOption] = useState('default');
    const [dataToImport, setDataToImport] = useState(singleData);
    const [unavailableGlobalFonts, setUnavailableGlobalFonts] = useState([]);
    const [unavailableGlobalColors, setUnavailableGlobalColors] = useState([]);
    const { supportGlobalImport } = window['GutenverseConfig'] || window['GutenverseData'] || {};
    // const supportGlobalImport = true; //for testing

    const normalRef = useRef(null);
    const globalRef = useRef(null);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        setDataToImport(event.target.value);

        //directly change attributes of elements so doesn't trigger re-render. no heavy loader
        if ('global' === event.target.value) {
            // Hide current, show remote
            normalRef.current.style.opacity = '0';
            normalRef.current.style.zIndex = '1';
            normalRef.current.style.pointerEvents = 'none';

            globalRef.current.style.opacity = '1';
            globalRef.current.style.zIndex = '2';
            globalRef.current.style.pointerEvents = 'auto';
        } else {
            // Show current, hide remote
            normalRef.current.style.opacity = '1';
            normalRef.current.style.zIndex = '2';
            normalRef.current.style.pointerEvents = 'auto';

            globalRef.current.style.opacity = '0';
            globalRef.current.style.zIndex = '1';
            globalRef.current.style.pointerEvents = 'none';
        }
    };

    const singleClass = classnames('gutenverse-library-single-section', {
        'loading': singleData === null,
    });


    useEffect(() => {
        if (!singleData) return;

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
            if (data) {

                const updatedNormalContentImage = data.contents.replace(/\{\{\{image:(\d+):url\}\}\}/g, (_, index) => {
                    return data.images[index];
                });

                if (data.contents_global) {
                    const updatedGlobalContentImage = data.contents_global?.replace(/\{\{\{image:(\d+):url\}\}\}/g, (_, index) => {
                        return data.images[index];
                    });
                    const updatedContentGlobal = handleGlobalStyleContent(updatedGlobalContentImage, data.global, setUnavailableGlobalFonts, setUnavailableGlobalColors);
                    setContentGlobal(updatedContentGlobal);
                }

                setContentNormal(updatedNormalContentImage);
            }
        });

    }, [singleData, contentGlobal, contentNormal, selectedOption]);

    const layoutClassNames = 'library-content-container';

    return <>
        <div className={singleClass}>
            {singleData === null ? <>
                <div className="single-previewer">
                    <LeftSkeleton />
                </div>
                <div className="single-wrapper">
                    <RightSkeleton />
                </div>
            </> : singleData !== null ?
                <>
                    <div className="single-previewer-toolbar">
                        <div className="back-button" onClick={() => setSingleId(null)}>
                            <IconArrowLeftSVG />
                            <span>
                                {backText}
                            </span>
                        </div>
                        <div className="single-previewer-control">
                            {(supportGlobalImport && contentGlobal !== null) && <div className="previewer-options-container">
                                <label className={selectedOption === 'default' ? 'selected' : ''}>
                                    <input
                                        type="radio"
                                        name="styleOption"
                                        value="default"
                                        checked={selectedOption === 'default'}
                                        onChange={handleChange}
                                    />
                                    Use Default Style
                                </label>

                                <label className={selectedOption === 'global' ? 'selected' : ''}>
                                    <input
                                        type="radio"
                                        name="styleOption"
                                        value="global"
                                        checked={selectedOption === 'global'}
                                        onChange={handleChange}
                                    />
                                    Use Current Global Style
                                </label>
                            </div>}
                            <ImportSectionButton
                                data={singleData}
                                closeImporter={closeImporter}
                                setShowOverlay={() => { }}
                                setExporting={setExporting}
                                setSelectItem={setSelectItem}
                                setLibraryError={setLibraryError}
                                setSingleId={setSingleId}
                                singleData={singleData}
                                setSingleData={setSingleData}
                                dataToImport={dataToImport}
                                extractTypographyBlocks={extractTypographyBlocks}
                                unavailableGlobalFonts={unavailableGlobalFonts}
                                unavailableGlobalColors={unavailableGlobalColors}
                                supportGlobalImport={supportGlobalImport}
                            />
                        </div>
                    </div>
                    <div className="single-previewer-container">
                        <div className="single-previewer">
                            <RecursionProvider uniqueId={singleData.id}>
                                <div className="editor-styles-wrapper wrapper-imitator">
                                    <div className="is-root-container wrapper-imitator">
                                        {singleData ? (
                                            <>
                                                <div ref={normalRef} className={`${layoutClassNames} normal-content`}>
                                                    <Content
                                                        content={contentNormal}
                                                    />
                                                </div>
                                                {(supportGlobalImport && contentGlobal !== null) && <div ref={globalRef} className={`${layoutClassNames} global-content`}>
                                                    <Content
                                                        content={contentGlobal}
                                                    />
                                                </div>}
                                            </>
                                        ) : (
                                            <FullSkeleton />
                                        )}
                                    </div>
                                </div>
                            </RecursionProvider>
                        </div>
                    </div>
                </>
                : <div className="empty-content">
                    <div>
                        <div className="empty-wrapper">
                            <div className="empty-svg">
                                <IconEmpty2SVG />
                            </div>
                            <h3>{__('No Result Found', '--gctd--')}</h3>
                            <span>{__('It seems we can\'t find any results based on your search.', '--gctd--')}</span>
                        </div>
                        <div className="back-button" onClick={() => setSingleId(null)}>
                            <span>
                                {backText}
                            </span>
                        </div>
                    </div>
                </div>}
        </div>
    </>;
};

const handleGlobalStyleContent = (content, global, setUnavailableGlobalFonts, setUnavailableGlobalColors) => {
    const globalVariables = getGlobalVariable();
    let unavailableColors = [];

    const { updatedContent, nonExistedFont } = extractTypographyBlocks(content, global.font, globalVariables.fonts);

    const updatedColor = updatedContent.replace(
        /({"type":"variable","id":")([^"]+)("})/g,
        (_, prefix, id, suffix) => {
            let notExist = false;
            let color = {};
            const populateColor = (globalVariables.colors?.custom ?? []).concat(globalVariables.colors?.theme ?? []);
            const matchedColor = populateColor?.find(f => f?.slug?.toLowerCase() === id?.toLowerCase());

            if (!matchedColor) {
                color = global.color.find(c => c.slug?.toLowerCase() === id?.toLowerCase());
                unavailableColors.push({ id: id, color: color });
                notExist = true;
            }

            if (notExist) {
                return `${JSON.stringify(hexToRgb(color ? color.color : {}))}`;
            } else {
                return `${prefix}${id?.toLowerCase()}${suffix}`;
            }
        }
    );

    setUnavailableGlobalFonts(nonExistedFont);
    setUnavailableGlobalColors(unavailableColors);

    return updatedColor;
};

const extractTypographyBlocks = (content, importedFonts, globalFonts) => {
    const seen = new Set();

    const nonExisted = importedFonts
        .filter(item1 => !globalFonts.some(item2 => item2.id === item1.slug)) // filter non-existing
        .filter(item => {
            if (seen.has(item.slug)) return false; // skip duplicates
            seen.add(item.slug);
            return true;
        });
    nonExisted.forEach(font => {
        // Build a real regex (with global flag)
        const fontRegex = new RegExp(`"type":"variable","id":"${font.slug}",`, 'g');

        // Replace all occurrences with empty string
        content = content.replace(fontRegex, '');
    });

    return { updatedContent: content, nonExistedFont: nonExisted };
};

const Content = (props) => {
    const { content } = props;

    return content === null ? <>
        <div className="single-previewer">
            <div style={{ padding: '10px', width: '100%', boxSizing: 'border-box' }}>
                <Skeleton variant="rect" height={'1000px'} borderRadius={2} />
            </div>
        </div>
    </> : <ReadOnlyContent
        content={content}
    />;
};

const ReadOnlyContent = ({ content }) => {
    const iframeRef = useRef(null);

    const blocks = useMemo(() => {
        return content ? parse(content) : [];
    }, [content]);

    useEffect(() => {
        const checkIframeLoaded = () => {
            if (iframeRef.current) {
                const iframe = iframeRef.current.querySelector('iframe');
                if (iframe) {
                    // Get the element
                    const container = document.querySelector('.single-previewer-container');
                    const height = container.getBoundingClientRect().height;
                    const onLoad = () => {
                        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                        if (!iframeDoc) return;

                        const styleTag = iframeDoc.createElement('style');
                        styleTag.innerHTML = `
                            :root{
                                --size: 48px;
                                --light: #ffffff;
                                --dark:  #dcdcdcff;
                            }

                            .is-root-container {
                                background-color: var(--light);
                                background-image:
                                    linear-gradient(45deg, var(--dark) 25%, transparent 25%, transparent 75%, var(--dark) 75%),
                                    linear-gradient(45deg, var(--dark) 25%, transparent 25%, transparent 75%, var(--dark) 75%);
                                background-size: calc(var(--size) * 2) calc(var(--size) * 2);
                                background-position: 0 0, calc(var(--size)) calc(var(--size));
                                background-repeat: repeat;
                            }

                            .input-warning {
                                display: none;
                            }

                            .guten-hide-desktop {
                                display: none;
                            }

                            .is-root-container,
                            .guten-popup-builder  {
                                min-height: ${height * 100 / 80}px;
                                display: block;
                            }

                            .guten-popup-holder {
                                display: none !important;
                            }

                            .guten-popup:not(.show) {
                                display: block !important;
                            }

                            /* You can add more custom styles here */
                        `;
                        styleTag.className = 'custom-preview-style';
                        iframeDoc.body.appendChild(styleTag);

                        // const container = iframeRef.current.querySelector('block-editor-block-preview__container');
                        // const rect = container.getBoundingClientRect();
                    };
                    iframe.addEventListener('load', onLoad);

                    return () => {
                        iframe.removeEventListener('load', onLoad);
                    };
                }
            }
        };

        const observer = new MutationObserver(checkIframeLoaded);
        if (iframeRef.current) {
            observer.observe(iframeRef.current, { childList: true, subtree: true });
        }

        return () => observer.disconnect();
    }, [blocks]);

    return (
        <div ref={iframeRef}>
            <BlockPreview blocks={blocks} />
        </div>
    );
};

export default withSelect(select => {
    const { getLibraryData, getPluginData } = select('gutenverse/library');

    return {
        libraryData: getLibraryData(),
        pluginData: getPluginData(),
    };
})(SingleSectionContent);
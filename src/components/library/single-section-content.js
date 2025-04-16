import { __, } from '@wordpress/i18n';
import { withSelect, dispatch } from '@wordpress/data';
import { useEffect, useState, useMemo } from '@wordpress/element';
import classnames from 'classnames';
import { RecursionProvider, useBlockProps, __experimentalUseBlockPreview as useBlockPreview } from '@wordpress/block-editor';
import { getPluginRequirementStatus} from './library-helper';
import { IconEmpty2SVG, IconArrowLeftSVG } from 'gutenverse-core/icons';
import { LeftSkeleton, RightSkeleton } from 'gutenverse-core/components';
import { importSingleSectionContent } from 'gutenverse-core/requests';
import { getGlobalVariable } from '../../styling/styling/global-style/index';
import ImportSectionButton from './import-section-button';
import { applyFilters } from '@wordpress/hooks';
import { parse } from '@wordpress/blocks';
import { hexToRgb } from 'gutenverse-core/editor-helper';

const SingleSectionContent = (props) => {
    const {
        pluginData,
        setSingleId,
        backText,
        closeImporter,
        setSingleData,
        singleData,
        setPluginInstallMode,
        setCurrentItem,
        setExporting,
        setSelectItem,
        setLibraryError
    } = props;

    const [content, setContent] = useState(null);
    const { pro: isPro, slug, customAPI = null, customArgs = {} } = singleData;
    const [selectedOption, setSelectedOption] = useState('default');
    const [dataToImport, setDataToImport] = useState(singleData);
    const [unavailableGlobalFonts, setUnavailableGlobalFonts] = useState([]);
    const [unavailableGlobalColors, setUnavailableGlobalColors] = useState([]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
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

            if ('global' === selectedOption) {
                const updatedContentImage = data.contents_global.replace(/\{\{\{image:(\d+):url\}\}\}/g, (_, index) => {
                    return data.images[index];
                });
                const updatedContentGlobal = handleGlobalStyleContent(updatedContentImage, data.global, setUnavailableGlobalFonts, setUnavailableGlobalColors);
                setDataToImport('global');
                setContent(updatedContentGlobal);
            } else {
                const updatedContentImage = data.contents.replace(/\{\{\{image:(\d+):url\}\}\}/g, (_, index) => {
                    return data.images[index];
                });
                setDataToImport('defult');
                setContent(updatedContentImage);
            }
        });

    }, [singleData, content, selectedOption]);

    const layoutClassNames = 'library-content-container';
    const parentLayout = {
        contentSize: '1140px',
        wideSize: '1240px'
    };

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
                    <div className="back-button" onClick={() => setSingleId(null)}>
                        <IconArrowLeftSVG />
                        <span>
                            {backText}
                        </span>
                    </div>
                    <div className="single-previewer-container">
                        <div className="single-previewer">
                            <RecursionProvider uniqueId={singleData.id}>
                                <div className="editor-styles-wrapper wrapper-imitator">
                                    <div className="is-root-container wrapper-imitator">
                                        {singleData && content !== null ? (
                                            <Content
                                                content={content}
                                                parentLayout={parentLayout}
                                                layoutClassNames={layoutClassNames}
                                            />
                                        ) : (
                                            <Placeholder
                                                layoutClassNames={layoutClassNames}
                                                singleData={singleData}
                                                setPluginInstallMode={setPluginInstallMode}
                                                pluginData={pluginData}
                                                setCurrentItem={setCurrentItem}
                                            />
                                        )}
                                    </div>
                                </div>
                            </RecursionProvider>
                            <div className="single-previewer-footer">
                                <div className="previewer-options-container">
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
                                </div>
                                <ImportSectionButton
                                    data={singleData}
                                    closeImporter={closeImporter}
                                    setShowOverlay={() => {}}
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
                                />
                            </div>
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

    let unavailableFonts=[];
    let unavailableColors=[];
    const updatedTypography = extractTypographyBlocks(content).reduceRight((result, { start, end, block }) => {
        if (block.includes('"type":"variable"')) {
            let notExist = false;
            let font = {};
            const updatedBlock = block.replace(/"id"\s*:\s*"([^"]+)"/, (_, id) => {
                const matchedFont = globalVariables.fonts.find(f => f.id === id.toLowerCase());
                if(!matchedFont) {
                    font = global.font.find(f => f.slug.toLowerCase() === id.toLowerCase());
                    unavailableFonts.push({id : id, font: font});
                    notExist = true;
                }
                return `"id":"${id.toLowerCase()}"`;
            });

            if (notExist) {
                return result.slice(0, start) + `"typography": ${font.font}` + result.slice(end);
            } else {
                return result.slice(0, start) + updatedBlock + result.slice(end);
            }
        }

        return result;
    }, content);

    const updatedColor = updatedTypography.replace(
        /({"type":"variable","id":")([^"]+)("})/g,
        (_, prefix, id, suffix) => {
            let notExist = false;
            let color = {};
            const populateColor = globalVariables.colors.custom.concat(globalVariables.colors.theme);
            const matchedColor = populateColor.find(f => f.slug.toLowerCase() === id.toLowerCase());

            if (!matchedColor) {
                color = global.color.find(c => c.slug.toLowerCase() === id.toLowerCase());
                unavailableColors.push({id : id, color: color});
                notExist = true;
            }

            if (notExist) {
                return `${JSON.stringify(hexToRgb(color ? color.color : {}))}`;
            } else {
                return `${prefix}${id.toLowerCase()}${suffix}`;
            }
        }
    );

    setUnavailableGlobalFonts(unavailableFonts);
    setUnavailableGlobalColors(unavailableColors);

    return updatedColor;
};

const extractTypographyBlocks = (content) => {
    const matches = [];
    let index = 0;

    while ((index = content.indexOf('"typography":{', index)) !== -1) {
        let start = index + '"typography":'.length;
        let braceCount = 0;
        let end = start;

        if (content[start] === '{') {
            do {
                const char = content[end];
                if (char === '{') braceCount++;
                else if (char === '}') braceCount--;
                end++;
            } while (braceCount > 0 && end < content.length);

            const block = content.slice(index, end);
            matches.push({ start: index, end, block });
        }

        index = end;
    }

    return matches;
};

const Placeholder = ({singleData, setPluginInstallMode, pluginData, setCurrentItem}) => {

    const classname = classnames('library-item');
    const paddingBottom = (singleData?.cover[2] / singleData?.cover[1] * 100 < 10) ? 0 : singleData?.cover[2] / singleData?.cover[1] * 100;
    const minHeight = paddingBottom === 0 ? 50 : 0;
    const [image, setImage] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [requirementStatus, setRequirementStatus] = useState(false);
    const { installedPlugin } = pluginData;

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImage(singleData.cover[0]);
        };
        img.src = singleData.cover[0];
    });

    useEffect(() => {
        const { requirements, compatibleVersion } = singleData;
        const requirement = getPluginRequirementStatus({
            plugins: installedPlugin,
            requirements,
            compatibleVersion
        });
        setRequirementStatus(requirement);
    }, [singleData, installedPlugin]);

    const setToCurrentItem = () => {
        setCurrentItem(singleData);
        setPluginInstallMode(true);
    };

    return <div className={classname}>
        <div className="library-item-content">
            <div className="library-item-holder " style={{
                paddingBottom: `${paddingBottom}%`, minHeight: `${minHeight}px`, background: isLoaded ? 'white' : '', zIndex: isLoaded ? '5' : ''
            }}>
                <img src={image} onLoad={() => setIsLoaded(true)} />
                <div className="library-item-detail">
                    {requirementStatus?.length === 0 && <div className="library-item-overlay">
                        <div className="section-button import-section" onClick={() => setToCurrentItem()}>
                            <div className="section-button-inner">
                                <span>
                                    {__('Missing Requirement', '--gctd--')}
                                    <br />
                                    {__('Click for more detail', '--gctd--')}
                                </span>
                            </div>
                        </div>
                    </div>}
                    {singleData.pro && <div className="pro-flag">{__('PRO', '--gctd--')}</div>}
                </div>
            </div>
        </div>
    </div>;
};

const Content = (props) => {
    const { content, layoutClassNames } = props;

    return <ReadOnlyContent
        parentLayout={props.parentLayout}
        layoutClassNames={layoutClassNames}
        content={content}
    />;
};

const ReadOnlyContent = ({
    layoutClassNames,
    parentLayout,
    content
}) => {
    const blockProps = useBlockProps({ className: layoutClassNames });
    const blocks = useMemo(() => {
        return content ? parse(content) : [];
    }, [content]);
    const blockPreviewProps = useBlockPreview({
        blocks,
        props: blockProps,
        layout: parentLayout,
    });

    /*
    * Rendering the block preview using the raw content blocks allows for
    * block support styles to be generated and applied by the editor.
    *
    * The preview using the raw blocks can only be presented to users with
    * edit permissions for the post to prevent potential exposure of private
    * block content.
    */
    return <div {...blockPreviewProps}></div>;
};

export default withSelect(select => {
    const { getLibraryData, getPluginData } = select('gutenverse/library');

    return {
        libraryData: getLibraryData(),
        pluginData: getPluginData(),
    };
})(SingleSectionContent);

import { __, _n, sprintf } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { useEffect, useState, useRef, useMemo } from '@wordpress/element';
import classnames from 'classnames';
import { getInstalledThemes } from 'gutenverse-core/requests';
import { InspectorControls, RecursionProvider, useBlockProps, useHasRecursion, Warning, __experimentalUseBlockPreview as useBlockPreview, store as blockEditorStore } from '@wordpress/block-editor';
import { getPluginRequirementStatus, likeLayout } from './library-helper';
import { IconHeartFullSVG, IconLoveSVG, IconEmpty2SVG, IconArrowLeftSVG, IconCircleExclamationSVG, IconInfoYellowSVG , IconEyeSVG } from 'gutenverse-core/icons';
import { InstallThemeStatusSkeleton, LeftSkeleton, RightSkeleton } from 'gutenverse-core/components';
import ImportLayout from './import-layout';
import { Loader } from 'react-feather';
import semver from 'semver';
import { ExportNotice } from './library-helper';
import { importSingleSectionContent } from 'gutenverse-core/requests';
import ImportSectionButton from './import-section-button';
import { applyFilters } from '@wordpress/hooks';
import { useSelect } from '@wordpress/data';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { parse } from '@wordpress/blocks';

const SingleSectionContent = (props) => {
    const {
        libraryData,
        pluginData,
        setSingleId,
        backText,
        closeImporter,
        setSingleData,
        singleData,
        setPluginInstallMode,
        setCurrentItem,
        setExporting
    } = props;

    const [active, setActive] = useState(0);
    const [content, setContent] = useState(null);
    const imageContent = useRef(null);
    const [imageCover, setImageCover] = useState(null);
    const [requirementStatus, setRequirementStatus] = useState(false);
    const { installedPlugin } = pluginData;
    const { layoutData } = libraryData;
    const { pro: isPro, slug, customAPI = null, customArgs = {} } = singleData;
    const [selectedOption, setSelectedOption] = useState('default');

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
                const updatedContentGlobal = handleGlobalStyleContent(updatedContentImage);
                console.log(data);
                setContent(updatedContentGlobal);
            } else {
                const updatedContentImage = data.contents.replace(/\{\{\{image:(\d+):url\}\}\}/g, (_, index) => {
                    return data.images[index];
                });
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
                                    setSelectItem={() => {}}
                                    setLibraryError={() => {}}
                                    setSingleId={setSingleId}
                                    singleData={singleData}
                                    setSingleData={setSingleData}
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

const handleGlobalStyleContent = (content) => {
    return content;
};

const ThemeNotification = ({ requirementStatus, setPluginInstallMode, library, singleData, setActive, active, slug }) => {
    if (requirementStatus.length === 0) {
        return <ThemeInstallNotification
            library={library}
            singleData={singleData}
            setActive={setActive}
            active={active}
            slug={slug}
        />;
    } else {
        return <RequiredPluginNotification
            requirementStatus={requirementStatus}
            setPluginInstallMode={setPluginInstallMode}
        />;
    }
};

const ThemeInstallNotification = ({ library, slug, singleData, setActive }) => {
    const [themeExist, setThemeExist] = useState(false);
    const [installedLoad, setInstalledLoad] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const isThemeforest = !window['GutenThemeConfig'] ? false : window['GutenThemeConfig']['isThemeforest'] && true ;

    useEffect(() => {
        const { themeData } = library;
        let isThemeExist = false;

        themeData.map(theme => {
            if (theme.data.slug === slug) {
                isThemeExist = true;
            }
        });

        if (isThemeExist) {
            setActive(0);
            getInstalledThemes().then(result => {
                setInstalledLoad(true);
                result.map(theme => {
                    if (theme.stylesheet === slug) {
                        setIsInstalled(true);

                        if (theme.status === 'active') {
                            setIsActive(true);
                        }
                    }
                });
            });
            setThemeExist(true);
        }
    }, []);

    const InstallStatus = () => {
        const { themeListUrl, pluginVersions } = window['GutenverseConfig'];

        const pluginVersion = pluginVersions?.gutenverse?.version || '0.0.0';

        if (isInstalled) {
            if (!isActive && semver.gte(pluginVersion, singleData?.compatibleVersion || '0.0.0')) {
                return <div className="single-install-themes active">
                    <h3>{__('Activate', '--gctd--')} {singleData.title} {__('Themes', '--gctd--')}</h3>
                    <p>{__('You already install the themes, you can get all template by activating this themes.', '--gctd--')}</p>
                    <a href={`${themeListUrl}&keyword=${singleData.title}&slug=${singleData.slug}&action=activate`} target={'_blank'} rel="noreferrer">
                        {__('Activate Themes', '--gctd--')} →
                    </a>
                    <IconCircleExclamationSVG />
                </div>;
            }

            return null;
        } else {
            return <div className="single-install-themes">
                <h3>{__('Install', '--gctd--')} {singleData.title} {__('Themes', '--gctd--')} {!singleData.isPro ? __('For Free', '--gctd--') : ''}</h3>
                <p>{__('Check out and install our fully supported Full Site Editing (FSE) themes.', '--gctd--')}</p>
                <a href={`${themeListUrl}&keyword=${singleData.slug}&action=install`} target={'_blank'} rel="noreferrer">
                    {__('Install Themes', '--gctd--')} →
                </a>
                <IconCircleExclamationSVG />
            </div>;
        }
    };

    const themeInstallBlock = () => {
        return !installedLoad ? <InstallThemeStatusSkeleton /> : <InstallStatus />;
    };

    return themeExist && !isThemeforest && themeInstallBlock();
};

const RequiredPluginNotification = ({ requirementStatus, setPluginInstallMode }) => {
    return <div className="plugin-requirement-notice">
        <div className="plugin-requirement-icon">
            <IconInfoYellowSVG />
        </div>
        <div className="plugin-requirement-content">
            <h3>{__('Plugin Requirements', '--gctd--')}</h3>
            <p>{sprintf(
                _n('There is plugin need to be installed or updated for this layout work correctly.', 'There are %s plugins need to be installed or updated for this layout work correctly.', requirementStatus.length, '--gctd--'),
                requirementStatus.length
            )}</p>
            <a href="#" onClick={(e) => {
                setPluginInstallMode(true);
                e.preventDefault();
            }}>{__('Manage Plugin Requirement →', '--gctd--')}</a>
        </div>
    </div>;
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

    // return content?.protected ? (
    //     <div {...blockProps}>
    //         <Warning>{__('This content is password protected.')}</Warning>
    //     </div>
    // ) : (
    //     <div
    //         {...blockProps}
    //         dangerouslySetInnerHTML={{ __html: content?.rendered }}
    //     ></div>
    // );
};

export default withSelect(select => {
    const { getLibraryData, getPluginData } = select('gutenverse/library');

    return {
        libraryData: getLibraryData(),
        pluginData: getPluginData(),
    };
})(SingleSectionContent);

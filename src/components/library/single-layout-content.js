import { __, _n, sprintf } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { useEffect, useState, useRef } from '@wordpress/element';
import classnames from 'classnames';
import { getInstalledThemes } from 'gutenverse-core/requests';
import { getPluginRequirementStatus, likeLayout } from './library-helper';
import { IconHeartFullSVG, IconLoveSVG, IconEmpty2SVG, IconArrowLeftSVG, IconCircleExclamationSVG, IconInfoYellowSVG , IconEyeSVG } from 'gutenverse-core/icons';
import { InstallThemeStatusSkeleton, LeftSkeleton, RightSkeleton } from 'gutenverse-core/components';
import ImportLayout from './import-layout';
import { Loader } from 'react-feather';
import semver from 'semver';
import { ExportNotice } from './library-helper';

const SingleLayoutContent = (props) => {
    const {
        libraryData,
        pluginData,
        id,
        slug,
        setSingleId,
        backText,
        closeImporter,
        setSingleData,
        singleData,
        setPluginInstallMode,
    } = props;

    const [active, setActive] = useState(0);
    const imageContent = useRef(null);
    const [imageCover, setImageCover] = useState(null);
    const [requirementStatus, setRequirementStatus] = useState(false);
    const [exporting, setExporting] = useState({show: false, message: '', progress: ''});
    const { installedPlugin } = pluginData;
    const { layoutData } = libraryData;

    useEffect(() => {
        if (singleData !== null) {
            const { requirements, compatibleVersion } = singleData;
            const requirement = getPluginRequirementStatus({
                plugins: installedPlugin,
                requirements,
                compatibleVersion
            });
            setRequirementStatus(requirement);
        }
    }, [singleData, pluginData]);

    useEffect(() => {
        setImageCover(null);

        if (singleData !== null) {
            if (singleData.pages[active] !== undefined) {
                setImageCover(singleData.pages[active].fullImage);
            }
        }
    }, [active, singleData]);

    useEffect(() => {
        setSingleData(null);
        layoutData.map(layout => {
            if (layout.id === id) {
                const { id, name, data, like, customAPI, customArgs, author } = layout;
                const { pro, slug, demo, pages: layoutPages, compatible_version: compatibleVersion, requirements } = data;

                let pages = [];

                layoutPages.map(page => {
                    const { index, title, coverImage, fullImage } = page;
                    pages = [
                        ...pages,
                        {
                            id: index,
                            title: title,
                            coverImage: coverImage[0],
                            fullImage: fullImage[0]
                        }
                    ];
                });

                const content = {
                    id: id,
                    title: name,
                    pages: pages,
                    demo: demo,
                    isPro: pro === '1',
                    slug: slug,
                    like,
                    compatibleVersion,
                    requirements,
                    customAPI,
                    customArgs,
                    author
                };

                setSingleData(content);
            }
        });
    }, [id, layoutData]);

    const changeActive = id => {
        setActive(id);
        imageContent.current.scrollTop = 0;
    };

    const singleClass = classnames('gutenverse-library-single-layout', {
        'loading': singleData === null,
    });

    return <>
        <div className={singleClass}>
            {singleData === null ? <>
                <div className="single-previewer">
                    <LeftSkeleton />
                </div>
                <div className="single-wrapper">
                    <RightSkeleton />
                </div>
            </> : singleData.pages.length > 0 ?
                <>
                    <div className="back-button" onClick={() => setSingleId(null)}>
                        <IconArrowLeftSVG />
                        <span>
                            {backText}
                        </span>
                    </div>
                    <div className="single-previewer-container">
                        <div className="single-previewer">
                            <div className={classnames('layout-content', {
                                loading: imageCover === null
                            })} ref={imageContent}>
                                {imageCover === null ? <div className="layout-loader">
                                    <div className="rotating">
                                        <Loader size={20} />
                                    </div>
                                </div> : <img src={imageCover} key={imageCover} />}
                            </div>
                            {exporting.show ? <ExportNotice message={exporting.message} progress={exporting.progress}/> : <div className="layout-action">
                                <ImportLayout activePage={active} data={singleData} closeImporter={closeImporter} setPluginInstallMode={setPluginInstallMode} setExporting={setExporting} />
                                {singleData.demo && <a href={singleData.demo} className="layout-button" target="_blank" rel="noreferrer">
                                    {__('View Demo', '--gctd--')} <IconEyeSVG width={12.8} height= {12.8} />
                                </a>}
                            </div>}
                        </div>
                        <div className="single-wrapper">
                            <h2>{singleData.title} {singleData.isPro && <div className="single-pro">PRO</div>}</h2>
                            <div className="single-layout-meta">
                                {singleData.author && <span className="single-layout-author">
                                    {__('by ', '--gctd--')}
                                    <a href={singleData.author.url} target="_blank" rel="noreferrer" >
                                        {singleData.author.name}
                                    </a>
                                </span>}
                                {singleData.like ?
                                    <div className="single-like active" onClick={() => likeLayout(singleData.slug, false)}>
                                        <IconHeartFullSVG size={14} /> {__('Liked', '--gctd--')}
                                    </div> : <div className="single-like" onClick={() => likeLayout(singleData.slug, true)}>
                                        <IconLoveSVG size={16} /> {__('Like', '--gctd--')}
                                    </div>
                                }
                                <span>
                                    {singleData.isPro}
                                    {singleData.pages.length} {__('Layouts', '--gctd--')}
                                </span>
                            </div>

                            {requirementStatus && <ThemeNotification
                                requirementStatus={requirementStatus}
                                library={libraryData}
                                slug={slug}
                                singleData={singleData}
                                setActive={setActive}
                                active={active}
                                setPluginInstallMode={setPluginInstallMode}
                            />}

                            <div className="single-layout-list">
                                {singleData.pages !== undefined && singleData.pages.map(page => {
                                    const singleClass = classnames('layout-single', {
                                        active: page.id === active
                                    });

                                    return <div className={singleClass} key={page.id} onClick={() => changeActive(page.id)}>
                                        <img src={page.coverImage} key={page.coverImage} />
                                        <span dangerouslySetInnerHTML={{ __html: page.title }} />
                                    </div>;
                                })}
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

    return themeExist && themeInstallBlock();
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

export default withSelect(select => {
    const { getLibraryData, getPluginData } = select('gutenverse/library');

    return {
        libraryData: getLibraryData(),
        pluginData: getPluginData(),
    };
})(SingleLayoutContent);
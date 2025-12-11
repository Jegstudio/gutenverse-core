import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import axios from 'axios';
import { IconCloseSVG, IconNotFoundSVG, IconInfoYellowSVG } from 'gutenverse-core/icons';
import { Loader } from 'react-feather';
import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch } from '@wordpress/data';
import { PluginInstallItem } from '../../../components/library/plugin-install-mode';
import { filterTheme, formatArray, getPluginRequirementStatus } from '../../../components/library/library-helper';
import { applyFilters } from '@wordpress/hooks';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { withDispatch } from '@wordpress/data';
import { DashboardBody, DashboardContent, DashboardHeader } from '../../components';
import { BannerPro, ButtonUpgradePro } from 'gutenverse-core/components';
import { activeTheme, clientUrl, upgradeProUrl } from 'gutenverse-core/config';
import { __, _n, sprintf } from '@wordpress/i18n';

const { installNonce, themeUrl } = window['GutenverseThemeList'];

const urlData = () => {
    const url = location.search.replace('?', '');
    const urlString = queryString.parse(url);

    return urlString;
};

const ThemeItem = (props) => {
    let exist = false;
    let active = false;

    const {
        theme,
        id,
        installed,
        getInstalledThemes,
        initialAction,
        setInitialAction,
        themeSlug,
    } = props;
    const { host, slug, demo, customAPI, customArgs, pro, status: postStatus, licenseType } = theme;
    const [status, setStatus] = useState(false);
    const { createInfoNotice } = useDispatch(noticesStore);

    useEffect(() => {
        if (slug === themeSlug) {
            if ('install' === initialAction) {
                installTheme(themeSlug, host);
            }

            if ('activate' === initialAction) {
                activateTheme(slug);
            }
        }
    }, [initialAction]);

    const activateTheme = () => {
        setStatus(slug);

        apiFetch({
            path: 'gutenverse-client/v1/themes/activate',
            method: 'POST',
            data: {
                stylesheet: slug,
            },
        })
            .then(() => { })
            .catch(() => { })
            .finally(() => {
                getInstalledThemes(() => {
                    setStatus(false);
                    setInitialAction('');

                    createInfoNotice(__('Theme Activated', '--gctd--'), {
                        type: 'snackbar',
                        isDismissible: true,
                    });
                });
            });
    };

    const installTheme = () => {
        let response = null;

        if ('wporg' === host) {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const formData = new FormData();
            formData.append('slug', slug);
            formData.append('action', 'install-theme');
            formData.append('_ajax_nonce', installNonce);

            setStatus(slug);

            response = axios.post(window.ajaxurl, formData, config);
        } else {
            setStatus(slug);
            let param = { slug };

            if (customAPI) {
                const { url, endpoint, route } = customAPI;
                param.info = url + endpoint + route;
            }

            response = apiFetch({
                path: 'gutenverse-client/v1/themes/install',
                method: 'POST',
                data: applyFilters(
                    'gutenverse.library.import.parameter',
                    {
                        ...param,
                        ...customArgs,
                    }
                )
            });
        }

        response
            .then(value => {
                if (value !== false) {
                    getInstalledThemes(() => {
                        setInitialAction('install' === initialAction ? 'activate' : '');
                        setStatus(false);
                        createInfoNotice(__('Theme Installed', '--gctd--'), {
                            type: 'snackbar',
                            isDismissible: true,
                        });
                    });
                } else {
                    setStatus(false);
                    createInfoNotice(__('Install Failed', '--gctd--'), {
                        type: 'snackbar',
                        isDismissible: true,
                    });
                }
            })
            .catch();
    };

    installed.map((file) => {
        if (file['stylesheet'] === theme['slug']) {
            exist = true;

            if (file['status'] === 'active') {
                active = true;
            }

            return;
        }
    });

    const loadButton = (exist) => {
        if (status === slug) {
            return (
                <span className={`${exist ? 'activate' : 'install'} theme-button`}>
                    <Loader size={14} />
                    {exist ? __('Activating', '--gctd--') : __('Installing', '--gctd--')}
                </span>
            );
        }

        if (exist) {
            return (
                <span className="activate theme-button" onClick={() => activateTheme()}>
                    {__('Activate Theme', '--gctd--')}
                </span>
            );
        }

        return (
            <span className="install theme-button" onClick={() => installTheme()}>
                {__('Install Now', '--gctd--')}
            </span>
        );
    };

    const actionButton = () => {
        const buttonPro = <ButtonUpgradePro licenseType={licenseType} link={`${upgradeProUrl}?utm_source=gutenverse&utm_medium=dashboard&utm_client_site=${clientUrl}&utm_client_theme=${activeTheme}`} licenseActiveButton={loadButton(exist)} isBanner={true} location="themeList" customStyles={{ marginRight: '10px' }} />;
        return pro ? buttonPro : loadButton();
    };

    const dev = '--dev_mode--';
    const devMode = 'true' === dev ? true : ('draft' === postStatus ? false : true);
    return devMode && (
        <div key={id} className={classnames('theme-data', { active: active })}>
            <div className="theme-thumbnail">
                {postStatus === 'draft' && <div className="draft-label">{__('DRAFT', '--gctd--')}</div>}
                <a href={demo} target="_blank" rel="noreferrer">
                    <img src={theme['cover'][0]} />
                </a>
                {
                    licenseType.length > 0 && pro && !active ? applyFilters('gutenverse-companion.demo-overlay', () => {
                        return <><div className="thumbnail-overlay"></div>
                            <div className="required-wrapper">
                                <p className="required-title">Required License</p>
                                <p className="required-tier">{formatArray(licenseType)}</p>
                            </div>
                        </>;
                    }, () => <></>, licenseType) : <></>
                }
                {active && <span className="status">{__('Currently Active', '--gctd--')}</span>}
            </div>
            <div className="theme-desc">
                <h3 className="theme-title">
                    <a href={demo} target="_blank" rel="noreferrer">
                        {`${theme['title']}`}
                    </a>
                </h3>
                <div className="theme-buttons">
                    {
                        active ? <div className="currently-active theme-button">{__('Theme Activated', '--gctd--')}</div> : <>
                            {actionButton()}
                            <a href={demo} target="_blank" rel="noreferrer" className="demo theme-button">
                                {__('View Demo', '--gctd--')}
                            </a>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

const PluginInstallThemeList = props => {
    const { plugins, data, setPluginInstallMode } = props;
    const { installedPlugin } = plugins;
    const { requirements, compatibleVersion } = data;
    const [installCounter, setInstallCounter] = useState(0);

    const increaseCounter = () => {
        setInstallCounter(counter => counter + 1);
    };

    const popupClass = classnames('plugin-install-popup', {
        'show-counter': installCounter > 0
    });

    return <div className={popupClass}>
        <div className="plugin-install-overlay" onClick={() => setPluginInstallMode(false)}></div>
        <div className="plugin-install-container">
            <div className="plugin-install-wrapper">
                <div className="plugin-close-wrapper" onClick={() => setPluginInstallMode(false)}>
                    <div className="plugin-close">
                        <IconCloseSVG />
                    </div>
                </div>
                <div className="plugin-install-inner">
                    <h2>{sprintf(__('%s - Plugin Requirement', '--gctd--'), data.title)}</h2>
                    <p>{__('Please install or update and activate these missing requirements plugin for this themes to work correctly. We recommend to backup your site before install/update plugin listed below.', '--gctd--')}</p>
                </div>
                <div className="plugin-requirement-notice">
                    <div className="plugin-requirement-icon">
                        <IconInfoYellowSVG />
                    </div>
                    <div className="plugin-requirement-content">
                        <strong>{__('Attention!', '--gctd--')}</strong>
                        &nbsp;
                        <span>{__('Please refresh this page after install or update plugin', '--gctd--')}</span>
                    </div>
                </div>
                <PluginInstallItem
                    plugin={{
                        installed: true,
                        name: 'Gutenverse',
                        slug: 'gutenverse',
                        version: compatibleVersion
                    }}
                    plugins={installedPlugin}
                    installPlugin={props.installPlugin}
                    activatePlugin={props.activatePlugin}
                    updatePlugin={props.updatePlugin}
                    increaseCounter={increaseCounter}
                />
                {requirements.map(requirement => {
                    const { slug } = requirement;
                    return <PluginInstallItem
                        key={slug}
                        plugin={requirement}
                        plugins={installedPlugin}
                        installPlugin={props.installPlugin}
                        activatePlugin={props.activatePlugin}
                        updatePlugin={props.updatePlugin}
                        increaseCounter={increaseCounter}
                    />;
                })}
            </div>
        </div>
    </div>;
};

const ThemesData = (props) => {
    const {
        plugins,
        installed,
        keyword,
        themeSlug,
        data,
        loading,
        setKeyword,
        getInstalledThemes,
        initialAction,
        installPlugin,
        setInitialAction,
        setCurrentItem,
        setPluginInstallMode
    } = props;
    if (loading) {
        return (
            <>
                <div className="theme-data fetching" />
                <div className="theme-data fetching" />
                <div className="theme-data fetching" />
                <div className="theme-data fetching" />
                <div className="theme-data fetching" />
                <div className="theme-data fetching" />
                <div className="theme-data fetching" />
                <div className="theme-data fetching" />
                <div className="theme-data fetching" />
            </>
        );
    } else {
        const { data: themes } = data;
        if (isEmpty(themes)) {
            return (
                <div className="not-found">
                    <IconNotFoundSVG />
                    <h2 className="not-found-title">{__('No result found!', '--gctd--')}</h2>
                    <span className="not-found-desc">{__('It seems we can’t find any results based on your search.', '--gctd--')}</span>
                    {'' !== keyword && (
                        <span className="not-found-button" onClick={() => setKeyword('')}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                            {__('Show All Themes', '--gctd--')}
                        </span>
                    )}
                </div>
            );
        } else {
            return themes.map((theme, id) => {
                return <ThemeItem key={theme.id}
                    theme={theme}
                    id={id}
                    installed={installed}
                    getInstalledThemes={getInstalledThemes}
                    initialAction={initialAction}
                    setInitialAction={setInitialAction}
                    keyword={keyword}
                    themeSlug={themeSlug}
                    plugins={plugins}
                    setCurrentItem={setCurrentItem}
                    setPluginInstallMode={setPluginInstallMode}
                    installPlugin={installPlugin}
                    activatePlugin={installPlugin}
                    updatePlugin={installPlugin}
                />;
            });
        }
    }
};

const changeSearchPath = (key, value) => {
    let { pathname, search } = location;
    const params = new URLSearchParams(search);
    value === '' ? params.delete(key) : params.set(key, value);
    window.history.replaceState({}, '', `${pathname}?${params}`);
};

const ThemeListPage = (props) => {
    const { library = null, plugins, installPlugin, activatePlugin, updatePlugin } = props;
    const [keyword, setKeyword] = useState('');
    const [themeSlug, setThemeSlug] = useState('');
    const [installed, setInstalled] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [initialAction, setInitialAction] = useState('');
    const [currentItem, setCurrentItem] = useState(null);
    const [pluginInstallMode, setPluginInstallMode] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [filter, setFilter] = useState({
        proFilter: '',
        categoryFilter: ''
    });
    const plans = [
        {
            value: '',
            label: 'All Plans'
        },
        {
            value: 'basic',
            label: 'Basic'
        },
        {
            value: 'professional',
            label: 'Professional'
        },
        {
            value: 'agency',
            label: 'Agency'
        },
        {
            value: 'enterprise',
            label: 'Enterprise'
        },
    ];
    const [categories, setCategories] = useState([
        {
            name: 'All Categories',
            slug: ''
        }
    ]);

    useEffect(() => {
        let body = document.body;

        if (pluginInstallMode) {
            body.classList.add('noscroll');
        } else {
            body.classList.remove('noscroll');
        }
    }, [pluginInstallMode]);

    useEffect(() => {
        const data = urlData();
        const { keyword, slug: themeSlug, action, plan, category } = data;

        if (action) {
            setInitialAction(action);
        }

        if (keyword) {
            setKeyword(keyword);
        }

        if (plan) {
            setFilter(prev => {
                return {
                    ...prev,
                    proFilter: plan
                };
            });
        }

        if (category) {
            setFilter(prev => {
                return {
                    ...prev,
                    categoryFilter: plan
                };
            });
        }

        if (themeSlug) {
            setThemeSlug(themeSlug);
        }

        getInstalledThemes();
    }, []);

    const getInstalledThemes = (func) => {
        apiFetch({
            path: 'wp/v2/themes',
            method: 'GET',
        }).then((data) => {
            setInstalled(data);
            func && func();
        });
    };

    useEffect(() => {
        const { themeData, themeCategories } = library;
        if (themeCategories) {
            const result = themeCategories.find(el => el.slug === 'category');
            const themeServerCategories = result?.childs.map(el => {
                return {
                    slug: el.slug,
                    name: el.name
                };
            });
            setCategories(prev => [...prev, ...themeServerCategories]);
        }
        if (themeData && null !== installed) {
            const result = filterTheme(themeData, {
                keyword,
                filter
            });
            setData(result);
            setLoading(false);
        }

    }, [library, installed, keyword, filter]);

    useEffect(() => {
        changeSearchPath('action', initialAction);
    }, [initialAction]);

    useEffect(() => {
        changeSearchPath('keyword', keyword);
        changeSearchPath('plan', filter.proFilter);
        changeSearchPath('category', filter.categoryFilter);
    }, [keyword, filter]);

    const themesData = {
        installed,
        keyword,
        themeSlug,
        data,
        loading,
        setKeyword,
        getInstalledThemes,
        initialAction,
        installPlugin,
        setInitialAction,
        plugins,
        setCurrentItem,
        setPluginInstallMode,
    };

    const handleOpened = (type) => {
        if (type === selectedFilter) {
            setSelectedFilter('');
        } else {
            setSelectedFilter(type);
        }
    };

    const handleClosed = () => setSelectedFilter('');

    return <>
        {pluginInstallMode && <PluginInstallThemeList
            plugins={plugins}
            setPluginInstallMode={setPluginInstallMode}
            name={currentItem.title}
            data={currentItem}
            installPlugin={installPlugin}
            activatePlugin={activatePlugin}
            updatePlugin={updatePlugin}
        />}
        <DashboardContent>
            <DashboardHeader>
                <div className="filter-wrapper">
                    <div
                        className={`plans-wrapper ${selectedFilter === 'plan' ? 'opened' : ''} ${filter.proFilter !== '' ? 'selected' : ''}`}
                        onMouseEnter={() => handleOpened('plan')}
                        onMouseLeave={handleClosed}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.625 11L2.375 4.125L5.8125 7.25L8 3.5L10.1875 7.25L13.625 4.125L12.375 11H3.625ZM12.375 12.875C12.375 13.25 12.125 13.5 11.75 13.5H4.25C3.875 13.5 3.625 13.25 3.625 12.875V12.25H12.375V12.875Z" fill={`${selectedFilter === 'plan' || filter.proFilter !== '' ? '#3B57F7' : '#00223D'}`} />
                        </svg>
                        {plans.find(el => el.value === filter.proFilter).label}
                        <div className="dropdown-wrapper">
                            {
                                plans.map(el => <div key={el.value} className="dropdown-item" onClick={() => setFilter({ ...filter, proFilter: el.value })}>{el.label}</div>)
                            }
                        </div>
                    </div>
                    <div
                        className={`category-wrapper ${selectedFilter === 'category' ? 'opened' : ''} ${filter.categoryFilter !== '' ? 'selected' : ''}`}
                        onMouseEnter={() => handleOpened('category')}
                        onMouseLeave={handleClosed}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 6.999C2.36739 6.999 2.24021 6.94632 2.14645 6.85255C2.05268 6.75879 2 6.63161 2 6.499V2.5C2 2.36739 2.05268 2.24021 2.14645 2.14645C2.24021 2.05268 2.36739 2 2.5 2H6.5C6.63261 2 6.75979 2.05268 6.85355 2.14645C6.94732 2.24021 7 2.36739 7 2.5V6.499C7 6.63161 6.94732 6.75879 6.85355 6.85255C6.75979 6.94632 6.63261 6.999 6.5 6.999H2.5ZM9.5 6.999C9.36739 6.999 9.24021 6.94632 9.14645 6.85255C9.05268 6.75879 9 6.63161 9 6.499V2.5C9 2.36739 9.05268 2.24021 9.14645 2.14645C9.24021 2.05268 9.36739 2 9.5 2H13.499C13.6316 2 13.7588 2.05268 13.8526 2.14645C13.9463 2.24021 13.999 2.36739 13.999 2.5V6.499C13.999 6.63161 13.9463 6.75879 13.8526 6.85255C13.7588 6.94632 13.6316 6.999 13.499 6.999H9.5ZM2.5 13.999C2.36739 13.999 2.24021 13.9463 2.14645 13.8526C2.05268 13.7588 2 13.6316 2 13.499V9.499C2 9.36639 2.05268 9.23921 2.14645 9.14545C2.24021 9.05168 2.36739 8.999 2.5 8.999H6.5C6.63261 8.999 6.75979 9.05168 6.85355 9.14545C6.94732 9.23921 7 9.36639 7 9.499V13.499C7 13.6316 6.94732 13.7588 6.85355 13.8526C6.75979 13.9463 6.63261 13.999 6.5 13.999H2.5ZM9.5 13.999C9.36739 13.999 9.24021 13.9463 9.14645 13.8526C9.05268 13.7588 9 13.6316 9 13.499V9.499C9 9.36639 9.05268 9.23921 9.14645 9.14545C9.24021 9.05168 9.36739 8.999 9.5 8.999H13.499C13.6316 8.999 13.7588 9.05168 13.8526 9.14545C13.9463 9.23921 13.999 9.36639 13.999 9.499V13.499C13.999 13.6316 13.9463 13.7588 13.8526 13.8526C13.7588 13.9463 13.6316 13.999 13.499 13.999H9.5Z" fill={`${selectedFilter === 'category' || filter.categoryFilter !== '' ? '#3B57F7' : '#00223D'}`} />
                        </svg>
                        {categories.find(el => el.slug === filter.categoryFilter).name}
                        <div className="dropdown-wrapper">
                            {
                                categories.map(el => <div key={el.slug} className="dropdown-item" onClick={() => setFilter({ ...filter, categoryFilter: el.slug })}>{el.name}</div>)
                            }
                        </div>
                    </div>
                </div>
                <div className="search-box">
                    <input type="text" className="control-input-text" placeholder={__('Search Theme...', '--gctd--')} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                    <i className={keyword === '' ? 'fa fa-search' : 'fa fa-times'} aria-hidden="true" onClick={() => setKeyword('')}></i>
                </div>
            </DashboardHeader>
            <DashboardBody>
                {/* <BannerPro
                    title={<>{__('Explore ', '--gctd--')}<span>{__(' Premium Themes ', '--gctd--')}</span><br />{__(' For Your Multipurpose Business', '--gctd--')}</>}
                    customStyles={{ margin: '0 0 40px' }}
                    container="themeList"
                    leftBannerImg="theme-list-graphic-theme-left.png"
                    rightBannerImg="theme-list-graphic-theme-right.png"
                    backgroundGradient="banner-dasboard-bg.png"
                    link={`${upgradeProUrl}?utm_source=gutenverse&utm_medium=dashboard&utm_client_site=${clientUrl}&utm_client_theme=${activeTheme}`}
                /> */}
                <div className="themelist-wrapper">
                    <ThemesData {...themesData} />
                </div>
            </DashboardBody>
        </DashboardContent>
    </>;
};

export default compose(
    withSelect(select => {
        const {
            getLibraryData,
            getPluginData,
        } = select('gutenverse/library');

        return {
            library: getLibraryData(),
            plugins: getPluginData()
        };
    }),
    withDispatch((dispatch) => {
        const {
            installPlugin,
            activatePlugin,
            updatePlugin
        } = dispatch('gutenverse/library');

        return {
            installPlugin,
            activatePlugin,
            updatePlugin
        };
    }),
)(ThemeListPage);

import { sprintf, _n, __ } from '@wordpress/i18n';
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
import { filterTheme, getPluginRequirementStatus } from '../../../components/library/library-helper';
import { applyFilters } from '@wordpress/hooks';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { withDispatch } from '@wordpress/data';
import { DashboardBody, DashboardContent, DashboardHeader } from '../../components';

const { installNonce, serverUrl, serverEndpoint, themeUrl } = window['GutenverseThemeList'];

export const httpClient = axios.create({
    baseURL: serverUrl + serverEndpoint,
});

const urlData = () => {
    const url = location.search.replace('?', '');
    const urlString = queryString.parse(url);

    return urlString;
};

const ThemeItem = (props) => {
    let exist = false;
    let active = false;

    const {
        plugins,
        theme,
        id,
        installed,
        getInstalledThemes,
        initialAction,
        setInitialAction,
        themeSlug,
        setCurrentItem,
        setPluginInstallMode,
    } = props;
    const { host, slug, demo, customAPI, customArgs, author, pro } = theme;
    const [status, setStatus] = useState(false);
    const { createInfoNotice } = useDispatch(noticesStore);
    const [requirementStatus, setRequirementStatus] = useState(false);
    const { installedPlugin } = plugins;

    useEffect(() => {
        const { requirements, compatibleVersion } = theme;
        const requirement = getPluginRequirementStatus({
            plugins: installedPlugin,
            requirements,
            compatibleVersion
        });
        setRequirementStatus(requirement);
    }, [theme, plugins]);

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

    const loadButton = (active, exist) => {
        if (status === slug) {
            return (
                <span className={`${exist ? 'activate' : 'install'} theme-button`}>
                    <Loader size={14} />
                    {exist ? __('Activating', '--gctd--') : __('Installing', '--gctd--')}
                </span>
            );
        }

        if (active) {
            return (
                <span className="activate theme-button" onClick={() => (location.href = themeUrl + `${slug}-dashboard`)}>
                    {__('Templates', '--gctd--')}
                </span>
            );
        }

        if (exist) {
            return (
                <span className="activate theme-button" onClick={() => activateTheme()}>
                    {__('Activate', '--gctd--')}
                </span>
            );
        }

        return (
            <span className="install theme-button" onClick={() => installTheme()}>
                {__('Install', '--gctd--')}
            </span>
        );
    };

    const setToCurrentItem = () => {
        setCurrentItem(theme);
        setPluginInstallMode(true);
    };

    const actionButton = () => {
        if (pro) {
            return <div className="theme-button pro" onClick={() => window.open(serverUrl)}>
                {__('Upgrade to Pro', '--gctd--')}
            </div>;
        } else {
            return requirementStatus?.length > 0 ? <div className="manage-plugin theme-button" onClick={setToCurrentItem}>
                {__('Manage Plugin', '--gctd--')}
            </div> : loadButton(active, exist);
        }
    };

    return (
        <div key={id} className={classnames('theme-data', { active: active })}>
            <div className="theme-thumbnail">
                <a href={demo} target="_blank" rel="noreferrer">
                    <img src={theme['cover'][0]} />
                </a>
                {active && <span className="status">{__('Active Theme', '--gctd--')}</span>}
            </div>
            <div className="theme-desc">
                <h3 className="theme-title">
                    {pro && <div className="pro-flag">PRO</div>}
                    <a href={demo} target="_blank" rel="noreferrer">
                        {`${theme['title']}`}
                    </a>
                    {requirementStatus?.length > 0 && <div className="section-requirement">
                        <div className="section-requirement-detail">
                            <p>{sprintf(
                                _n('There is plugin need to be installed or updated for this section work correctly.', 'There are %s plugins need to be installed or updated for this section work correctly.', requirementStatus.length, '--gctd--'),
                                requirementStatus.length
                            )}</p>
                            <a href="#" onClick={(e) => {
                                setToCurrentItem();
                                e.preventDefault();
                            }}>{__('Manage Plugin Requirement →', '--gctd--')}</a>
                        </div>
                        <div className="section-requirement-icon" onClick={() => setToCurrentItem()}>
                            <IconInfoYellowSVG />
                        </div>
                    </div>}
                </h3>
                {author && <span className="theme-author">
                    {__('by', '--gctd--')} {author.name}
                </span>}
                <div className="theme-buttons">
                    {applyFilters(
                        'gutenverse.library.themelist.import',
                        actionButton(),
                        () => loadButton(active, exist),
                        pro
                    )}
                    <a href={demo} target="_blank" rel="noreferrer" className="demo theme-button">
                        {__('View Demo', '--gctd--')}
                    </a>
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
                <PluginInstallItem
                    plugin={{
                        installed: true,
                        name: 'Gutenverse',
                        slug: '--gctd--',
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
        const { keyword, slug: themeSlug, action } = data;

        if (action) {
            setInitialAction(action);
        }

        if (keyword) {
            setKeyword(keyword);
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
        const { themeData } = library;
        if (themeData && null !== installed) {
            const result = filterTheme(themeData, {
                keyword,
            });
            setData(result);
            setLoading(false);
        }
    }, [library, installed, keyword]);

    useEffect(() => {
        changeSearchPath('action', initialAction);
    }, [initialAction]);

    useEffect(() => {
        changeSearchPath('keyword', keyword);
    }, [keyword]);

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
                <h2>{__('Discover themes for Gutenverse', '--gctd--')}</h2>
                <div className="search-box">
                    <input type="text" className="control-input-text" placeholder={__('Search Theme...', '--gctd--')} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                    <i className={keyword === '' ? 'fa fa-search' : 'fa fa-times'} aria-hidden="true" onClick={() => setKeyword('')}></i>
                </div>
            </DashboardHeader>
            <DashboardBody>
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

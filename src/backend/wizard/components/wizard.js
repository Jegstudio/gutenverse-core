import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { UpgradePro } from '../pages/upgrade-pro';
import { ImportTemplates } from '../pages/import-templates';
import apiFetch from '@wordpress/api-fetch';
import classnames from 'classnames';

const getInstalledThemes = (func) => {
    apiFetch({
        path: 'wp/v2/themes',
        method: 'GET',
    }).then((data) => {
        func && func(data);
    });
};

const ImportLoading = (props) => {
    let progress = '0%';
    const width = () => {
        switch (props?.progress) {
            case '1/4':
                progress = '25%';
                return 'twenty-five';
            case '2/4':
                progress = '50%';
                return 'fifty';
            case '3/4':
                progress = '75%';
                return 'seventy-five';
            case '4/4':
                progress = '100%';
                return 'hundred';
            default:
                progress = '0%';
                return 'zero';
        }
    };

    width();

    return <div className="installing-notice">
        <div className="installing-notice-container">
            <div className="importing-notice">
                <div className="notice-inner">
                    <span>{props?.message}</span>
                    <span>{progress}</span>
                </div>
                <div className="bar-progress-container">
                    <div className={'notice-bar-progress ' + `${width()}-percent`} />
                </div>
            </div>
        </div>
    </div>;
};

const SelectBaseTheme = ({ action, setAction, updateProgress, gutenverseWizard }) => {
    const { plugins, installNonce, ajaxurl } = gutenverseWizard;
    const [installing, setInstalling] = useState({ show: true, message: 'Preparing...', progress: '1/4' });
    const [reloadingSlug, setReloadingSlug] = useState(null);
    const [themeData, setThemeData] = useState(() => {
        return gutenverseWizard?.themeData || [];
    });

    useEffect(() => {
        let allActive = true;
        plugins?.map(plugin => {
            allActive = allActive && plugin?.active;
        });

        if (allActive) {
            setAction('done');
            setReloadingSlug(null);
        }
    }, []);

    const activateTheme = (slug) => {
        setInstalling({ show: true, message: 'Activating Theme...', progress: '3/4' });
        apiFetch({
            path: 'gutenverse-client/v1/themes/activate',
            method: 'POST',
            data: {
                stylesheet: slug,
            },
        })
            .then(() => { })
            .catch(() => {
                setInstalling({ show: true, message: 'Installing Failed', progress: '4/4' });
                console.error('Error during theme activation');
                setAction('done');
                setReloadingSlug(null);
            })
            .finally(() => {
                getInstalledThemes((themes) => {

                    const updatedThemeData = themeData.map(data => {
                        const matchingTheme = themes.find(theme => theme.stylesheet === data.slug);
                        if (matchingTheme) {
                            return {
                                ...data,
                                active: matchingTheme.status !== 'inactive',
                            };
                        }
                        return data;
                    });

                    setThemeData(updatedThemeData);

                    setInstalling({ show: true, message: 'Installing Complete', progress: '4/4' });
                    setAction('done');
                    setReloadingSlug(null);
                });
            });
    };

    const installTheme = (slug) => {
        setTimeout(() => {
            let response = null;
            const formData = new FormData();
            formData.append('slug', slug);
            formData.append('action', 'install-theme');
            formData.append('_ajax_nonce', installNonce);
            setInstalling({ show: true, message: 'Installing Theme...', progress: '2/4' });

            response = fetch(ajaxurl, {
                method: 'POST',
                body: formData,
            });

            response
                .then(value => {
                    if (value !== false) {
                        getInstalledThemes(() => {
                            setInstalling({ show: true, message: 'Theme Installed.', progress: '2/4' });
                        });
                        console.log(value);
                        activateTheme();
                    } else {
                        setInstalling({ show: true, message: 'Installing Failed', progress: '4/4' });
                        console.error('Error during theme installation');
                        setAction('done');
                        setReloadingSlug(null);
                    }
                })
                .catch(err => {
                    setInstalling({ show: true, message: 'Installing Failed', progress: '4/4' });
                    console.error('Error during theme installation: ' + err);
                    setAction('done');
                    setReloadingSlug(null);
                });
        }, 1500);
    };

    const boldWord = (str = '', word) => {
        const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
        const parts = str.split(regex);
        const matches = str.match(regex);

        return parts.map((part, index) => (
            <Fragment key={index}>
                {part}
                {index < matches?.length ? <span className="gutenverse">{matches[index]}</span> : null}
            </Fragment>
        ));
    };

    const installPlugins = (index = 0) => {
        if (plugins && index < plugins.length) {
            setTimeout(() => {
                setInstalling({ show: true, message: 'Installing Plugins...', progress: '2/4' });
                const plugin = plugins[index];

                if (!plugin?.installed) {
                    wp?.apiFetch({
                        path: 'wp/v2/plugins',
                        method: 'POST',
                        data: {
                            slug: plugin?.slug,
                            status: 'active'
                        },
                    }).then(() => {
                        installPlugins(index + 1);
                    }).catch((err) => {
                        setInstalling({ show: true, message: 'Installing Failed', progress: '4/4' });
                        console.error('Error during installing plugin: ' + err);
                    });
                } else if (!plugin?.active) {
                    wp?.apiFetch({
                        path: `wp/v2/plugins/plugin?plugin=${plugin?.slug}/${plugin?.slug}`,
                        method: 'POST',
                        data: {
                            status: 'active'
                        }
                    }).then(() => {
                        installPlugins(index + 1);
                    }).catch((err) => {
                        setInstalling({ show: true, message: 'Installing Failed', progress: '4/4' });
                        console.error('Error during plugin activation: ' + err);
                        installPlugins(index);
                    });
                } else {
                    installPlugins(index + 1);
                }
            }, 1500);
        } else {
            setInstalling({ show: true, message: 'Installing Complete', progress: '4/4' });
            setTimeout(() => {
                setAction('done');
                setReloadingSlug(null);
            }, 1500);
        }

    };

    const onInstall = () => {
        setAction('loading');
        installPlugins(0);
    };

    const pluginActions = () => {
        switch (action) {
            case 'loading':
            default:
                return <Fragment>
                    <div onClick={() => updateProgress('importTemplate', 1)} className="button-next">{__('Next', 'gutenverse')}</div>
                </Fragment>;
        }
    };

    const themeAction = (step, slug) => {
        setAction('loading');
        switch (step) {
            case 1 :
                installTheme(slug);
                break;
            case 2 :
            default:
                activateTheme(slug);
                break;
        }
    };

    const contentBody = themeData ?
        <div className="requirment-list">
            {themeData?.map((theme, key) => {
                const active = theme?.active;
                const isReloading = reloadingSlug === theme?.slug;

                return <div key={key} className={classnames('themes-data', { active: active })}>
                    <div className="theme-thumbnail">
                        <a href={'#'} target="_blank" rel="noreferrer">
                            <img src={theme?.image[0]} />
                        </a>
                        {active && <span className="status">{__('Active Theme', 'gutenverse')}</span>}
                    </div>
                    <div className="theme-desc">
                        <h3 className="theme-title">
                            <a href={'#'} target="_blank" rel="noreferrer">
                                {`${theme?.title}`}
                            </a>
                        </h3>
                        {isReloading ?
                            <Fragment>
                                <ImportLoading message={installing?.message} progress={installing?.progress} />
                            </Fragment> :
                            <div className="theme-buttons">
                                <div className="button-container">
                                    {
                                        (theme?.active) ?
                                            <div className="button-install installed">{__('Theme Active', 'gutenverse')}</div>
                                            : (theme?.installed) ?
                                                <div onClick={() => {
                                                    themeAction(2, theme?.slug);
                                                    onInstall();
                                                    setReloadingSlug(theme?.slug);
                                                } } className="button-install">{__('Activate Theme', 'gutenverse')}</div>
                                                :
                                                <div onClick={() => {
                                                    themeAction(1, theme?.slug);
                                                    onInstall();
                                                    setReloadingSlug(theme?.slug);
                                                } } className="button-install">{__('Install Theme', 'gutenverse')}</div>
                                    }
                                </div>
                                <a href={'#'} target="_blank" rel="noreferrer" className="demo theme-button">
                                    {__('View Theme', 'gutenverse')}
                                </a>
                            </div>}
                    </div>
                </div>;
            })}
        </div>
        :  <div className="requirment-list loading">
            <div className="loader-template"></div>
        </div>;

    return <div className="theme-install">
        <h1 className="content-title">{__('Choose Theme', 'gutenverse')}</h1>
        <p className="content-desc">{__('pick one of our theme and choose pebuilt template', 'gutenverse')}</p>
        {contentBody}
        <div className="plugin-actions">
            {pluginActions()}
        </div>
    </div>;
};

const WizardPage = () => {
    const [progress, setProgress] = useState('pluginAndTheme');
    const [progressCount, setProgressCount] = useState(0);
    const [action, setAction] = useState('install');
    const gutenverseWizard = window.GutenverseWizard;

    const updateProgress = (progress, inc) => {
        setProgress(progress);
        setProgressCount(inc);
    };

    const content = () => {
        switch (progress) {
            case 'done':
                // const { images } = window['GutenverseCompanionConfig'];
                const {adminUrl} =  window['GutenverseConfig'] || window['GutenverseDashboard'] || {};

                return <div className="finalizing">
                    <div className="image-wrapper">
                        {/* <img className="image-done" src={images + '/final.png'} /> */}
                    </div>
                    <div className="final-detail">
                        <h3 className="final-title">{__('Congratulations All Set 🤩', 'gutenverse')}</h3>
                        <p className="final-desc">{__('This theme is built with Gutenverse, a powerful and lightweight Gutenberg blocks and page builder plugin for the WordPress Site Editor.', 'gutenverse')}</p>
                        <div onClick={() => {
                            window.location.href = adminUrl ? adminUrl : window.location.origin + '/wp-admin/';
                        }} className="button-visit">{__('Visit Dashboard', 'gutenverse')}</div>
                    </div>
                </div>;
            case 'pluginAndTheme':
                return <SelectBaseTheme updateProgress={updateProgress} action={action} setAction={setAction} gutenverseWizard={gutenverseWizard} />;
            case 'upgradePro':
                return <UpgradePro updateProgress={updateProgress} />;
            case 'importTemplate':
            default:
                return <ImportTemplates updateProgress={updateProgress} />;
        }
    };

    return <div className="theme-wizard-wrapper">
        <div className="theme-wizard">
            <div className="wizard-header">
                <div className={`progress ${progress === 'pluginAndTheme' ? 'active' : ''} ${progressCount >= 0 ? 'done' : ''}`}>
                    <p className="number">1</p>
                    <h3 className="progress-title">{__('Welcome', 'gutenverse')}</h3>
                </div>
                <div className={`progress ${progress === 'importTemplate' ? 'active' : ''} ${progressCount >= 1 ? 'done' : ''}`}>
                    <p className="number">2</p>
                    <h3 className="progress-title">{__('Import Template', 'gutenverse')}</h3>
                    <h2 className="info-notice" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#3B57F7">
                            <path d="M6.781 0a6.782 6.782 0 1 0 .002 13.565A6.782 6.782 0 0 0 6.781 0m0 3.008a1.148 1.148 0 1 1 0 2.297 1.148 1.148 0 0 1 0-2.297m1.532 6.945a.33.33 0 0 1-.329.328H5.578a.33.33 0 0 1-.328-.328v-.656c0-.181.147-.328.328-.328h.328v-1.75h-.328a.33.33 0 0 1-.328-.328v-.657c0-.18.147-.328.328-.328h1.75c.181 0 .328.147.328.328V8.97h.328c.182 0 .329.147.329.328z"></path>
                        </svg>
                        <div className="popup">
                            <span>{__('You can only import demo if you use gutenverse base theme.', 'gutenverse')}</span>
                        </div>
                    </h2>
                </div>
                <div className={`progress ${progress === 'upgradePro' ? 'active' : ''} ${progressCount >= 2 ? 'done' : ''}`}>
                    <p className="number">3</p>
                    <h3 className="progress-title">{__('Upgrade Your Site', 'gutenverse')}</h3>
                </div>
                <div className={`progress ${progress === 'done' ? 'active' : ''} ${progressCount >= 3 ? 'done' : ''}`}>
                    <p className="number">4</p>
                    <h3 className="progress-title">{__('Finalizing', 'gutenverse')}</h3>
                </div>
            </div>
            <div className="wizard-body">
                {content()}
            </div>
        </div>
    </div>;
};

export default WizardPage;
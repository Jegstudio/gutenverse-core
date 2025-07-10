import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { UpgradePro } from '../pages/upgrade-pro';
import { ImportTemplates } from '../pages/import-templates';
import apiFetch from '@wordpress/api-fetch';

const getInstalledThemes = (func) => {
    apiFetch({
        path: 'wp/v2/themes',
        method: 'GET',
    }).then((data) => {
        func && func();
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

const InstallPlugin = ({ action, setAction, updateProgress }) => {
    const { plugins, installNonce, ajaxurl, themeData } = window.GutenverseWizard;
    const [installing, setInstalling] = useState({ show: true, message: 'Preparing...', progress: '1/4' });
    const [themeStatus, setThemeStatus] = useState('notExist');

    wp?.apiFetch({ path: '/wp/v2/themes' }).then(themes => {
        const themeSlug = themeData['slug'];
        const theme = themes.find(t => t.stylesheet === themeSlug);

        if (theme) {
            if (theme.status === 'active') {
                setThemeStatus('active');
            } else {
                setThemeStatus('installed');
            }
        } else {
            setThemeStatus('notExist');
        }
    });

    useEffect(() => {
        let allActive = true;
        plugins?.map(plugin => {
            allActive = allActive && plugin?.active;
        });

        if (allActive) {
            setAction('done');
        }
    }, []);

    const activateTheme = () => {
        setInstalling({ show: true, message: 'Activating Theme...', progress: '3/4' });
        apiFetch({
            path: 'gutenverse-client/v1/themes/activate',
            method: 'POST',
            data: {
                stylesheet: themeData['slug'],
            },
        })
            .then(() => { })
            .catch(() => {
                setInstalling({ show: true, message: 'Installing Failed', progress: '4/4' });
                console.error('Error during theme activation');
                setAction('done');
            })
            .finally(() => {
                getInstalledThemes(() => {
                    setInstalling({ show: true, message: 'Installing Complete', progress: '4/4' });
                    setAction('done');
                });
            });
    };

    const installTheme = () => {
        setTimeout(() => {
            let response = null;
            const formData = new FormData();
            formData.append('slug', themeData['slug']);
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
                        activateTheme();
                    } else {
                        setInstalling({ show: true, message: 'Installing Failed', progress: '4/4' });
                        console.error('Error during theme installation');
                        setAction('done');
                    }
                })
                .catch(err => {
                    setInstalling({ show: true, message: 'Installing Failed', progress: '4/4' });
                    console.error('Error during theme installation: ' + err);
                    setAction('done');
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
                return <Fragment>
                    <ImportLoading message={installing?.message} progress={installing?.progress} />
                </Fragment>;
            default:
                return <Fragment>
                    <div onClick={() => updateProgress('importTemplate', 1)} className="button-next">{__('Next', 'gutenverse')}</div>
                </Fragment>;
        }
    };

    const themeAction = (step) => {
        setAction('loading');
        switch (step) {
            case 1 :
                installTheme();
                break;
            case 2 :
            default:
                activateTheme();
                break;
        }
    };

    return <div className="plugin-install">
        <h1 className="content-title">{__('Install Required Plugins', 'gutenverse')}</h1>
        <p className="content-desc">{__('To access the full range of theme features, please install and activate the required plugins. Your enhanced user experience is just a few steps away!', 'gutenverse')}</p>
        <div className="requirment-list">
            {plugins?.map((plugin, key) => {
                return <div className="plugin-data" key={key}>
                    <div className="logo">
                        {plugin?.icons && plugin?.icons['1x'] && <img src={plugin?.icons['1x']} />}
                    </div>
                    <div className="plugin-detail">
                        <h3 className="plugin-title">{boldWord(plugin?.title, 'Gutenverse')}</h3>
                        <p className="plugin-desc">{plugin?.short_desc?.toLowerCase()}</p>
                    </div>
                    <div className="button-container">
                        <div onClick={() => onInstall() } className={`button-install ${(plugin?.active || action === 'done') && 'installed'}`}>
                            {__(`${plugin?.active || action === 'done' ? 'Plugin Active' : plugin?.installed ? 'Activate Plugin' : 'Install Plugin'}`, 'gutenverse')}
                        </div>
                    </div>
                </div>;
            })}
            <div className="theme-data">
                <div className="logo">
                    {themeData?.icon && <img src={themeData?.icons} />}
                </div>
                <div className="theme-detail">
                    <h3 className="theme-title">{boldWord(themeData?.name, 'Gutenverse')}</h3>
                    <p className="theme-desc"></p>
                </div>
                <div className="button-container">
                    {
                        ('installed' === themeStatus) ?
                            <div onClick={() => themeAction(2) } className="button-install">{__('Activate Theme', 'gutenverse')}</div>
                            : ('notExist' === themeStatus) ?
                                <div onClick={() => themeAction(1) } className="button-install">{__('Install Theme', 'gutenverse')}</div>
                                :
                                <div className="button-install installed">{__('Theme Active', 'gutenverse')}</div>
                    }
                </div>
            </div>
        </div>
        <div className="plugin-actions">
            {pluginActions()}
        </div>
    </div>;
};

const WizardPage = () => {
    const [progress, setProgress] = useState('pluginAndTheme');
    const [progressCount, setProgressCount] = useState(0);
    const [action, setAction] = useState('install');

    const updateProgress = (progress, inc) => {
        setProgress(progress);
        setProgressCount(inc);
    };

    const content = () => {
        switch (progress) {
            case 'done':
                // const { images } = window['GutenverseCompanionConfig'];
                const {adminUrl} =  window['GutenverseConfig'] || window['GutenverseDashboard'] || window.location.origin + '/wp-admin/';

                return <div className="finalizing">
                    <div className="image-wrapper">
                        {/* <img className="image-done" src={images + '/final.png'} /> */}
                    </div>
                    <div className="final-detail">
                        <h3 className="final-title">{__('Congratulations All Set 🤩', 'gutenverse')}</h3>
                        <p className="final-desc">{__('This theme is built with Gutenverse, a powerful and lightweight Gutenberg blocks and page builder plugin for the WordPress Site Editor.', 'gutenverse')}</p>
                        <div onClick={() => {
                            window.location.href = adminUrl;
                        }} className="button-visit">{__('Visit Dashboard', 'gutenverse')}</div>
                    </div>
                </div>;
            case 'pluginAndTheme':
                return <InstallPlugin updateProgress={updateProgress} action={action} setAction={setAction} />;
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
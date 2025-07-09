import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { UpgradePro } from '../pages/upgrade-pro';
import { ImportTemplates } from '../pages/import-templates';
import apiFetch from '@wordpress/api-fetch';
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch } from '@wordpress/data';

// const activateTheme = (createInfoNotice, slug) => {
//     // setStatus(slug);

//     apiFetch({
//         path: 'gutenverse-client/v1/themes/activate',
//         method: 'POST',
//         data: {
//             stylesheet: slug,
//         },
//     })
//         .then(() => { })
//         .catch(() => { })
//         .finally(() => {
//             createInfoNotice(__('Theme Activated', '--gctd--'), {
//                 type: 'snackbar',
//                 isDismissible: true,
//             });
//         });
// };

// const installTheme = (createInfoNotice, slug) => {
//     let response = null;

//     const config = { headers: { 'Content-Type': 'multipart/form-data' } };
//     const formData = new FormData();
//     formData.append('slug', slug);
//     formData.append('action', 'install-theme');
//     formData.append('_ajax_nonce', installNonce);

//     setStatus(slug);

//     response = axios.post(window.ajaxurl, formData, config);

//     response
//         .then(value => {
//             if (value !== false) {
//                 getInstalledThemes(() => {
//                     setInitialAction('install' === initialAction ? 'activate' : '');
//                     setStatus(false);
//                     createInfoNotice(__('Theme Installed', '--gctd--'), {
//                         type: 'snackbar',
//                         isDismissible: true,
//                     });
//                 });
//             } else {
//                 setStatus(false);
//                 createInfoNotice(__('Install Failed', '--gctd--'), {
//                     type: 'snackbar',
//                     isDismissible: true,
//                 });
//             }
//         })
//         .catch();
// };

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
    const { plugins } = window.GutenverseWizard;
    const [installing, setInstalling] = useState({ show: true, message: 'Preparing...', progress: '1/4' });

    useEffect(() => {
        let allActive = true;
        plugins?.map(plugin => {
            allActive = allActive && plugin?.active;
        });

        if (allActive) {
            setAction('done');
        }
    }, []);

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
                    }).catch(() => {
                        console.error('Error during installing plugin');
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
                    }).catch(() => {
                        console.error('Error during plugin activation');
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
            case 'done':
                return <Fragment>
                    <div className="button-done">{__('Installed & Activated', 'gutenverse')}</div>
                    <div onClick={() => updateProgress('importTemplate', 1)} className="button-next">{__('Next', 'gutenverse')}</div>
                </Fragment>;
            case 'loading':
                return <Fragment>
                    <ImportLoading message={installing?.message} progress={installing?.progress} />
                </Fragment>;
            case 'install':
            default:
                return <Fragment>
                    <div onClick={() => onInstall()} className="button-install">{__('Install Required Plugins', 'gutenverse')}</div>
                </Fragment>;
        }
    };

    return <div className="plugin-install">
        <h1 className="content-title">{__('Install Required Plugins', 'gutenverse')}</h1>
        <p className="content-desc">{__('To access the full range of theme features, please install and activate the required plugins. Your enhanced user experience is just a few steps away!', 'gutenverse')}</p>
        <div className="plugin-list">
            {plugins?.map((plugin, key) => {
                return <div className="plugin-data" key={key}>
                    <div className="logo">
                        {plugin?.icons && plugin?.icons['1x'] && <img src={plugin?.icons['1x']} />}
                    </div>
                    <div className="plugin-detail">
                        <h3 className="plugin-title">{boldWord(plugin?.title, 'Gutenverse')}</h3>
                        <p className="plugin-desc">{plugin?.short_desc?.toLowerCase()}</p>
                    </div>
                </div>;
            })}
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
    // const { installNonce } = window['GutenverseThemeList'];
    // const { createInfoNotice } = useDispatch(noticesStore);
    // const [pluginState, setPluginState] = useState('install');

    const updateProgress = (progress, inc) => {
        setProgress(progress);
        setProgressCount(progressCount + inc);
    };

    // const installPlugins = (index = 0) => {
    //     const { plugins } = window.GutenverseWizard;
    //     if (plugins && index < plugins.length) {
    //         const plugin = plugins[index];

    //         if (!plugin?.installed) {
    //             if (plugin?.download_url) {
    //                 wp?.apiFetch({
    //                     path: 'gtb-themes-backend/v1/install/plugins',
    //                     method: 'POST',
    //                     data: {
    //                         slug: plugin?.slug,
    //                         download_url: plugin?.download_url
    //                     }
    //                 }).then(() => {
    //                     wp?.apiFetch({
    //                         path: `wp/v2/plugins/plugin?plugin=${plugin?.slug}/${plugin?.slug}`,
    //                         method: 'POST',
    //                         data: {
    //                             status: 'active'
    //                         }
    //                     }).then(() => {
    //                         installPlugins(index + 1);
    //                     }).catch(() => {
    //                         console.error('Error during plugin activation');
    //                         installPlugins(index);
    //                     });
    //                 });
    //             } else {
    //                 wp?.apiFetch({
    //                     path: 'wp/v2/plugins',
    //                     method: 'POST',
    //                     data: {
    //                         slug: plugin?.slug,
    //                         status: 'active'
    //                     },
    //                 }).then(() => {
    //                     installPlugins(index + 1);
    //                 }).catch(() => {
    //                     console.error('Error during installing plugin');
    //                 });
    //             }
    //         } else if (!plugin?.active) {
    //             wp?.apiFetch({
    //                 path: `wp/v2/plugins/plugin?plugin=${plugin?.slug}/${plugin?.slug}`,
    //                 method: 'POST',
    //                 data: {
    //                     status: 'active'
    //                 }
    //             }).then(() => {
    //                 installPlugins(index + 1);
    //             }).catch(() => {
    //                 console.error('Error during plugin activation');
    //                 installPlugins(index);
    //             });
    //         } else {
    //             installPlugins(index + 1);
    //         }
    //     } else {
    //         setPluginState('done');
    //     }
    // };

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
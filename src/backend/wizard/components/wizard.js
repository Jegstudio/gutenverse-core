import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { UpgradePro } from '../pages/upgrade-pro';
import { ImportTemplates } from '../pages/import-templates';
import apiFetch from '@wordpress/api-fetch';
import classnames from 'classnames';
import { requirementCheck } from '../helper';
import { applyFilters } from '@wordpress/hooks';

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

const SelectBaseTheme = ({ action, setAction, updateProgress, gutenverseWizard, setClicked, requirement }) => {
    const { plugins, installNonce, ajaxurl, gutenverseImgDir, ImgDir } = gutenverseWizard;
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
                setClicked(prev => prev + 1);
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
                    window.GutenverseWizard.theme_slug = slug;
                    setInstalling({ show: true, message: 'Installing Complete', progress: '4/4' });
                    setAction('done');
                    setReloadingSlug(null);
                    setClicked(prev => prev + 1);
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
                        activateTheme(slug);
                    } else {
                        setInstalling({ show: true, message: 'Installing Failed', progress: '4/4' });
                        console.error('Error during theme installation');
                        setAction('done');
                        setClicked(prev => prev + 1);
                        setReloadingSlug(null);
                    }
                })
                .catch(err => {
                    setInstalling({ show: true, message: 'Installing Failed', progress: '4/4' });
                    console.error('Error during theme installation: ' + err);
                    setAction('done');
                    setClicked(prev => prev + 1);
                    setReloadingSlug(null);
                });
        }, 1500);
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
                return <Fragment>
                    <ImportLoading message={installing?.message} progress={installing?.progress} />
                </Fragment>;
            default:
                return <Fragment>
                    {/* <div onClick={() => updateProgress('startWizard', 0 )} className="button-back">
                        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5.1C15.3314 5.1 15.6 4.83137 15.6 4.5C15.6 4.16863 15.3314 3.9 15 3.9V5.1ZM0.575736 4.07574C0.341421 4.31005 0.341421 4.68995 0.575736 4.92426L4.39411 8.74264C4.62843 8.97696 5.00833 8.97696 5.24264 8.74264C5.47696 8.50833 5.47696 8.12843 5.24264 7.89411L1.84853 4.5L5.24264 1.10589C5.47696 0.871573 5.47696 0.491674 5.24264 0.257359C5.00833 0.0230446 4.62843 0.0230446 4.39411 0.257359L0.575736 4.07574ZM15 3.9L1 3.9V5.1L15 5.1V3.9Z" fill="#99A2A9" />
                        </svg>
                        {__('Back', 'gutenverse')}
                    </div> */}
                    <div onClick={() => requirement ? updateProgress('importTemplate', 2) : updateProgress('upgradePro', 3)} className="button-next">{__('Next', 'gutenverse')}</div>
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

    // if more than one base theme later
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
                                                    setClicked(prev => prev + 1);
                                                } } className="button-install">{__('Activate Theme', 'gutenverse')}</div>
                                                :
                                                <div onClick={() => {
                                                    themeAction(1, theme?.slug);
                                                    onInstall();
                                                    setReloadingSlug(theme?.slug);
                                                    setClicked(prev => prev + 1);
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

    const checkIcon =
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="0.5" width="16" height="16" rx="8" fill="#5C51F3"/>
        <g clipPath="url(#clip0_23261_18564)">
            <path d="M7.27452 12.1399L4.36523 8.95802L5.19629 8.04909L7.27511 10.3208L7.27452 10.3214L12.2615 4.86719L13.0925 5.77612L8.10558 11.231L7.27511 12.1393L7.27452 12.1399Z" fill="white"/>
        </g>
        <defs>
            <clipPath id="clip0_23261_18564">
                <rect x="4.33545" y="4.94922" width="8.70001" height="8.70001" rx="4.35001" fill="white"/>
            </clipPath>
        </defs>
    </svg>;

    return <div className="theme-install">
        <div className="content-wrapper">
            <img className="image bg-image-wizard-cta" src={ImgDir + '/wizard-bg-cta-companion.png'} />
            <img className="image bg-list-demo-wizard" src={ImgDir + '/wizard-bg-list-demo.png'} />
            <img className="image wizard-mockup-demo-companion" src={ImgDir + '/wizard-mockup-demo-companion.png'} />
            <div className="image wizard-mockup-demo-companion layout"></div>
            <div className="text-content">
                <h1 className="content-title">{__('Supercharge Gutenverse With ', 'gutenverse')}
                    <span>{__('Unibiz Theme!', 'gutenverse')}</span>
                </h1>
                <p className="content-list">
                    {checkIcon}
                    {__('50+ Stunning Demo Sites', 'gutenverse')}
                </p>
                <p className="content-list">
                    {checkIcon}
                    {__('One-Click Full Site Import', 'gutenverse')}
                </p>
                <p className="content-list">
                    {checkIcon}
                    {__('2x Faster Site Performance', 'gutenverse')}
                </p>
                <p className="content-list">
                    {checkIcon}
                    {__('Experience a Next-Level FSE Theme', 'gutenverse')}
                </p>
                <div onClick={() => {
                    themeAction(1, 'unibiz');
                    onInstall();
                    setReloadingSlug('unibiz');
                    setClicked(prev => prev + 1);
                } } className={`button-install ${requirement ? 'complete' : ''}`}>
                    {__(requirement ? 'Unibiz Installed' : 'Install Unibiz Theme', 'gutenverse')}
                </div>
            </div>
        </div>
        <div className="wizard-footer">
            {pluginActions()}
        </div>
    </div>;
};

const GettingStarted = ({updateProgress, gutenverseImgDir}) => {
    return <div className="getting-started">
        <img className="bg-image-wizard" src={gutenverseImgDir + '/wizard-bg-welcome.png'} />
        <div className="content-top">
            <p className="welcome">{__('WELCOME', 'gutenverse')}</p>
            <h3 className="content-title">
                {__('Get Started with ', 'gutenverse')}
                <span className="gradient-text">{__('Gutenverse', 'gutenverse')}</span>
            </h3>
            <p className="content-desc">
                {__('Thank you for choosing Gutenverse. Follow these simple steps of easy setup wizard & enjoy your Full Site Editing experience now!', 'gutenverse')}
            </p>
            <div onClick={() => updateProgress('pluginAndTheme', 1)} className="button-next">{__('Proceed to Next Step', 'gutenverse')}</div>
        </div>
        <img className="wizard-image item-1" src={gutenverseImgDir + '/wizard-mockup-welcome.png'} />
        <img className="wizard-image item-2" src={gutenverseImgDir + '/wizard-blink-blue.png'} />
        <div className="content-bottom">
            <p className="consent-notice">{__('By proceeding, you grant permission for this plugin to collect your information. ', 'gutenverse')}</p>
            <a
                className="consent-notice-link"
                href="https://gutenverse.com/privacy-policy/"
                title="View our privacy policy"
                target="_blank"
                rel="noopener noreferrer"
            >
                {__('Find out what we collect.', 'gutenverse')}
            </a>
        </div>
    </div>;
};

const WizardPage = () => {
    const [progress, setProgress] = useState('startWizard');
    const [progressCount, setProgressCount] = useState(0);
    const [action, setAction] = useState('install');
    const [clicked, setClicked] = useState(0);
    const [requirement, setRequirement] = useState(0);
    const gutenverseWizard = window.GutenverseWizard;
    const emptyLicense = applyFilters('gutenverse.panel.tab.pro.content', true);

    const updateProgress = (progress, inc) => {
        setProgress(progress);
        setProgressCount(inc);
    };

    useEffect(() => {
        setTimeout(() => {
            requirementCheck()
                .then(response => {
                    setRequirement(response);
                });
        }, 200);
    }, [clicked]);

    const content = () => {
        const {
            gutenverseImgDir,
            ImgDir
        } = window['GutenverseWizard'];
        const {adminUrl} =  window['GutenverseConfig'] || window['GutenverseDashboard'] || {};

        switch (progress) {
            case 'pluginAndTheme':
                return <SelectBaseTheme updateProgress={updateProgress} action={action} setAction={setAction} gutenverseWizard={gutenverseWizard} setClicked={setClicked} requirement={requirement} />;
            case 'importTemplate':
                return <ImportTemplates updateProgress={updateProgress} emptyLicense={emptyLicense} />;
            case 'upgradePro':
                return <UpgradePro updateProgress={updateProgress} requirement={requirement}/>;
            case 'done':

                return <div className="finalizing">
                    <div className="image-wrapper">
                        <img className="image-done" src={gutenverseImgDir + '/final.png'} />
                    </div>
                    <div className="final-detail">
                        <h3 className="final-title">{__('Congratulations All Set 🤩', 'gutenverse')}</h3>
                        <p className="final-desc">{__('Gutenverse is a powerful and lightweight Gutenberg blocks and page builder plugin for WordPress Site Editor.', 'gutenverse')}</p>
                        <div onClick={() => {
                            window.location.href = adminUrl ? adminUrl : window.location.origin + '/wp-admin/';
                        }} className="button-visit">{__('Visit Dashboard', 'gutenverse')}</div>
                    </div>
                </div>;
            case 'startWizard':
            default:
                return <GettingStarted updateProgress={updateProgress} gutenverseImgDir={gutenverseImgDir} ImgDir={ImgDir} />;
        }
    };

    return <div className="theme-wizard-wrapper">
        <div className="theme-wizard">
            <div className="wizard-header">
                <div className={`progress ${progress === 'startWizard' ? 'active' : ''} ${progressCount >= 0 ? 'done' : ''}`}>
                    <p className="number">1</p>
                    <h3 className="progress-title">{__('Getting Started', 'gutenverse')}</h3>
                </div>
                <div className={`progress ${progress === 'pluginAndTheme' ? 'active' : ''} ${progressCount >= 1 ? 'done' : ''}`}>
                    <p className="number">2</p>
                    <h3 className="progress-title">{__('Unibiz Theme', 'gutenverse')}</h3>
                </div>
                {requirement && <div className={`progress ${progress === 'importTemplate' ? 'active' : ''} ${progressCount >= 2 ? 'done' : ''}`}>
                    <p className="number">3</p>
                    <h3 className="progress-title">{__('Import Template', 'gutenverse')}</h3>
                </div>}
                {emptyLicense && <div className={`progress ${progress === 'upgradePro' ? 'active' : ''} ${progressCount >= 3 ? 'done' : ''}`}>
                    <p className="number">{requirement ? '4' : '3'}</p>
                    <h3 className="progress-title">{__('Upgrade Your Site', 'gutenverse')}</h3>
                </div>}
                <div className={`progress ${progress === 'done' ? 'active' : ''} ${progressCount >= 4 ? 'done' : ''}`}>
                    <p className="number">{requirement && emptyLicense ? '5' : '4'}</p>
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
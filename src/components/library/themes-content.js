import { useEffect, useState, useRef } from '@wordpress/element';
import PluginInstallMode from './plugin-install-mode';
import { useSelect, dispatch, withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { IconArrowRightSVG, IconDownloadSVG, IconLibraryThemeListSVG, IconLoadingSVG } from 'gutenverse-core/icons';
import apiFetch from '@wordpress/api-fetch';
import { installAndActivateTheme, installingPlugins } from 'gutenverse-core/helper';

const ThemesContent = (props) => {
    const { imgDir, proDemoUrl, domainURL } = window['GutenverseConfig'] || window['GutenverseDashboard'] ||{};
    const [buttonText, setButtonText] = useState(__('Install Unibiz Theme', 'gutenverse'));
    const activateTheme = (slug) => {
        setButtonText(<IconLoadingSVG />);
        const themeSlug = 'unibiz'; // change this to your theme slug
        const pluginsList = [
            { name: 'Gutenverse Companion', slug: 'gutenverse-companion', version: '', url: '' },
        ];

        // Step 1: Install + Activate Theme
        installAndActivateTheme(themeSlug)
            .then(themeResponse => {
                console.log('Theme installed and activated:', themeResponse);
                // Step 2: Install + Activate Plugins
                return installingPlugins(pluginsList);
            })
            .then(() => {
                console.log('All plugins installed and activated!');
                window.location.replace(`${domainURL}/wp-admin/admin.php?page=gutenverse-companion-dashboard&path=demo`);
            })
            .catch(err => {
                console.error('Installation failed:', err);
                alert('Something went wrong during installation.');
                setButtonText(__('Install Unibiz Theme', 'gutenverse'));
            });
    };
    return <>
        <div id="gutenverse-library-themes-content-wrapper">
            <div className="banner-wrapper">
                <img className="background-banner" src={`${imgDir}/wizard-bg-cta-companion.png`} alt="background" />
                <div className="banner-content">
                    <div className="banner-glitter" style={{ backgroundImage: `url(${imgDir}/wizard-bg-confetti-unibiz.png)` }}></div>
                    <div className="col-1">
                        <div className="title-wrapper">
                            <h2 className="title">{__('Supercharge Gutenverse', 'gutenverse')}</h2>
                            <h2 className="title">{__('With', 'gutenverse')} <span className="highlight-title">{__('Unibiz Theme!', 'gutenverse')}</span></h2>
                            <div className="list-row">
                                <IconLibraryThemeListSVG />
                                <span className="list-text">{__('50+ Stunning Demo Sites', 'gutenverse')}</span>
                            </div>
                            <div className="list-row">
                                <IconLibraryThemeListSVG />
                                <span className="list-text">{__('One-Click Full Site Import', 'gutenverse')}</span>
                            </div>
                            <div className="list-row">
                                <IconLibraryThemeListSVG />
                                <span className="list-text">{__('Exclusive Template Library', 'gutenverse')}</span>
                            </div>
                            <div className="list-row">
                                <IconLibraryThemeListSVG />
                                <span className="list-text">{__('2x Faster Site Performance', 'gutenverse')}</span>
                            </div>
                            <div className="list-row">
                                <IconLibraryThemeListSVG />
                                <span className="list-text">{__('Experience a Next-Level FSE Theme', 'gutenverse')}</span>
                            </div>
                            <div className="action-wrapper">
                                <div className="button-install-theme" onClick={activateTheme}>{buttonText}</div>
                                <a className="button-learn-more" href={`${proDemoUrl}/unibiz/`} target="_blank" rel="noreferrer">{__('Learn More', 'gutenverse')}</a>
                            </div>
                            <p className="notice-text">{__('By clicking “Install Unibiz Theme” I agree to install & activate Gutenverse Companion plugin.', 'gutenverse')}</p>
                        </div>
                    </div>
                    <div className="col-2" style={{ backgroundImage: `url(${imgDir}/wizard-bg-list-demo.png)` }}>
                        <img className="mockup-demo-image" src={`${imgDir}/wizard-mockup-demo-companion-with-shadow.png`} alt="computer" />
                    </div>
                </div>
            </div>
        </div >
    </>;
};

export default withSelect(select => {
    const { getLibraryData, getModalData } = select('gutenverse/library');

    return {
        modalData: getModalData(),
        libraryData: getLibraryData()
    };
})(ThemesContent);
import { useEffect, useState, useRef } from '@wordpress/element';
import PluginInstallMode from './plugin-install-mode';
import { useSelect, dispatch, withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { IconArrowRightSVG, IconDownloadSVG, IconLibraryThemeListSVG, IconLoadingSVG } from 'gutenverse-core/icons';
import apiFetch from '@wordpress/api-fetch';

const ThemesContent = (props) => {
    const { imgDir, proDemoUrl } = window['GutenverseConfig'] || {};
    const [buttonText, setButtonText] = useState(__('Install Unibiz Theme', 'gutenverse'));
    const activateTheme = (slug) => {
        setButtonText(<IconLoadingSVG/>);
        setTimeout(() => {
            setButtonText(__('Installed and Activated', 'gutenverse'));
        }, 500);
    };
    return <>
        <div id="gutenverse-library-themes-content-wrapper">
            <div className="banner-wrapper">
                <img className="background-banner" src={`${imgDir}/wizard-bg-cta-companion.png`} alt="background" />
                <div className="banner-content">
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
                                <a className="button-learn-more" href={`${proDemoUrl}/unibiz/`} target="_blank" rel="noreferrer">{__('Learn More', 'gutenverse')} <IconArrowRightSVG /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <img className="mockup-demo-image" src={`${imgDir}/wizard-mockup-demo-companion.png`} alt="computer" />
                    </div>
                </div>
                <img className="list-demo-image" src={`${imgDir}/wizard-bg-list-demo.png`} alt="computer" />
                <img className="banner-glitter" src={`${imgDir}/wizard-bg-confetti-unibiz.png`} alt="confetti" />
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
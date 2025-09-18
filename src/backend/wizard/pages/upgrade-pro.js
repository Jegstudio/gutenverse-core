import { __ } from '@wordpress/i18n';

export const UpgradePro = ({ updateProgress, requirement }) => {

    const {
        gutenverseImgDir
    } = window['GutenverseWizard'];

    return <div className="upgrade-pro-wrapper"  style={{ backgroundImage: `url(${gutenverseImgDir}/bg-upgrade-wizard.png)` }}>
        <div className="upgrade-pro-content">
            <h3 className="content-title">
                {__('Unlock Limitless Possibilities with ', 'gutenverse')}
                <span className="gradient-text">{__('Gutenverse PRO', 'gutenverse')}</span>
            </h3>
            <p className="content-desc">
                {__('Empowering you to build a website that truly stands out with advanced features and seamless integration.', 'gutenverse')}
            </p>
            <div className="upgrade-pro-button" onClick={() => window.open('https://gutenverse.com/pro', '_blank')}>
                <div className="button-content-wrapper">
                    <span>{__('Upgrade To PRO', 'gutenverse')}</span>
                    <svg width={16} height={16} viewBox="0 0 15 15" fill={'white'} transform={'translate(0,0)'} xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill={'white'} />
                    </svg>
                </div>
            </div>
            <img className="upgrade-image" src={gutenverseImgDir + '/upgrade-content.png'} />
        </div>
        <div className="upgrade-pro-actions">
            <div onClick={() => requirement ? updateProgress('importTemplate', 2) : updateProgress('pluginAndTheme', 1)} className="button-back">
                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 5.1C15.3314 5.1 15.6 4.83137 15.6 4.5C15.6 4.16863 15.3314 3.9 15 3.9V5.1ZM0.575736 4.07574C0.341421 4.31005 0.341421 4.68995 0.575736 4.92426L4.39411 8.74264C4.62843 8.97696 5.00833 8.97696 5.24264 8.74264C5.47696 8.50833 5.47696 8.12843 5.24264 7.89411L1.84853 4.5L5.24264 1.10589C5.47696 0.871573 5.47696 0.491674 5.24264 0.257359C5.00833 0.0230446 4.62843 0.0230446 4.39411 0.257359L0.575736 4.07574ZM15 3.9L1 3.9V5.1L15 5.1V3.9Z" fill="#99A2A9" />
                </svg>
                {__('Back', 'gutenverse')}
            </div>
            <div onClick={() => updateProgress('done', 4)} className="button-next">{__('Next', 'gutenverse')}</div>
        </div>
    </div>;
};
import { ButtonUpgradePro, EscListener } from 'gutenverse-core/components';
import { CloseIcon } from 'gutenverse-core/icons';
import { activeTheme, clientUrl, upgradeProUrl } from 'gutenverse-core/config';
import { __ } from '@wordpress/i18n';
import { Loader } from 'react-feather';

export const UpgradePro = ({ setInactive, popupRef }) => {

    const { imgDir } = window['GutenverseDashboard'];
    return <div className="popup-content upgrade" ref={popupRef}>
        <div className="close" onClick={() => setInactive()}>
            <CloseIcon />
        </div>
        <div className="content">
            <img className="image popup-image-background" src={`${imgDir}/pop-up-bg-popup-banner.png`} />
            <img className="image popup-image-mockup" src={`${imgDir}/pop-up-mockup-pro.png`} />
            <img className="image popup-image-cube" src={`${imgDir}/pop-up-3d-cube-2.png`} />
            <img className="image popup-image-element1" src={`${imgDir}/pop-up-icon-element.png`} />
            <img className="image popup-image-element2" src={`${imgDir}/pop-up-icon-element-2.png`} />
            <img className="image popup-image-element3" src={`${imgDir}/pop-up-icon-element-3.png`} />
            <img className="image popup-image-arrow" src={`${imgDir}/banner-arrow-blue.png`} />
            <div className="content">
                <h3 className="details">
                    {__('Upgrade ', '--gctd--')}<span>{__(' Gutenverse PRO ', '--gctd--')}</span>{__(' version to ', '--gctd--')}<br />{__(' unlock these premium features', '--gctd--')}
                </h3>
                <ButtonUpgradePro location="popup" isBanner={true} link={`${upgradeProUrl}?utm_source=gutenverse&utm_medium=dashboard&utm_client_site=${clientUrl}&utm_client_theme=${activeTheme}`} customStyles={{ height: '16px', padding: '12px 25px 12px 30px' }} />
            </div>
        </div>
    </div>;
};


export const UpgradeTier = ({ setInactive, popupRef }) => {

    const { imgDir } = window['GutenverseDashboard'];
    return <div className="popup-content upgrade" ref={popupRef}>
        <div className="close" onClick={() => setInactive()}>
            <CloseIcon />
        </div>
        <div className="content">
            <img className="image popup-image-background" src={`${imgDir}/pop-up-bg-popup-banner.png`} />
            <img className="image popup-image-mockup" src={`${imgDir}/pop-up-mockup-pro.png`} />
            <img className="image popup-image-cube" src={`${imgDir}/pop-up-3d-cube-2.png`} />
            <img className="image popup-image-element1" src={`${imgDir}/pop-up-icon-element.png`} />
            <img className="image popup-image-element2" src={`${imgDir}/pop-up-icon-element-2.png`} />
            <img className="image popup-image-element3" src={`${imgDir}/pop-up-icon-element-3.png`} />
            <img className="image popup-image-arrow" src={`${imgDir}/banner-arrow-blue.png`} />
            <div className="content">
                <h3 className="details">
                    This Feature Available at Professional or Higher Plan!
                </h3>
                <a href="https://gutenverse.com/pricing" class="button-upgrade-plan left button-upgrade-plan-banner" target="_blank" rel="noreferrer">Upgrade Plan Now</a>
            </div>
        </div>
    </div>;
};

export const InstallContent = ({ loading, actionButton, success, buttonText, error, setInactive, popupRef }) => {
    const { imgDir } = window['GutenverseDashboard'];

    return <div className="popup-content" ref={popupRef}>
        <div className="close" onClick={() => setInactive()}>
            <CloseIcon />
        </div>
        <div className="content">
            <img className="image-banner" src={`${imgDir}/pro/news/install-gvnews-essential-banner.svg`} />
            <h3 className="heading">{__('Install Gutenverse News Essentials', '--gctd--')}</h3>
            <p className="desc">{__('You need to Install and Activate plugin Gutenverse News Essentials to unlock this feature.', '--gctd--')}</p>
            <button className={`install-plguin${loading ? ' loading' : ''}`} onClick={() => actionButton()}>
                {loading && <Loader size={15} />}
                {!loading && !success && buttonText}
                {success && <SuccessIcon />}
            </button>
            {error.length > 0 && <p className="erorr-message">{error}</p>}
        </div>
    </div>
}



export const LicenseExpired = ({ setInactive, popupRef }) => {
    const { imgDir } = window['GutenverseDashboard'];

    return <div className="popup-content" ref={popupRef}>
        <div className="close" onClick={() => setInactive()}>
            <CloseIcon />
        </div>
        <div className="content">
            <img className="image-banner" src={`${imgDir}/pro/news/install-gvnews-essential-banner-expired.svg`} />
            <h3 className="heading">{__('Install Gutenverse News Essentials', '--gctd--')}</h3>
            <p className="desc">{__('You need to Install and Activate plugin Gutenverse News Essentials to unlock this feature.', '--gctd--')}</p>
            <ButtonUpgradePro location="popup" isBanner={true} link={`${upgradeProUrl}?utm_source=gutenverse&utm_medium=dashboard&utm_client_site=${clientUrl}&utm_client_theme=${activeTheme}`} customStyles={{ height: '16px', padding: '12px 25px 12px 30px' }} />
        </div>
    </div>
}

const SuccessIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <g clip-path="url(#clip0_23648_18309)">
            <path d="M5.40439 13.2311L0.0539856 7.37931L1.58236 5.70772L5.40547 9.88552L5.40439 9.8867L14.5757 -0.144043L16.1041 1.52755L6.93277 11.5595L5.40547 13.2299L5.40439 13.2311Z" fill="white" />
        </g>
        <defs>
            <clipPath id="clip0_23648_18309">
                <rect width="16" height="16" rx="8" fill="white" />
            </clipPath>
        </defs>
    </svg>
}

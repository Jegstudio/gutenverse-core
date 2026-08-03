import { activeTheme, clientUrl } from 'gutenverse-core/config';
import ButtonUpgradePro from './button-upgrade-pro';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

const CardPro = ( {
    num = null,
    mockupLibrarySrc,
    cube3dSrc,
    iconLottieSrc,
    iconNavSrc,
    numIconSrc,
    text = null,
} ) => {
    const {
        upgradeProUrl,
        imgDir
    } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};
    const defaultMockupLibrarySrc = mockupLibrarySrc || `${imgDir}/pop-up-mockup-pro.png`;
    const defaultCube3dSrc = cube3dSrc || `${imgDir}/pop-up-3d-cube-2.png`;
    const defaultIconLottieSrc = iconLottieSrc || `${imgDir}/pop-up-icon-element-3.png`;
    const defaultIconNavSrc = iconNavSrc || `${imgDir}/pop-up-icon-element-2.png`;
    const defaultNumIconSrc = numIconSrc || `${imgDir}/pop-up-icon-element.png`;

    const card = <>
        <div className="guten-pro-themes-wrapper">
            <div className="guten-card-pro-wrapper guten-pro-themes-full" style={{ backgroundImage: `url(${imgDir + '/pop-up-bg-popup-banner.png'})` }}>
                <div className="guten-card-pro-image-wrapper">
                    <img className="guten-card-pro-mockup-library" src={defaultMockupLibrarySrc} />
                    <img className="guten-card-pro-3d-cube" src={defaultCube3dSrc} />
                    <img className="guten-card-pro-icon-lottie" src={defaultIconLottieSrc} />
                    <img className="guten-card-pro-icon-nav" src={defaultIconNavSrc} />
                    {num !== null && <img className="guten-card-pro-icon-num" src={defaultNumIconSrc} />}
                </div>
                <div className="guten-card-pro-content-wrapper">
                    <div className="guten-card-pro-title">
                        {text ? (
                            text
                        ) : (
                            <>
                                {__('Unlock Extra Features with', 'gutenverse-form')}
                                <span> {__('Gutenverse PRO!', 'gutenverse-form')}</span>
                            </>
                        )}
                        <img className="guten-card-pro-blink" src={imgDir + '/banner-graphic-blink.png'} alt="Guten Card Pro Blink" />
                    </div>
                    <img className="guten-card-pro-arrow" src={imgDir + '/banner-arrow-blue.png'} alt="Guten Card Pro Arrow" />
                    <ButtonUpgradePro isBanner={true} location="card-pro" link={`${upgradeProUrl}?utm_source=gutenverse&utm_medium=blockeditor&utm_client_site=${clientUrl}&utm_client_theme=${activeTheme}`} />
                </div>
            </div>
        </div>
        <br />
    </>;
    // // Remove banner when script PRO is loaded.
    return applyFilters(
        'gutenverse.pro.upgrade.banner',
        card,
        null
    );
};
export default CardPro;

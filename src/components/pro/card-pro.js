import ButtonUpgradePro from './button-upgrade-pro';
import { applyFilters } from '@wordpress/hooks';

const CardPro = () => {
    const {
        upgradeProUrl
    } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};
    const card = <>
        <div className="guten-pro-themes-wrapper">
            <div className="guten-card-pro-wrapper guten-pro-themes-full" style={{ backgroundImage: `url(${window['GutenverseConfig'].imgDir + '/pop-up-bg-popup-banner.png'})` }}>
                <div className="guten-card-pro-image-wrapper">
                    <img className="guten-card-pro-mockup-library" src={window['GutenverseConfig'].imgDir + '/pop-up-mockup-pro.png'} />
                    <img className="guten-card-pro-3d-cube" src={window['GutenverseConfig'].imgDir + '/pop-up-3d-cube-2.png'} />
                    <img className="guten-card-pro-icon-lottie" src={window['GutenverseConfig'].imgDir + '/pop-up-icon-element-3.png'} />
                    <img className="guten-card-pro-icon-nav" src={window['GutenverseConfig'].imgDir + '/pop-up-icon-element-2.png'} />
                </div>
                <div className="guten-card-pro-content-wrapper">
                    <div className="guten-card-pro-title">
                        Unlock Extra Features with
                        <span> Gutenverse PRO!</span>
                        <img className="guten-card-pro-blink" src={window['GutenverseConfig'].imgDir + '/banner-graphic-blink.png'} alt="Guten Card Pro Blink" />
                    </div>
                    <img className="guten-card-pro-arrow" src={window['GutenverseConfig'].imgDir + '/banner-arrow-blue.png'} alt="Guten Card Pro Arrow" />
                    <ButtonUpgradePro isBanner={true} location="card-pro" link={`${upgradeProUrl}?utm_source=gutenverse&utm_medium=blockeditor`} />
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
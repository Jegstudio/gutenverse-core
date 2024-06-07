import ButtonUpgradePro from './button-upgrade-pro';
import { applyFilters } from '@wordpress/hooks';

const CardPro = () => {
    const card = <>
        <div className="guten-pro-themes-wrapper">
            <div className="guten-card-pro-wrapper guten-pro-themes-full" style={{ backgroundImage: `url(${window['GutenverseConfig'].imgDir + '/pro/banner-global/bg-tab-pro.png'})` }}>
                <div className="guten-card-pro-image-wrapper">
                    <img className="guten-card-pro-mockup-library" src={window['GutenverseConfig'].imgDir + '/pro/banner-global/mockup-library.png'} />
                    <img className="guten-card-pro-3d-cube" src={window['GutenverseConfig'].imgDir + '/pro/banner-global/3d-cube.png'} />
                    <img className="guten-card-pro-icon-lottie" src={window['GutenverseConfig'].imgDir + '/pro/banner-global/icon-element-lottie.png'} />
                    <img className="guten-card-pro-icon-nav" src={window['GutenverseConfig'].imgDir + '/pro/banner-global/icon-element-nav.png'} />
                </div>
                <div className="guten-card-pro-content-wrapper">
                    <div className="guten-card-pro-title">
                        Unlock Extra Features with
                        <span> Gutenverse PRO!</span>
                        <img className="guten-card-pro-blink" src={window['GutenverseConfig'].imgDir + '/pro/banner-global/blink-2.png'} alt="Guten Card Pro Blink" />
                    </div>
                    <img className="guten-card-pro-arrow" src={window['GutenverseConfig'].imgDir + '/pro/banner-global/arrow-blue.png'} alt="Guten Card Pro Arrow" />
                    <ButtonUpgradePro isBanner={true} location="card-pro" />
                </div>
            </div>
        </div>
        <br />
    </>;
    // <div className="card-pro-wrapper">
    //     <img className="card-pro-image" src={window['GutenverseConfig'].imgDir + '/pro/banner-pro.png'} />
    //     <div className="card-pro-title">Unlock Extra Features with Gutenverse PRO!</div>
    //     <div className="buttons">
    //         <ButtonUpgradePro isBanner={true} location = "card-pro"/>
    //     </div>
    // </div>;
    // // Remove banner when script PRO is loaded.
    return applyFilters(
        'gutenverse.pro.upgrade.banner',
        card,
        null
    );
};
export default CardPro;
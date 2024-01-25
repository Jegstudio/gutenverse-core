import ButtonUpgradePro from './button-upgrade-pro';
import { applyFilters } from '@wordpress/hooks';

const CardPro = () => {
    const card = <div className="card-pro-wrapper">
        <img className="card-pro-image" src={window['GutenverseConfig'].imgDir + '/pro/banner-pro.png'} />
        <div className="card-pro-title">Unlock Extra Features with Gutenverse PRO!</div>
        <div className="buttons">
            <ButtonUpgradePro isBanner={true} location = "card-pro"/>
        </div>
    </div>;
    // Remove banner when script PRO is loaded.
    return applyFilters(
        'gutenverse.pro.upgrade.banner',
        card,
        null
    );
};
export default CardPro;
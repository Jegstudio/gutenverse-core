import ButtonUpgradePro from './button-upgrade-pro';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';

const CardBannerPro = ({
    title,
    description,
    customStyles = {},
    backgroundImg
}) => {
    const {
        imgDir,
    } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};

    const card = <div className="form-pro-notice" style={customStyles}>
        <img className="banner-image-background" src={`${imgDir}/${backgroundImg}`} />
        {!isEmpty(title) && <h3 className="title">{title}</h3>}
        {!isEmpty(description) && <p className="description">{description}</p>}
        <ButtonUpgradePro location="form-builder" thin={true} smallText={true} isBanner={true} customStyles={{position: 'relative', background: 'black', padding: '8px 12px'}}/>
        <img className="banner-image-mockup" src={`${imgDir}/card-banner-mockup-form.png`} />
    </div>;
    // Remove banner when script PRO is loaded.
    return applyFilters(
        'gutenverse.pro.upgrade.banner',
        card,
        null
    );
};
export default CardBannerPro;
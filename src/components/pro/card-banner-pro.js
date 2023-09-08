import ButtonUpgradePro from './button-upgrade-pro';
import { applyFilters } from '@wordpress/hooks';
import { ImageFormNoticeSVG } from 'gutenverse-core/icons/image';
import isEmpty from 'lodash/isEmpty';

const CardBannerPro = ({
    title,
    description,
    customStyles = {}
}) => {
    const card = <div className="form-pro-notice" style={customStyles}>
        {!isEmpty(title) && <h3 className="title">{title}</h3>}
        {!isEmpty(description) && <p className="description">{description}</p>}
        <ButtonUpgradePro thin={true} smallText={true} isBanner={true} />
        <div className="boxes">
            <ImageFormNoticeSVG/>
        </div>
    </div>;
    // Remove banner when script PRO is loaded.
    return applyFilters(
        'gutenverse.pro.upgrade.banner',
        card,
        null
    );
};
export default CardBannerPro;
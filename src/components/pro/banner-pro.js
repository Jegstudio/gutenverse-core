import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import ButtonUpgradePro from './button-upgrade-pro';
import isEmpty from 'lodash/isEmpty';

const BannerPro = ({
    subtitle,
    title,
    customStyles = {},
}) => {
    const {
        imgDir,
        themesUrl,
    } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};

    const banner = <div className="banner-pro" style={customStyles}>
        {imgDir && (<div className="banner-image-container">
            <img className="banner-image-left" src={`${imgDir}/left-image.png`} />
            <img className="banner-image-right" src={`${imgDir}/right-image.png`} />
        </div>)}
        {!isEmpty(subtitle) && <p className="subtitle">{subtitle}</p>}
        {!isEmpty(title) && <h4 className="title">{title}</h4>}
        <div className="buttons">
            <ButtonUpgradePro isBanner={true}/>
            <a className="demo-button" href={themesUrl} target="_blank" rel="noreferrer">{__('View Prebuild Demo', '--gctd--')}</a>
        </div>
    </div>;

    // Remove banner when script PRO is loaded.
    return applyFilters(
        'gutenverse.pro.upgrade.banner',
        banner,
        null
    );
};

export default BannerPro;
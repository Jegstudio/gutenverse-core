import { __ } from '@wordpress/i18n';
import { IconCrownSVG, IconCrownBannerSVG, IconKeySVG } from 'gutenverse-core/icons';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'gutenverse-core/router';

/**
 * Styling can be imported from the scss file in 'gutenverse-core/src/assets/pro.scss'.
 */

const ButtonUpgradePro = ({
    text = __('Upgrade To PRO', '--gctd--'),
    align = 'left', // center, right
    thin = false,
    smallText = false,
    fullWidth = false,
    customStyles = {},
    link = null,
    location = '',
    isBanner = false,
    licenseActiveButton = <></>
}) => {

    const { upgradeProUrl, adminUrl, license } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};
    const buttonClasses = classnames(
        'button-upgrade-pro',
        {
            ['thin']: thin,
            ['text-sm']: smallText,
            ['full']: fullWidth,
            [`${align}`]: align,
        },
        isBanner && 'button-upgrade-pro-banner'
    );
    const proLink =  link ? link : upgradeProUrl;
    const dashboardLink = adminUrl + 'admin.php?page=gutenverse&path=license';

    const button = (text, icon, navigation, noPro) => {
        const isRoute = (location === 'themeList' || location === 'ecosystem' ) && !noPro;
        return isRoute ?
            ((<Link
                index = "license"
                to = {{
                    pathname: '/wp-admin/admin.php',
                    search: '?page=gutenverse&path=license',
                }}
                className={buttonClasses}
                style={customStyles}
            >
                {navigation ? <>
                    {icon === 'crown' ? <IconCrownBannerSVG/> : <IconKeySVG/>}
                    {text}
                </> :
                    <>
                        {text}
                        {icon === 'crown' ? <IconCrownBannerSVG/> : <IconKeySVG/>}
                    </>}
            </Link>)) :
            (<a
                href={noPro ? proLink : dashboardLink}
                className={buttonClasses}
                target="_blank"
                rel="noreferrer"
                style={customStyles}>
                <>
                    {text}
                    {icon === 'crown' ? <IconCrownBannerSVG/> : <IconKeySVG/>}
                </>
            </a>);
    };

    const TheButton = applyFilters('gutenverse.button.pro.library', () => {
        if (isEmpty(window?.gprodata)) {
            if ( location !== 'dashboard-navigation' ){
                return button(text, 'crown', false, true);
            } else return button(text, 'crown', true, true);
        } else {
            if ( location !== 'dashboard-navigation' ){
                return applyFilters('gutenverse.button.pro.banner',
                    button(__('Activate License', '--gctd--'), 'key', false, false),
                    button(__('Renew License', '--gctd--'), 'key', false, false),
                    licenseActiveButton);
            }
        } 
    }, {location,isBanner});
    return <TheButton />;
};

export default ButtonUpgradePro;
import { __ } from '@wordpress/i18n';
import { IconCrownBannerSVG, IconKeySVG } from 'gutenverse-core/icons';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import { isEmpty } from 'gutenverse-core/helper';
import { Link } from 'gutenverse-core/router';
import { getUpgradeProps, openFreemiusPopup } from '../../helper/jnews-freemius';
import { prefetchPricingPlanData } from '../../helper/jnews-pricing-plan';

/**
 * Styling can be imported from the scss file in 'gutenverse-core/src/assets/pro.scss'.
 */

const JNewsButtonUpgradePro = ({
    text = __('Upgrade To PRO', '--gctd--'),
    align = 'left', // center, right
    thin = false,
    smallText = false,
    fullWidth = false,
    customStyles = {},
    link = null,
    location = '',
    isBanner = false,
    licenseActiveButton = <></>,
    onClick = () => {},
    dashboard = 'jnews-blocks',
    className = '',
}) => {
    const { jnewsBlocksUpgradeUrl, adminUrl } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};
    const upgradeOptions = {
        medium: location === 'dashboard-navigation'
            ? 'dashboardnav'
            : location === 'popup' || location === 'themeList' || location === 'ecosystem'
                ? 'dashboard'
                : location === 'library' || location === 'card-pro'
                    ? 'library'
                    : location === 'form-builder'
                        ? 'formProNotice'
                        : 'blockeditor',
    };
    const buttonClasses = classnames(
        'button-upgrade-pro',
        {
            ['thin']: thin,
            ['text-sm']: smallText,
            ['full']: fullWidth,
            [`${align}`]: align,
        },
        isBanner && 'button-upgrade-pro-banner',
        className,
    );
    const proLink =  link ? link : jnewsBlocksUpgradeUrl;
    const dashboardLink = adminUrl + `admin.php?page=${dashboard}&path=license`;
    const hoverProps = {
        onMouseEnter: () => prefetchPricingPlanData(),
        onFocus: () => prefetchPricingPlanData(),
    };

    const getNoProButtonProps = (targetUrl) => {
        const upgradeProps = getUpgradeProps(targetUrl, upgradeOptions);

        if (!onClick || !upgradeProps?.onClick) {
            return upgradeProps;
        }

        return {
            ...upgradeProps,
            onClick: (event) => {
                event?.preventDefault?.();
                onClick(event);

                // Let the parent popup unmount before showing the pricing modal.
                window.setTimeout(() => {
                    openFreemiusPopup(null, targetUrl, upgradeOptions);
                }, 0);
            },
        };
    };

    const button = (text, icon, navigation, noPro, target = '_blank') => {
        const isRoute = (location === 'themeList' || location === 'ecosystem' ) && !noPro;
        return isRoute ?
            ((<Link
                index = "license"
                to = {{
                    pathname: '/wp-admin/admin.php',
                    search: '?page=jnews-blocks&path=license',
                }}
                className={buttonClasses}
                style={customStyles}
            >
                {navigation ? <>
                    {icon === 'crown' ? <IconCrownBannerSVG/> : <IconKeySVG/>}
                    <span>{text}</span>
                </> :
                    <>
                        <span>{text}</span>
                        {icon === 'crown' ? <IconCrownBannerSVG/> : <IconKeySVG/>}
                    </>}
            </Link>)) :
            (<a
                {...(noPro ? getNoProButtonProps(proLink) : { href: dashboardLink, target, rel: 'noreferrer' })}
                {...(noPro ? hoverProps : {})}
                className={buttonClasses}
                style={customStyles}
            >
                <>
                    <span>{text}</span>
                    {icon === 'crown' ? <IconCrownBannerSVG/> : <IconKeySVG/>}
                </>
            </a>);
    };

    const TheButton = applyFilters('jnews-blocks.button.pro.library', () => {
        if (window?.['JNewsBlocksProConfig'] || window?.['JnewsThemeConfig']) {
            if ( location !== 'dashboard-navigation' ){
                return applyFilters('jnews.blocks.button.pro',
                    button(__('Activate License', '--gctd--'), 'key', false, false, '_self'),
                    button(__('Renew License', '--gctd--'), 'key', false, false, '_self'),
                    licenseActiveButton,
                );
            }
        } else {
            if ( location !== 'dashboard-navigation' ){
                return button(text, 'crown', false, true);
            } else {
                return button(text, 'crown', true, true);
            }
        }
    }, {location,isBanner});

    return <TheButton />;
};

export default JNewsButtonUpgradePro;

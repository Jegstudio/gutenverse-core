import { __ } from '@wordpress/i18n';
import { IconCrownBannerSVG, IconKeySVG } from 'gutenverse-core/icons';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';

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
}) => {

    const { upgradeProUrl, license } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};
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
    const TheButton = applyFilters('gutenverse.button.pro.library', () => {
        if (isEmpty(window?.gprodata)) {
            return <a
                href={link ? link : upgradeProUrl}
                className={buttonClasses}
                target="_blank"
                rel="noreferrer"
                style={customStyles}>
                {text}
                <IconCrownBannerSVG/>
            </a>;
        } else if (license === ''){
            return <a
                href={link ? link : upgradeProUrl}
                className={buttonClasses}
                target="_blank"
                rel="noreferrer"
                style={customStyles}>
                {__('Activate License', '--gctd--')}
                <IconKeySVG/>
            </a>;
        }
    }, {location,isBanner});
    return <TheButton />;
};

export default ButtonUpgradePro;
import { __ } from '@wordpress/i18n';
import { IconCrownSVG } from 'gutenverse-core/icons';
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

    const { upgradeProUrl } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};
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
    const TheButton = applyFilters('gutenverse.button.pro.library', () => isEmpty(window?.gprodata) &&
        <a
            href={link ? link : upgradeProUrl}
            className={buttonClasses}
            target="_blank"
            rel="noreferrer"
            style={customStyles}>
            {text}
        </a>, {location,isBanner});
    return <TheButton />;
};

export default ButtonUpgradePro;
import { __ } from '@wordpress/i18n';
import { IconCrownSVG } from 'gutenverse-core/icons';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';

/**
 * Styling can be imported from the scss file in 'gutenverse-core/src/assets/pro.scss'.
 */

const ButtonUpgradePro = ({
    text = __('Upgrade to PRO', '--gctd--'),
    thin = false,
    smallText = false,
    customStyles = {},
    link = window?.GutenverseDashboard?.getPro
}) => {
    const buttonClasses = classnames(
        'button-upgrade-pro',
        {
            ['thin']: thin,
            ['text-sm']: smallText,
        }
    );

    return isEmpty(window?.gprodata) && <a href={link} className={buttonClasses} target='_blank' rel='noreferrer' styles={customStyles}>
        <IconCrownSVG />
        {text}
    </a>;
}

export default ButtonUpgradePro;
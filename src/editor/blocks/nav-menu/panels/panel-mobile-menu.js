import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconControl, ImageSizeControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const mobileMenuPanel = (props) => {
    const {
        mobileMenuLink,
    } = props;

    return [
        {
            id: 'mobileMenuLogo',
            label: __('Menu Logo', 'gutenverse'),
            component: ImageSizeControl
        },
        {
            id: 'mobileMenuLink',
            label: __('Menu Link', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Custom URL'),
                    value: 'custom'
                },
                {
                    label: __('Default (Home)'),
                    value: 'home'
                },
            ],
        },
        {
            id: 'mobileMenuURL',
            show: mobileMenuLink === 'custom',
            label: __('Mobile Menu URL', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'mobileIcon',
            label: __('Mobile Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'mobileCloseIcon',
            label: __('Close Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'mobileSubmenuClick',
            label: __('Sub Menu on Text Click', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'mobileCloseOnClick',
            label: __('Close Drawer on Click', 'gutenverse'),
            component: CheckboxControl,
        },
    ];
};
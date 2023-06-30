import { __ } from '@wordpress/i18n';
import { CheckboxControl, TextControl } from 'gutenverse-core/controls';

export const popupPanel = (props) => {
    const {
        addPopup,
    } = props;

    return [
        {
            id: 'addPopup',
            label: __('Add Popup', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'phone',
            show: addPopup,
            label: __('Phone Number', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'email',
            show: addPopup,
            label: __('Email', 'gutenverse'),
            component: TextControl,
        },
    ];
};
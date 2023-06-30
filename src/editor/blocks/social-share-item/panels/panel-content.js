import { __ } from '@wordpress/i18n';
import { CheckboxControl, TextControl } from 'gutenverse-core/controls';

export const panelContent = (props) => {
    const {
        showText,
    } = props;

    return [
        {
            id: 'showText',
            label: __('Show Share Text', 'gutenverse'),
            description: __('Display custom text beside icon', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'text',
            show: showText,
            label: __('Share Text', 'gutenverse'),
            component: TextControl,
        },
    ];
};
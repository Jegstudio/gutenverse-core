import { __ } from '@wordpress/i18n';
import { CheckboxControl, TextControl } from 'gutenverse-core-editor/controls';

export const contentPanel = ({showSupper}) => {
    return [
        {
            id: 'prefix',
            label: __('Number Prefix', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'number',
            label: __('Number Value', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'suffix',
            label: __('Number Suffix', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'title',
            label: __('Title', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'showSupper',
            label: __('Enable Supper', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'supper',
            show: showSupper,
            label: __('Supper', 'gutenverse'),
            component: TextControl,
        },
    ];
};
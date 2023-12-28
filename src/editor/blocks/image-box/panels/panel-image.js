import { __ } from '@wordpress/i18n';
import { CheckboxControl, ImageSizeControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const panelImage = () => {
    return [
        {
            id: 'separateButtonLink',
            label: __('Different Link for Button', 'gutenverse'),
            description: __('Use a different link for Image Box\'s Button'),
            component: CheckboxControl,
        },
        {
            id: 'image',
            label: __('Image', 'gutenverse'),
            component: ImageSizeControl
        },
        {
            id: 'lazyLoad',
            label: __('Set Lazy Load', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'imageAlt',
            label: __('Image Alt', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'ariaLabel',
            label: __('Aria Label', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'contentStyle',
            label: __('Content Style', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Default'),
                    value: 'default'
                },
                {
                    label: __('Floating'),
                    value: 'floating'
                },
            ],
        },
    ];
};
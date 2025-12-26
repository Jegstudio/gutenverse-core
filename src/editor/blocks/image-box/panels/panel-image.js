import { __ } from '@wordpress/i18n';
import { CheckboxControl, ImageSizeControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const panelImage = (props) => {
    const { altType } = props;
    return [
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
            id: 'altType',
            label: __('Alt Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'None',
                    value: 'none'
                },
                {
                    label: 'Alt from Image',
                    value: 'original'
                },
                {
                    label: 'Custom Alt',
                    value: 'custom'
                },
            ]
        },
        {
            id: 'imageAlt',
            show: altType === 'custom',
            label: __('Custom Caption', 'gutenverse'),
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
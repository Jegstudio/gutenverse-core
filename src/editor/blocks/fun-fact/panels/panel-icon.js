import { __ } from '@wordpress/i18n';
import { IconControl, ImageControl, RangeControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const iconPanel = ({ elementId, iconType, image, imageSize, removeStyle }) => {
    return [
        {
            id: 'iconType',
            label: __('Icon Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'none',
                    label: 'None'
                },
                {
                    value: 'icon',
                    label: 'Icon'
                },
                {
                    value: 'image',
                    label: 'Image'
                },
            ],
            onChange: values => {
                if (!values.imageFixHeight) {
                    removeStyle('imageSize-style-0');
                }
            },
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .icon img`,
                    allowRender: value => value === 'image',
                    render: () => `width: ${imageSize}px; height: ${imageSize}px; object-fit: cover;`
                }
            ]
        },
        {
            id: 'icon',
            show: iconType === 'icon',
            label: __('Select Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'image',
            show: iconType === 'image',
            label: __('Select Image', 'gutenverse'),
            component: ImageControl,
        },
        {
            id: 'imageAlt',
            show: iconType === 'image',
            label: __('Image Alt', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'imageSize',
            show: iconType === 'image',
            label: __('Image Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 1000,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .icon img`,
                    allowRender: () => iconType === 'image',
                    render: value => `width: ${value}px; height: ${value}px; object-fit: cover;`
                }
            ]
        },
    ];
};
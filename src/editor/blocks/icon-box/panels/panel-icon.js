import { __ } from '@wordpress/i18n';
import { getDeviceType } from 'gutenverse-core-editor/editor-helper';
import { ImageControl, RangeControl, SelectControl, TextControl } from 'gutenverse-core-editor/controls';

export const panelIcon = (props) => {
    const {
        elementId,
        iconType,
        removeStyle,
        iconSize,
        imageWidth,
        imageHeight
    } = props;

    const deviceType = getDeviceType();

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
            onChange: ({ iconShape }) => {
                if ('icon' !== iconShape) {
                    removeStyle('iconSize-style-0');
                }

                if ('image' !== iconShape) {
                    removeStyle('imageWidth-style-0');
                    removeStyle('imageHeight-style-0');
                }
            },
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper .icon-box .icon i`,
                    allowRender: value => value === 'icon',
                    render: () => `font-size: ${iconSize[deviceType]}px;`
                },
                {
                    selector: `.${elementId} .guten-icon-box-wrapper .icon-box .icon`,
                    allowRender: value => value === 'image',
                    render: () => {
                        return `width: ${imageWidth}px;`;
                    }
                },
                {
                    selector: `.${elementId} .guten-icon-box-wrapper .icon-box .icon`,
                    allowRender: value => value === 'image',
                    render: () => `height: ${imageHeight}px;`
                }
            ]
        },
        {
            id: 'iconSize',
            show: iconType && iconType === 'icon',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 200,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper .icon-box .icon i`,
                    allowRender: () => iconType && iconType === 'icon',
                    render: value => `font-size: ${value}px;`
                }
            ]
        },
        {
            id: 'image',
            show: iconType && iconType === 'image',
            label: __('Icon Type', 'gutenverse'),
            component: ImageControl,
        },
        {
            id: 'imageAlt',
            show: iconType && iconType === 'image',
            label: __('Image Alt', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'imageWidth',
            show: iconType && iconType === 'image',
            label: __('Image Width', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 400,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper .icon-box .icon`,
                    allowRender: () => iconType && iconType === 'image',
                    render: value => `width: ${value}px;`
                }
            ]
        },
        {
            id: 'imageHeight',
            show: iconType && iconType === 'image',
            label: __('Image Height', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 400,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper .icon-box .icon`,
                    allowRender: () => iconType && iconType === 'image',
                    render: value => `height: ${value}px;`
                }
            ]
        },
    ];
};


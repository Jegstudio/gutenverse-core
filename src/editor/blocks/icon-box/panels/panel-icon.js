import { __ } from '@wordpress/i18n';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { CheckboxControl, ImageControl, RangeControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const panelIcon = (props) => {
    const {
        elementId,
        iconType,
        removeStyle,
        iconSize,
        imageWidth,
        imageHeight,
        imageWidthResponsive,
        imageHeightResponsive
    } = props;

    const deviceType = getDeviceType();
    console.log(imageHeight, imageWidth, imageHeightResponsive, imageWidthResponsive);

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
            id: 'lazyLoad',
            show: iconType && iconType === 'image',
            label: __('Set Lazy Load', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'imageAlt',
            show: iconType && iconType === 'image',
            label: __('Image Alt', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'imageFit',
            show: iconType && iconType === 'image',
            label: __('Image Fit Content', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'fill',
                    label: 'Default'
                },
                {
                    value: 'contain',
                    label: 'Contain'
                },
                {
                    value: 'cover',
                    label: 'Cover'
                },
                {
                    value: 'none',
                    label: 'None'
                },
                {
                    value: 'scale-down',
                    label: 'Scale Down'
                },
            ],
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper .icon-box .icon img`,
                    allowRender: () => iconType && iconType === 'image',
                    render: value => `object-fit: ${value};`
                }
            ]
        },
        {
            id: 'imageWidthResponsive',
            show: iconType && iconType === 'image' && deviceType !== 'Desktop',
            label: __('Image Width', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 400,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper .icon-box .icon`,
                    allowRender: () => iconType && iconType === 'image' & deviceType !== 'Desktop',
                    render: value => `width: ${value}px;`
                }
            ]
        },
        {
            id: 'imageHeightResponsive',
            show: iconType && iconType === 'image' && deviceType !== 'Desktop',
            label: __('Image Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 400,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper .icon-box .icon`,
                    allowRender: () => iconType && iconType === 'image' & deviceType !== 'Desktop',
                    render: value => `height: ${value}px;`
                }
            ]
        },
        {
            id: 'imageWidth',
            show: iconType && iconType === 'image' && deviceType === 'Desktop',
            label: __('Image Width', 'gutenverse'),
            showDeviceControl: true,
            component: RangeControl,
            min: 1,
            max: 400,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper .icon-box .icon`,
                    allowRender: () => iconType && iconType === 'image' && deviceType === 'Desktop',
                    render: value => `width: ${value}px;`
                }
            ]
        },
        {
            id: 'imageHeight',
            show: iconType && iconType === 'image' && deviceType === 'Desktop',
            label: __('Image Height', 'gutenverse'),
            showDeviceControl: true,
            component: RangeControl,
            min: 1,
            max: 400,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper .icon-box .icon`,
                    allowRender: () => iconType && iconType === 'image' && deviceType === 'Desktop',
                    render: value => `height: ${value}px;`
                }
            ]
        },
    ];
};


import { __ } from '@wordpress/i18n';
import { BoxShadowControl, DimensionControl, RangeControl, SelectControl, SizeControl, SwitchControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleDimension, handleUnitPoint } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const panelImageStyle = props => {
    const {
        elementId,
        __imageHover
    } = props;

    return [
        {
            id: 'imageMargin',
            label: __('Image Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .inner-container .image-box-header`,
                    render: value => handleDimension(value, 'margin')
                }
            ],
        },
        {
            id: 'imagePadding',
            label: __('Image Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .inner-container .image-box-header img`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: 'imageBorderRadius',
            label: __('Border Radius', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .inner-container .image-box-header img`,
                    render: value => handleDimension(value, 'border-radius', false)
                }
            ],
        },
        {
            id: 'imageBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .inner-container .image-box-header`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'imageHeight',
            label: __('Image Height', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.1,
                    max: 10,
                    step: 0.1
                },
            },
            style: [
                {
                    selector: `.${elementId} .inner-container .image-box-header img`,
                    render: value => handleUnitPoint(value, 'height')
                }
            ]
        },
        {
            id: 'imageFit',
            label: __('Image Fit', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Cover', 'gutenverse'),
                    value: 'cover'
                },
                {
                    label: __('Contain', 'gutenverse'),
                    value: 'contain'
                },
                {
                    label: __('Fil', 'gutenverse'),
                    value: 'fill'
                },
                {
                    label: __('Scale Down', 'gutenverse'),
                    value: 'scale-down'
                },
                {
                    label: __('None', 'gutenverse'),
                    value: 'none'
                },
            ],
            style: [
                {
                    selector: `.${elementId} .inner-container .image-box-header img`,
                    render: value => `object-fit: ${value}`
                }
            ]
        },
        {
            id: '__imageHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
        },
        {
            id: 'imageOpacity',
            show: !__imageHover || __imageHover === 'normal',
            label: __('Image Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .inner-container .image-box-header img`,
                    render: value => `opacity: ${value}%;`
                }
            ],
        },
        {
            id: 'imageHoverOpacity',
            show: __imageHover === 'hover',
            label: __('Image Hover Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}:hover .inner-container .image-box-header img`,
                    render: value => `opacity: ${value}%;`
                }
            ],
        },
        {
            id: 'imageHoverScale',
            show: __imageHover === 'hover',
            label: __('Image Hover Scale', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 2,
            step: 0.1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}:hover .inner-container .image-box-header img`,
                    render: value => `-webkit-transform: scale(${value}); 
                    -o-transform: scale(${value}); 
                    -moz-transform: scale(${value}); 
                    -ms-transform: scale(${value}); 
                    transform: scale(${value});`
                }
            ],
        },
    ];
};
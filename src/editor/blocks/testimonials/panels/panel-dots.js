import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, RangeControl, SwitchControl } from 'gutenverse-core-editor/controls';
import { handleColor, handleDimension } from 'gutenverse-core/styling';

export const dotsPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'dotsSpacingHorizontal',
            label: __('Spacing Horizontal', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .swiper-pagination-bullets .swiper-pagination-bullet`,
                    render: value => `margin: 0 calc(${value}px / 2);`
                }
            ]
        },
        {
            id: 'dotsSpacingVertical',
            label: __('Spacing Vertical', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .swiper-pagination-bullets`,
                    render: value => `margin-top: ${value}px;`
                }
            ]
        },
        {
            id: '__dotsNav',
            component: SwitchControl,
            options: [
                {
                    value: 'general',
                    label: 'General'
                },
                {
                    value: 'active',
                    label: 'Active'
                }
            ],
            onChange: ({__dotsNav}) => setSwitcher({...switcher, dotsNav: __dotsNav})
        },
        {
            id: 'dotsWidth',
            show: !switcher.dotsNav || switcher.dotsNav === 'general',
            label: __('Dots Width', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .swiper-pagination-bullet`,
                    render: value => `width: ${value}px;`
                }
            ]
        },
        {
            id: 'dotsHeight',
            show: !switcher.dotsNav || switcher.dotsNav === 'general',
            label: __('Dots Height', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .swiper-pagination-bullet`,
                    render: value => `height: ${value}px;`
                }
            ]
        },
        {
            id: 'dotsRadius',
            show: !switcher.dotsNav || switcher.dotsNav === 'general',
            label: __('Dots Border Radius', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .swiper-pagination-bullet`,
                    render: value => handleDimension(value, 'border-radius', false)
                }
            ]
        },
        {
            id: 'dotsColor',
            show: !switcher.dotsNav || switcher.dotsNav === 'general',
            label: __('Dots Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .swiper-pagination-bullet`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'dotsActiveWidth',
            show: switcher.dotsNav === 'active',
            label: __('Active Width', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .swiper-pagination-bullet.swiper-pagination-bullet-active`,
                    render: value => `width: ${value}px;`
                }
            ]
        },
        {
            id: 'dotsActiveHeight',
            show: switcher.dotsNav === 'active',
            label: __('Active Height', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .swiper-pagination-bullet.swiper-pagination-bullet-active`,
                    render: value => `height: ${value}px;`
                }
            ]
        },
        {
            id: 'dotsActiveRadius',
            show: switcher.dotsNav === 'active',
            label: __('Active Border Radius', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .swiper-pagination-bullet.swiper-pagination-bullet-active`,
                    render: value => handleDimension(value, 'border-radius', false)
                }
            ]
        },
        {
            id: 'dotsActiveColor',
            show: switcher.dotsNav === 'active',
            label: __('Active Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .swiper-pagination-bullet.swiper-pagination-bullet-active`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
    ];
};
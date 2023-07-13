import { __ } from '@wordpress/i18n';
import { BorderControl, BoxShadowControl, ColorControl, DimensionControl, RangeControl, SwitchControl } from 'gutenverse-core-editor/controls';
import { handleBorder, handleColor, handleDimension } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const arrowPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'arrowFontSize',
            label: __('Arrow Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} div[class*='swiper-button-']`,
                    render: value => `font-size: ${value}px;`
                }
            ]
        },
        {
            id: '__arrowHover',
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
            onChange: ({__arrowHover}) => setSwitcher({...switcher, arrowHover: __arrowHover})
        },
        {
            id: 'arrowColor',
            show: !switcher.arrowHover || switcher.arrowHover === 'normal',
            label: __('Normal Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} div[class*='swiper-button-']`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'arrowBgColor',
            show: !switcher.arrowHover || switcher.arrowHover === 'normal',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} div[class*='swiper-button-']`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'arrowPadding',
            show: !switcher.arrowHover || switcher.arrowHover === 'normal',
            label: __('Normal Padding', 'gutenverse'),
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
                    selector: `.${elementId} div[class*='swiper-button-']`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'arrowMargin',
            show: !switcher.arrowHover || switcher.arrowHover === 'normal',
            label: __('Normal Margin', 'gutenverse'),
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
                    selector: `.${elementId} div[class*='swiper-button-']`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'arrowOpacity',
            show: !switcher.arrowHover || switcher.arrowHover === 'normal',
            label: __('Normal Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} div[class*='swiper-button-']`,
                    render: value => `opacity: calc(${value}/100);`
                }
            ]
        },
        {
            id: 'arrowHoverColor',
            show: switcher.arrowHover === 'hover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}:hover div[class*='swiper-button-']`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'arrowHoverBgColor',
            show: switcher.arrowHover === 'hover',
            label: __('Background Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}:hover div[class*='swiper-button-']`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'arrowHoverPadding',
            show: switcher.arrowHover === 'hover',
            label: __('Hover Padding', 'gutenverse'),
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
                    selector: `.${elementId}:hover div[class*='swiper-button-']`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'arrowHoverMargin',
            show: switcher.arrowHover === 'hover',
            label: __('Hover Margin', 'gutenverse'),
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
                    selector: `.${elementId}:hover div[class*='swiper-button-']`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'arrowHoverOpacity',
            show: switcher.arrowHover === 'hover',
            label: __('Hover Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}:hover div[class*='swiper-button-']`,
                    render: value => `opacity: calc(${value}/100);`
                }
            ]
        },
        {
            id: 'arrowBorder',
            show: !switcher.arrowHover || switcher.arrowHover === 'normal',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} div[class*='swiper-button-']`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'arrowBoxShadow',
            show: !switcher.arrowHover || switcher.arrowHover === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} div[class*='swiper-button-']`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'arrowBorderHover',
            show: switcher.arrowHover === 'hover',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}:hover div[class*='swiper-button-']`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'arrowBoxShadowHover',
            show: switcher.arrowHover === 'hover',
            label: __('Hover Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId}:hover div[class*='swiper-button-']`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};
import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { allowRenderBoxShadow, handleBorder, handleBorderResponsive, handleColor, handleDimension } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const arrowPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'arrowFontSize',
            label: __('Arrow Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
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
                },
                {
                    value: 'disabled',
                    label: 'Disabled'
                }
            ],
            onChange: ({ __arrowHover }) => setSwitcher({ ...switcher, arrowHover: __arrowHover })
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
            id: 'arrowBorder',
            show: (!switcher.arrowHover || switcher.arrowHover === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
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
            id: 'arrowBorderResponsive',
            show: (!switcher.arrowHover || switcher.arrowHover === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} div[class*='swiper-button-']`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
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
            id: 'arrowHoverColor',
            show: switcher.arrowHover === 'hover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}:hover div[class*='swiper-button-']:not(.swiper-button-disabled)`,
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
                    selector: `.${elementId}:hover div[class*='swiper-button-']:not(.swiper-button-disabled)`,
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
                    selector: `.${elementId}:hover div[class*='swiper-button-']:not(.swiper-button-disabled)`,
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
                    selector: `.${elementId}:hover div[class*='swiper-button-']:not(.swiper-button-disabled)`,
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
                    selector: `.${elementId}:hover div[class*='swiper-button-']:not(.swiper-button-disabled)`,
                    render: value => `opacity: calc(${value}/100);`
                }
            ]
        },
        {
            id: 'arrowBorderHover',
            show: switcher.arrowHover === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}:hover div[class*='swiper-button-']:not(.swiper-button-disabled)`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'arrowBorderHoverResponsive',
            show: switcher.arrowHover === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}:hover div[class*='swiper-button-']:not(.swiper-button-disabled)`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
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
                    selector: `.${elementId}:hover div[class*='swiper-button-']:not(.swiper-button-disabled)`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'arrowDisabledColor',
            show: switcher.arrowHover === 'disabled',
            label: __('Disabled Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .swiper-button-disabled`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'arrowDisabledBgColor',
            show: switcher.arrowHover === 'disabled',
            label: __('Background Disabled Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .swiper-button-disabled`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'arrowDisabledPadding',
            show: switcher.arrowHover === 'disabled',
            label: __('Disabled Padding', 'gutenverse'),
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
                    selector: `.${elementId} .swiper-button-disabled`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'arrowDisabledMargin',
            show: switcher.arrowHover === 'disabled',
            label: __('Disabled Margin', 'gutenverse'),
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
                    selector: `.${elementId} .swiper-button-disabled`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'arrowDisabledOpacity',
            show: switcher.arrowHover === 'disabled',
            label: __('Disabled Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .swiper-button-disabled`,
                    render: value => `opacity: calc(${value}/100);`
                }
            ]
        },
        {
            id: 'arrowBorderDisabled',
            show: switcher.arrowHover === 'disabled',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .swiper-button-disabled`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'arrowBoxShadowDisabled',
            show: switcher.arrowHover === 'disabled',
            label: __('Disabled Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .swiper-button-disabled`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};
import { __ } from '@wordpress/i18n';
import { BorderControl, ColorControl, DimensionControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';
import { handleBorder, handleColor, handleDimension } from 'gutenverse-core/controls';

export const iconStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: '__iconHover',
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
            onChange: ({__iconHover}) => setSwitcher({...switcher, iconStyle: __iconHover})
        },
        {
            id: 'iconColor',
            show: !switcher.iconStyle || switcher.iconStyle === 'normal',
            label: __('Normal Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .icon`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconBgColor',
            show: !switcher.iconStyle || switcher.iconStyle === 'normal',
            label: __('Normal Background Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .icon`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'iconBorder',
            show: !switcher.iconStyle || switcher.iconStyle === 'normal',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .icon`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'iconColorHover',
            show: switcher.iconStyle === 'hover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner:hover .icon`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconBgColorHover',
            show: switcher.iconStyle === 'hover',
            label: __('Hover Background Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner:hover .icon`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'iconBorderHover',
            show: switcher.iconStyle === 'hover',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner:hover .icon`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 10,
            max: 300,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .icon`,
                    render: value => `font-size: ${value}px;`
                }
            ]
        },
        {
            id: 'iconRotate',
            label: __('Icon Rotate', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 360,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .icon`,
                    render: value => `transform: rotate(${value}deg);`
                }
            ]
        },
        {
            id: 'iconPadding',
            label: __('Padding', 'gutenverse'),
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
                    selector: `.${elementId} .fun-fact-inner .icon`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'iconMargin',
            label: __('Margin', 'gutenverse'),
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
                    selector: `.${elementId} .fun-fact-inner .icon`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
    ];
};
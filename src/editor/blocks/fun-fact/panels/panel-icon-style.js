import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, ColorControl, DimensionControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const iconStylePanel = (props) => {
    const {
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 10,
            max: 300,
            step: 1,
            allowDeviceControl: true,
            unit: 'px'
        },
        {
            id: 'iconRotate',
            label: __('Icon Rotate', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 360,
            step: 1,
            allowDeviceControl: true,
            unit: 'deg'
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
            }
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
            }
        },
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
            onChange: ({ __iconHover }) => setSwitcher({ ...switcher, iconStyle: __iconHover })
        },
        {
            id: 'iconColor',
            show: !switcher.iconStyle || switcher.iconStyle === 'normal',
            label: __('Normal Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
        },
        {
            id: 'iconBgColor',
            show: !switcher.iconStyle || switcher.iconStyle === 'normal',
            label: __('Normal Background Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
        },
        {
            id: 'iconBorder',
            show: (!switcher.iconStyle || switcher.iconStyle === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
        },
        {
            id: 'iconBorderResponsive',
            show: (!switcher.iconStyle || switcher.iconStyle === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true
        },
        {
            id: 'iconColorHover',
            show: switcher.iconStyle === 'hover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true
        },
        {
            id: 'iconBgColorHover',
            show: switcher.iconStyle === 'hover',
            label: __('Hover Background Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true
        },
        {
            id: 'iconBorderHover',
            show: switcher.iconStyle === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl
        },
        {
            id: 'iconBorderHoverResponsive',
            show: switcher.iconStyle === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true
        },
    ];
};
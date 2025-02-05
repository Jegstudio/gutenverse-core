import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { ColorControl, IconControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const panelIconStyle = (props) => {
    const {
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();

    return [
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
        },
        {
            id: '__accIconActive',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'active',
                    label: 'Active'
                }
            ],
            onChange: ({ __accIconActive }) => setSwitcher({ ...switcher, accIcon: __accIconActive })
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            unit: 'px',
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
        },
        {
            id: 'iconClosed',
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            label: __('Normal Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'iconColor',
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            label: __('Normal Icon Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'iconBackground',
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
        },
        {
            id: 'iconBorder',
            show: (!switcher.accIcon || switcher.accIcon === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
        },
        {
            id: 'iconBorderResponsive',
            show: (!switcher.accIcon || switcher.accIcon === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        {
            id: 'iconBoxShadow',
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
        },
        {
            id: 'iconActiveSize',
            label: __('Icon Active Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            show: switcher.accIcon === 'active',
        },
        {
            id: 'iconOpen',
            show: switcher.accIcon === 'active',
            label: __('Active Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'iconActiveColor',
            show: switcher.accIcon === 'active',
            label: __('Active Icon Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'iconActiveBackground',
            show: switcher.accIcon === 'active',
            label: __('Active Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
        },
        {
            id: 'iconActiveBorder',
            show: switcher.accIcon === 'active' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
        },
        {
            id: 'iconActiveBorderResponsive',
            show: switcher.accIcon === 'active' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        {
            id: 'iconActiveBoxShadow',
            show: switcher.accIcon === 'active',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
        },
    ];
};

import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, DimensionControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const panelAccordion = (props) => {
    const {
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'accordionMargin',
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
            id: '__accBorderHover',
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
            onChange: ({ __accBorderHover }) => setSwitcher({ ...switcher, accBorder: __accBorderHover })
        },
        {
            id: 'accordionBorder',
            show: (!switcher.accBorder || switcher.accBorder === 'normal') && device === 'Desktop',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
        },
        {
            id: 'accordionBorderResponsive',
            show: (!switcher.accBorder || switcher.accBorder === 'normal') && device !== 'Desktop',
            label: __('Border Type', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        {
            id: 'accordionBorderActive',
            show: switcher.accBorder === 'active' && device === 'Desktop',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
        },
        {
            id: 'accordionBorderActiveResponsive',
            show: switcher.accBorder === 'active' && device !== 'Desktop',
            label: __('Border Type', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        {
            id: 'accordionBoxShadow',
            show: !switcher.accBorder || switcher.accBorder === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
        },
        {
            id: 'accordionBoxShadowActive',
            show: switcher.accBorder === 'active',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
        },
    ];
};

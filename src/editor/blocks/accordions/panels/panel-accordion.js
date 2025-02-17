import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, DimensionControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const panelAccordion = (props) => {
    const {
        switcher,
        setSwitcher,
        elementId
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
            }
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
            liveStyle: [
                {
                    'id': 'accordionBorder',
                    'type': 'border',
                    'selector': `.${elementId} .accordion-item`,
                }
            ]
        },
        {
            id: 'accordionBorderResponsive',
            show: (!switcher.accBorder || switcher.accBorder === 'normal') && device !== 'Desktop',
            label: __('Border Type', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'id': 'accordionBorderResponsive',
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .accordion-item`
                }
            ]
        },
        {
            id: 'accordionBorderActive',
            show: switcher.accBorder === 'active' && device === 'Desktop',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'id': 'accordionBorderActive',
                    'type': 'border',
                    'selector': `.${elementId} .accordion-item.active`,
                }
            ]
        },
        {
            id: 'accordionBorderActiveResponsive',
            show: switcher.accBorder === 'active' && device !== 'Desktop',
            label: __('Border Type', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'id': 'accordionBorderActiveResponsive',
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .accordion-item.active`,
                }
            ]
        },
        {
            id: 'accordionBoxShadow',
            show: !switcher.accBorder || switcher.accBorder === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'id': 'accordionBoxShadow',
                    'type': 'boxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .accordion-item`,
                }
            ]
        },
        {
            id: 'accordionBoxShadowActive',
            show: switcher.accBorder === 'active',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'id': 'accordionBoxShadow',
                    'type': 'boxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .accordion-item.active`,
                }
            ]
        },
    ];
};

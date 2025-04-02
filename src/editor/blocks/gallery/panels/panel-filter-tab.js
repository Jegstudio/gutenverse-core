import { __ } from '@wordpress/i18n';
import { AlertControl, BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const filterTabPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        filterType
    } = props;

    const device = getDeviceType();

    if (filterType !== 'tab') return [
        {
            id: 'divider-notice',
            component: AlertControl,
            children: <>
                <span>{__('This Panel Option Only Show If You Choose "Filter Tab" for Filter Type Option')}</span>
            </>
        },
    ];

    return [
        {
            id: 'filterTabPadding',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'filterTabMargin',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'filterTabTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: '__filterTab',
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
            onChange: ({ __filterTab }) => setSwitcher({ ...switcher, filterTab: __filterTab })
        },
        {
            id: 'filterTabTextColor',
            show: !switcher.filterTab || switcher.filterTab === 'general',
            label: __('General Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'filterTabTextColor',
                    'responsive': true,
                    'selector': `.${elementId} .filter-controls .guten-gallery-control`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'filterTabTextColorActive',
            show: switcher.filterTab === 'active',
            label: __('Active Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'filterTabTextColorActive',
                    'responsive': true,
                    'selector': `.${elementId} .filter-controls .guten-gallery-control.active`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'filterTabBackground',
            show: !switcher.filterTab || switcher.filterTab === 'general',
            label: __('General Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'filterTabBackground',
                    'selector': `.${elementId} .filter-controls .guten-gallery-control`,
                }
            ]
        },
        {
            id: 'filterTabBackgroundActive',
            show: switcher.filterTab === 'active',
            label: __('Active Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'filterTabBackgroundActive',
                    'selector': `.${elementId} .filter-controls .guten-gallery-control.active`,
                }
            ]
        },
        {
            id: 'filterTabBorder',
            show: (!switcher.filterTab || switcher.filterTab === 'general') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'filterTabBorder',
                    'selector': `.${elementId} .filter-controls .guten-gallery-control`,
                }
            ]
        },
        {
            id: 'filterTabBorderResponsive',
            show: (!switcher.filterTab || switcher.filterTab === 'general') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'filterTabBorderResponsive',
                    'selector': `.${elementId} .filter-controls .guten-gallery-control`,
                }
            ]
        },
        {
            id: 'filterTabBorderActive',
            show: switcher.filterTab === 'active' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'filterTabBorderActive',
                    'selector': `.${elementId} .filter-controls .guten-gallery-control.active`,
                }
            ]
        },
        {
            id: 'filterTabBorderActiveResponsive',
            show: switcher.filterTab === 'active' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'filterTabBorderResponsiveActive',
                    'selector': `.${elementId} .filter-controls .guten-gallery-control.active`,
                }
            ]
        },
        {
            id: 'filterTabBoxShadow',
            show: !switcher.filterTab || switcher.filterTab === 'general',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'filterTabBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .filter-controls .guten-gallery-control`,
                }
            ]
        },
        {
            id: 'filterTabBoxShadowActive',
            show: switcher.filterTab === 'active',
            label: __('Active Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'filterTabBoxShadowActive',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .filter-controls .guten-gallery-control.active`,
                }
            ]
        },
    ];
};
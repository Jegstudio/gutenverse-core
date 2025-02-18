import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderResponsiveControl, ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { handleBackground, handleBorderResponsive, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const itemStylePanel = (props) => { 
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'itemTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'itemSpacing',
            label: __('Item Padding', 'gutenverse'),
            allowDeviceControl: true,
            component: DimensionControl,
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
            },
        },
        {
            id: 'itemMargin',
            label: __('Item Margin', 'gutenverse'),
            allowDeviceControl: true,
            component: DimensionControl,
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
            },
        },
        {
            id: '__itemState',
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
                    value: 'active',
                    label: 'Active'
                }
            ],
            onChange: ({ __itemState }) => setSwitcher({ ...switcher, itemState: __itemState })
        },
        {
            id: 'itemTextNormalColor',
            show: switcher.itemState === undefined || switcher.itemState === 'normal',
            label: __('Item Text Normal Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'itemTextNormalColor',
                    'responsive': true,
                    'selector': `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li > a, .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ],
        },
        {
            id: 'itemTextNormalBg',
            show: switcher.itemState === undefined || switcher.itemState === 'normal',
            component: BackgroundControl,
            label: __('Item Text Normal Background', 'gutenverse'),
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'itemTextNormalBg',
                    'type': 'background',
                    'selector': `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li > a, .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
                }
            ],
        },
        {
            id: 'itemTextHoverColor',
            show: switcher.itemState === 'hover',
            label: __('Item Text Hover Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'itemTextHoverColor',
                    'responsive': true,
                    'selector': `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li:hover > a, .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li:hover > a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ],
        },
        {
            id: 'itemTextHoverBg',
            show: switcher.itemState === 'hover',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'itemTextHoverBg',
                    'type': 'background',
                    'responsive': true,
                    'selector': `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li:hover > a, .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li:hover > a`,
                }
            ],
        },
        {
            id: 'itemTextActiveColor',
            show: switcher.itemState === 'active',
            label: __('Item Text Active Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'itemTextActiveColor',
                    'responsive': true,
                    'selector': `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-item > a,
                        .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-item > a, 
                        .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-ancestor > a,
                        .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-ancestor > a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ],
        },
        {
            id: 'itemTextActiveBg',
            show: switcher.itemState === 'active',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'itemTextActiveBg',
                    'type': 'background',
                    'selector': `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-item > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-item > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-ancestor > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-ancestor > a`,
                }
            ],
        },
        {
            id: 'itemMenuBorderNormal',
            show: switcher.itemState === undefined || switcher.itemState === 'normal',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'id': 'itemMenuBorderNormal',
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li > a, .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
                }
            ],
        },
        {
            id: 'itemMenuBorderHover',
            show: switcher.itemState === 'hover',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'id': 'itemMenuBorderHover',
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li:hover > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li:hover > a`,
                }
            ],
        },
        {
            id: 'itemMenuBorderActive',
            show: switcher.itemState === 'active',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'id': 'itemMenuBorderActive',
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-ancestor > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-ancestor > a`,
                }
            ],
        },

    ];
};
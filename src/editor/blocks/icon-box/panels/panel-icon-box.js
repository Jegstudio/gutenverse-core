import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, DimensionControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { handleDimension, handleBackground, handleBorderResponsive, allowRenderBoxShadow, handleBorder } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const panelIconBoxContainer = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();

    return [
        {
            id: '__containerStyleHover',
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
            onChange: ({ __containerStyleHover }) => setSwitcher({ ...switcher, containerStyle: __containerStyleHover })
        },
        {
            id: 'containerPadding',
            show: !switcher.containerStyle || switcher.containerStyle === 'normal',
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
            id: 'containerPaddingHover',
            show: switcher.containerStyle === 'hover',
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
            id: 'containerBackground',
            show: !switcher.containerStyle || switcher.containerStyle === 'normal',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'containerBackground',
                    'type': 'background',
                    'responsive': true,
                    'selector': `.${elementId} .guten-icon-box-wrapper`,
                }
            ],
        },
        {
            id: 'containerBackgroundHover',
            show: switcher.containerStyle === 'hover',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'containerBackgroundHover',
                    'type': 'background',
                    'responsive': true,
                    'selector': `.${elementId}:hover .guten-icon-box-wrapper`,
                }
            ],
        },
        {
            id: 'containerBorder',
            show: (!switcher.containerStyle || switcher.containerStyle === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'containerBorder',
                    'selector': `.${elementId} .guten-icon-box-wrapper`,
                }
            ],
        },
        {
            id: 'containerBorderResponsive',
            show: (!switcher.containerStyle || switcher.containerStyle === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'containerBorderResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .guten-icon-box-wrapper`,
                }
            ],
        },
        {
            id: 'containerBoxShadow',
            show: !switcher.containerStyle || switcher.containerStyle === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'containerBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .guten-icon-box-wrapper`,
                }
            ],
        },
        {
            id: 'containerBorderHover',
            show: switcher.containerStyle === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'containerBorderHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}:hover .guten-icon-box-wrapper`,
                }
            ],
        },
        {
            id: 'containerBorderHoverResponsive',
            show: switcher.containerStyle === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'containerBorderHoverResponsive',
                    'responsive': true,
                    'selector': `.${elementId}:hover .guten-icon-box-wrapper`,
                }
            ],
        },
        {
            id: 'containerBoxShadowHover',
            show: switcher.containerStyle === 'hover',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'containerBoxShadowHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}:hover .guten-icon-box-wrapper`,
                }
            ],
        }
    ];
};


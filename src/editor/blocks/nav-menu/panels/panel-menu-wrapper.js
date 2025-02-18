import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, DimensionControl, RangeControl, BoxShadowControl } from 'gutenverse-core/controls';
import { handleBackground, handleColor, handleDimension, handleBoxShadow, allowRenderBoxShadow } from 'gutenverse-core/styling';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const menuWrapperPanel = (props) => {
    const {
        elementId
    } = props;

    const deviceType = getDeviceType();

    return [
        {
            id: 'menuHeight',
            label: __('Menu Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 30,
            max: 300,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'menuHeight',
                    'selector': `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li > a,
                    .${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ],
        },
        {
            id: 'menuBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'menuBackground',
                    'type': 'background',
                    'selector': `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper, .${elementId} .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper, .${elementId} .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper`,
                }
            ],
        },
        {
            id: 'mobileWrapperBackground',
            show: deviceType === 'Tablet' || deviceType === 'Mobile',
            label: __('Mobile Wrapper Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'mobileWrapperBackground',
                    'responsive': true,
                    'selector': `.${elementId} .break-point-mobile.guten-nav-menu .gutenverse-menu-wrapper, .${elementId} .break-point-tablet.guten-nav-menu .gutenverse-menu-wrapper`,
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
            id: 'menuPadding',
            label: __('Padding', 'gutenverse'),
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
        },
        {
            id: 'menuMargin',
            label: __('Margin', 'gutenverse'),
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
        },
        {
            id: 'menuRadius',
            label: __('Border Radius', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                '%': {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'menuBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            allowDeviceControl: true,
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'menuBoxShadow',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .gutenverse-menu-wrapper`,
                }
            ],
        },
    ];
};
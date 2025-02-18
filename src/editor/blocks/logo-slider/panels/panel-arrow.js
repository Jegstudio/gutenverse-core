import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

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
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'arrowFontSize',
                    'responsive': true,
                    'selector': `.${elementId} div[class*='swiper-button-']`,
                    'properties': [
                        {
                            'name': 'font-size',
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
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'arrowColor',
                    'responsive': true,
                    'selector': `.${elementId} div[class*='swiper-button-']`,
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
            id: 'arrowBgColor',
            show: !switcher.arrowHover || switcher.arrowHover === 'normal',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'arrowBgColor',
                    'responsive': true,
                    'selector': `.${elementId} div[class*='swiper-button-']`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ]
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
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'arrowOpacity',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'function',
                            'functionName': 'handleOpacity'
                        }
                    ],
                    'selector': `.${elementId} div[class*='swiper-button-']`,
                }
            ]
        },
        {
            id: 'arrowHoverColor',
            show: switcher.arrowHover === 'hover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'arrowHoverColor',
                    'responsive': true,
                    'selector': `.${elementId} div[class*='swiper-button-']:hover`,
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
            id: 'arrowHoverBgColor',
            show: switcher.arrowHover === 'hover',
            label: __('Background Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'arrowHoverBgColor',
                    'responsive': true,
                    'selector': `.${elementId} div[class*='swiper-button-']:hover`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ]
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
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'arrowHoverOpacity',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'function',
                            'functionName': 'handleOpacity'
                        }
                    ],
                    'selector': `.${elementId} div[class*='swiper-button-']:hover`,
                }
            ]
        },
        {
            id: 'arrowBorder',
            show: (!switcher.arrowHover || switcher.arrowHover === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'arrowBorder',
                    'selector': `.${elementId} div[class*='swiper-button-']`,
                }
            ]
        },
        {
            id: 'arrowBorderResponsive',
            show: (!switcher.arrowHover || switcher.arrowHover === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'arrowBorderResponsive',
                    'selector': `.${elementId} div[class*='swiper-button-']`,
                }
            ]
        },
        {
            id: 'arrowBoxShadow',
            show: !switcher.arrowHover || switcher.arrowHover === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'arrowBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} div[class*='swiper-button-']`,
                }
            ]
        },
        {
            id: 'arrowBorderHover',
            show: switcher.arrowHover === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'arrowBorderHover',
                    'selector': `.${elementId} div[class*='swiper-button-']:hover`,
                }
            ]
        },
        {
            id: 'arrowBorderHoverResponsive',
            show: switcher.arrowHover === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'arrowBorderResponsiveHover',
                    'selector': `.${elementId} div[class*='swiper-button-']:hover`,
                }
            ]
        },
        {
            id: 'arrowBoxShadowHover',
            show: switcher.arrowHover === 'hover',
            label: __('Hover Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'arrowBoxShadowHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} div[class*='swiper-button-']:hover`,
                }
            ]
        }
    ];
};
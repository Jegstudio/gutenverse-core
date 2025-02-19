import { __ } from '@wordpress/i18n';

import { BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, IconRadioControl, RangeControl, SizeControl, SwitchControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const stylePanel = (props) => {
    const {
        elementId,
        authorType,
        authorAvatar,
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'alignment',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'space-between',
                    icon: <AlignJustify />,
                },
            ],
        },
        {
            id: 'typography',
            show: authorType && authorType !== 'user_image',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: '__styleHover',
            show: authorType && authorType !== 'user_image',
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
            onChange: ({ __styleHover }) => setSwitcher({ ...switcher, styleHover: __styleHover })
        },
        {
            id: 'color',
            show: (!switcher.styleHover || switcher.styleHover === 'normal') && authorType && authorType !== 'user_image',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'color',
                    'selector': `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6, .${elementId} span, .${elementId} a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        {
            id: 'textShadow',
            show: (!switcher.styleHover || switcher.styleHover === 'normal') && authorType && authorType !== 'user_image',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'textShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6, .${elementId} span, .${elementId} a`,
                }
            ],
        },
        {
            id: 'colorHover',
            show: switcher.styleHover === 'hover' && authorType && authorType !== 'user_image',
            label: __('Hover Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'colorHover',
                    'selector': `.${elementId}:hover h1, .${elementId}:hover h2, .${elementId}:hover h3, .${elementId}:hover h4, .${elementId}:hover h5, .${elementId}:hover h6, .${elementId}:hover span, .${elementId}:hover a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        {
            id: 'textShadowHover',
            show: switcher.styleHover === 'hover' && authorType && authorType !== 'user_image',
            label: __('Hover Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'textShadowHover',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}:hover h1, .${elementId}:hover h2, .${elementId}:hover h3, .${elementId}:hover h4, .${elementId}:hover h5, .${elementId}:hover h6, .${elementId}:hover span, .${elementId}:hover a`,
                }
            ],
        },
        {
            id: 'size',
            show: authorAvatar,
            label: __('Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 1,
                    max: 100,
                    step: 0.1
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
            liveStyle: [
                authorAvatar && {
                    'type': 'unitPoint',
                    'id': 'size',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'avatarGap',
            show: authorAvatar,
            label: __('Gap', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                authorAvatar && {
                    'type': 'plain',
                    'id': 'avatarGap',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'margin-right',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'opacity',
            show: authorAvatar,
            label: __('Opacity', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                authorAvatar && {
                    'type': 'plain',
                    'id': 'opacity',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'pattern',
                            'pattern': 'calc({value}/100)',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'rotate',
            show: authorAvatar,
            label: __('Rotate', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'deg',
            min: 0,
            max: 360,
            step: 1,
            liveStyle: [
                authorAvatar && {
                    'type': 'plain',
                    'id': 'rotate',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'transform',
                            'valueType': 'pattern',
                            'pattern': 'rotate({value}deg)',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'authorBorder',
            show: authorAvatar && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                authorAvatar && {
                    'type': 'border',
                    'id': 'authorBorder',
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'authorBorderResponsive',
            show: authorAvatar && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                authorAvatar && {
                    'type': 'borderResponsive',
                    'id': 'authorBorderResponsive',
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'authorBoxShadow',
            show: authorAvatar,
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                authorAvatar && {
                    'type': 'boxShadow',
                    'id': 'authorBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} img`,
                }
            ],
        }
    ];
};


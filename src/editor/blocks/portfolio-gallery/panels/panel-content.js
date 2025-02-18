import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { BackgroundControl, ColorControl, DimensionControl, IconRadioControl, SwitchControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';

export const contentPanel = (props) => {
    const {
        elementId,
        setSwitcher,
        switcher
    } = props;
    return [
        {
            id: 'activeBackground',
            label: __('Active Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'activeBackground',
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item.current-item`,
                }
            ]
        },
        {
            id: 'contentAlignment',
            label: __('Content Alignment', 'gutenverse'),
            component: IconRadioControl,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenver se'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'end',
                    icon: <AlignRight />,
                }
            ],
        },
        {
            id: 'contentPadding',
            label: __('Content Padding', 'gutenverse'),
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
            id: 'contentBackground',
            label: __('Title Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'contentBackground',
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-item-info::after`,
                }
            ]
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'subTitleTypography',
            label: __('Sub Title Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: '__hoverSwitch',
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
            onChange: ({ __hoverSwitch }) => setSwitcher({ ...switcher, hoverSwitch: __hoverSwitch })
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'normal' || !switcher.hoverSwitch,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleColor',
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-item-info .info-title`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'subTitleColor',
            label: __('Sub Title Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'normal' || !switcher.hoverSwitch,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'subTitleColor',
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-item-info .info-subtitle`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'titleTextShadow',
            label: __('Title Text Shadow', 'gutenverse'),
            show: switcher.hoverSwitch === 'normal' || !switcher.hoverSwitch,
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'titleTextShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-item-info .info-title`,
                }
            ]
        },
        {
            id: 'subTitleTextShadow',
            label: __('Sub Title Text Shadow', 'gutenverse'),
            show: switcher.hoverSwitch === 'normal' || !switcher.hoverSwitch,
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'subTitleTextShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-item-info .info-subtitle`,
                }
            ]
        },
        {
            id: 'titleColorHover',
            label: __('Title Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'hover',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleColorHover',
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item:hover .row-item-info .info-title`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'subTitleColorHover',
            label: __('Sub Title Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'hover',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'subTitleColorHover',
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item:hover .row-item-info .info-subtitle`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'titleTextShadowHover',
            label: __('Title Text Shadow', 'gutenverse'),
            show: switcher.hoverSwitch === 'hover',
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'titleTextShadowHover',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item:hover .row-item-info .info-title`,
                }
            ]
        },
        {
            id: 'subTitleTextShadowHover',
            label: __('Sub Title Text Shadow', 'gutenverse'),
            show: switcher.hoverSwitch === 'hover',
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'subTitleTextShadowHover',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item:hover .row-item-info .info-subtitle`,
                }
            ]
        },
    ];
};
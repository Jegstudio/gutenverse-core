import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderResponsiveControl, ColorControl, RangeControl, RepeaterControl, SizeControl, SwitchControl } from 'gutenverse-core/controls';
import { featureListGetBlockStyle } from '../styles/block-style';

export const iconPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        featureList
    } = props;
    return [
        {
            id: 'iconWrapperSize',
            label: __('Icon Wrapper Size', 'gutenverse'),
            component: RangeControl,
            min: 10,
            max: 500,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconWrapperSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon-wrapper .icon`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        },
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
                },
                {
                    'type': 'plain',
                    'id': 'iconWrapperSize',
                    'selector': `.${elementId}.guten-feature-list`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': '--icon-size',
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
            id: 'iconContentSpacing',
            component: SizeControl,
            label: __('Icon Content Spacing', 'gutenverse'),
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vh',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'iconContentSpacing',
                    'responsive': true,
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item`,
                    'properties': [
                        {
                            'name': 'gap',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: '__styleSwitch',
            component: SwitchControl,
            options: [
                {
                    value: 'all',
                    label: 'All in One'
                },
                {
                    value: 'single',
                    label: 'Single'
                }
            ],
            onChange: ({ __styleSwitch }) => setSwitcher({ ...switcher, styleSwitch: __styleSwitch })
        },
        {
            id: 'iconSize',
            component: SizeControl,
            label: __('Icon Size', 'gutenverse'),
            show: (switcher.styleSwitch === 'all' || !switcher.styleSwitch),
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon i`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'unitPoint',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon img`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: '__allStyleSwitch',
            component: SwitchControl,
            show: switcher.styleSwitch === 'all' || !switcher.styleSwitch,
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
            onChange: ({ __allStyleSwitch }) => setSwitcher({ ...switcher, allStyleSwitch: __allStyleSwitch })
        },
        {
            id: 'iconColor',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            show: (switcher.styleSwitch === 'all' || !switcher.styleSwitch) && (switcher.allStyleSwitch === 'normal' || !switcher.allStyleSwitch),
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon i`,
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
            id: 'iconColorHover',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            show: (switcher.styleSwitch === 'all' || !switcher.styleSwitch) && switcher.allStyleSwitch === 'hover',
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColorHover',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon i`,
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
            id: 'iconBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            show: (switcher.styleSwitch === 'all' || !switcher.styleSwitch) && (switcher.allStyleSwitch === 'normal' || !switcher.allStyleSwitch),
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'iconBackground',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon`,
                }
            ]
        },
        {
            id: 'iconBackgroundHover',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            show: (switcher.styleSwitch === 'all' || !switcher.styleSwitch) && switcher.allStyleSwitch === 'hover',
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'iconBackgroundHover',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon`,
                }
            ]
        },
        {
            id: 'iconBorder',
            show: (switcher.styleSwitch === 'all' || !switcher.styleSwitch) && (switcher.allStyleSwitch === 'normal' || !switcher.allStyleSwitch),
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'iconBorder',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon`,
                }
            ]
        },
        {
            id: 'iconBorderHover',
            show: (switcher.styleSwitch === 'all' || !switcher.styleSwitch) && switcher.allStyleSwitch === 'hover',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'iconBorderHover',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon`,
                }
            ]
        },
        {
            id: 'featureList',
            component: RepeaterControl,
            titleFormat: '<strong><%= value.title ? value.title : "Feature List" %></strong>',
            repeaterDefault: {
                type: 'icon',
            },
            show: switcher.styleSwitch === 'single',
            options: [
                {
                    id: 'iconSize',
                    component: SizeControl,
                    label: __('Icon Size', 'gutenverse'),
                    allowDeviceControl: true,
                },
                {
                    id: '__singleStyleSwitch',
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
                    onChange: ({ __singleStyleSwitch }) => setSwitcher({ ...switcher, singleStyleSwitch: __singleStyleSwitch })
                },
                {
                    id: 'iconColor',
                    label: __('Icon Color', 'gutenverse'),
                    component: ColorControl,
                    show: () => switcher.singleStyleSwitch === 'normal' || !switcher.singleStyleSwitch,
                },
                {
                    id: 'iconColorHover',
                    label: __('Icon Color', 'gutenverse'),
                    component: ColorControl,
                    show: () => switcher.singleStyleSwitch === 'hover',

                },
                {
                    id: 'iconBackground',
                    component: BackgroundControl,
                    allowDeviceControl: true,
                    options: ['default', 'gradient'],
                    show: () => switcher.singleStyleSwitch === 'normal' || !switcher.singleStyleSwitch,

                },
                {
                    id: 'iconBackgroundHover',
                    component: BackgroundControl,
                    allowDeviceControl: true,
                    options: ['default', 'gradient'],
                    show: () => switcher.singleStyleSwitch === 'hover',

                },
                {
                    id: 'iconBorder',
                    show: () => switcher.singleStyleSwitch === 'normal' || !switcher.singleStyleSwitch,
                    label: __('Border', 'gutenverse'),
                    component: BorderResponsiveControl,
                    allowDeviceControl: true,

                },
                {
                    id: 'iconBorderHover',
                    show: () => switcher.singleStyleSwitch === 'hover',
                    label: __('Border', 'gutenverse'),
                    component: BorderResponsiveControl,
                    allowDeviceControl: true,

                },
            ],
            liveStyle : [
                {
                    'type': 'repeater',
                    'id': 'featureList',
                    'repeaterOpt': featureListGetBlockStyle(elementId, featureList)
                }
            ]
        },
    ];
};
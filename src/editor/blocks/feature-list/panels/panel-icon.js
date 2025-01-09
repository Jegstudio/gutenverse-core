import { __ } from '@wordpress/i18n';
import { AlertControl, BackgroundControl, BorderResponsiveControl, ColorControl, RangeControl, RepeaterControl, SelectControl, SizeControl, SwitchControl } from 'gutenverse-core/controls';
import { handleBackground, handleBorderResponsive, handleColor } from 'gutenverse-core/styling';

export const iconPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;
    return [
        {
            id: 'iconWrapperSize',
            label: __('Icon Wrapper Size', 'gutenverse'),
            component: RangeControl,
            min: 10,
            max: 500,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon-wrapper .icon`,
                    render: value => `width : ${value}px; height : ${value}px;`
                },
                {
                    selector: `.${elementId}.guten-feature-list`,
                    render: value => `--icon-size: ${value}px;`
                },
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
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item`,
                    render: value => `gap:${value['point']}${value['unit']};`
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
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon i`,
                    render: value => `font-size:${value['point']}${value['unit']};`
                },
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon img`,
                    render: value => `width:${value['point']}${value['unit']};`
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
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon i`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconColorHover',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            show: (switcher.styleSwitch === 'all' || !switcher.styleSwitch) && switcher.allStyleSwitch === 'hover',
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon i`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            show: (switcher.styleSwitch === 'all' || !switcher.styleSwitch) && (switcher.allStyleSwitch === 'normal' || !switcher.allStyleSwitch),
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'iconBackgroundHover',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            show: (switcher.styleSwitch === 'all' || !switcher.styleSwitch) && switcher.allStyleSwitch === 'hover',
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'iconBorder',
            show: (switcher.styleSwitch === 'all' || !switcher.styleSwitch) && (switcher.allStyleSwitch === 'normal' || !switcher.allStyleSwitch),
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'iconBorderHover',
            show: (switcher.styleSwitch === 'all' || !switcher.styleSwitch) && switcher.allStyleSwitch === 'hover',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon`,
                    render: value => handleBorderResponsive(value)
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
                    style: [
                        {
                            selector: (index) =>  `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index+1}) .icon i`,
                            render: value => `font-size:${value['point']}${value['unit']};`
                        },
                        {
                            selector: (index) => `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index+1}) .icon img`,
                            render: value => `width:${value['point']}${value['unit']};`
                        }
                    ]
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
                    style: [
                        {
                            selector: (index) => `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index+1}) .icon i`,
                            render: value => handleColor(value, 'color')
                        }
                    ]
                },
                {
                    id: 'iconColorHover',
                    label: __('Icon Color', 'gutenverse'),
                    component: ColorControl,
                    show: () => switcher.singleStyleSwitch === 'hover',
                    style: [
                        {
                            selector: (index) =>  `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index+1}):hover .icon i`,
                            render: value => handleColor(value, 'color')
                        }
                    ]
                },
                {
                    id: 'iconBackground',
                    component: BackgroundControl,
                    allowDeviceControl: true,
                    options: [ 'default', 'gradient' ],
                    show: () => switcher.singleStyleSwitch === 'normal' || !switcher.singleStyleSwitch,
                    style: [
                        {
                            selector: (index) => `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index+1}) .icon`,
                            hasChild: true,
                            render: value => handleBackground(value)
                        }
                    ]
                },
                {
                    id: 'iconBackgroundHover',
                    component: BackgroundControl,
                    allowDeviceControl: true,
                    options: [ 'default', 'gradient' ],
                    show: () => switcher.singleStyleSwitch === 'hover',
                    style: [
                        {
                            selector: (index) =>  `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index+1}):hover .icon`,
                            hasChild: true,
                            render: value => handleBackground(value)
                        }
                    ]
                },
                {
                    id: 'iconBorder',
                    show: () => switcher.singleStyleSwitch === 'normal' || !switcher.singleStyleSwitch,
                    label: __('Border', 'gutenverse'),
                    component: BorderResponsiveControl,
                    allowDeviceControl: true,
                    style: [
                        {
                            selector: (index) => `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index+1}) .icon`,
                            render: value => handleBorderResponsive(value)
                        }
                    ]
                },
                {
                    id: 'iconBorderHover',
                    show: () => switcher.singleStyleSwitch === 'hover',
                    label: __('Border', 'gutenverse'),
                    component: BorderResponsiveControl,
                    allowDeviceControl: true,
                    style: [
                        {
                            selector: (index) =>  `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index+1}):hover .icon`,
                            render: value => handleBorderResponsive(value)
                        }
                    ]
                },
            ],
        },
    ];
};
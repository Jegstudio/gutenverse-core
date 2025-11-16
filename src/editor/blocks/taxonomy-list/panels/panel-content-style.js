
import { __ } from '@wordpress/i18n';
import { ColorControl, IconRadioControl, SizeControl, SelectControl, SwitchControl, TypographyControl, HeadingControl, TextControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const contentStylePanel = (props) => {
    const {
        elementId,
        layout,
        itemWidth,
        switcher,
        setSwitcher,
        showCount,
        countJustify
    } = props;

    const deviceType = getDeviceType();

    const optionJustify = () => {
        if (layout !== 'column') {
            return [
                {
                    label: __('Default', 'gutenverse'),
                    value: 'default',
                },
                {
                    label: __('Custom', 'gutenverse'),
                    value: 'custom',
                },
            ];
        } else {
            return [
                {
                    label: __('Default', 'gutenverse'),
                    value: 'default',
                },
                {
                    label: __('Space Around', 'gutenverse'),
                    value: 'space-around',
                },
                {
                    label: __('Space Between', 'gutenverse'),
                    value: 'space-between',
                },
                {
                    label: __('Custom', 'gutenverse'),
                    value: 'custom',
                },
            ];
        }
    };

    const optionAlign = () => {
        if (layout === 'column') {
            return [
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
            ];
        } else {
            return [
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
                    label: __('Space Between', 'gutenverse'),
                    value: 'space-between',
                    icon: <AlignJustify />,
                },
            ];
        }
    };
    return [
        {
            id: 'contentAlignment',
            label: __('Content Alignment', 'gutenverse'),
            allowDeviceControl: true,
            component: IconRadioControl,
            options: optionAlign(),
        },
        {
            id: 'contentSpacing',
            label: __('Content Spacing Vertical', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'contentSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .taxonomy-list-wrapper`,
                    'properties': [
                        {
                            'name': 'row-gap',
                            'valueType': 'pattern',
                            'pattern': '{value}',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'contentSpacingHorizontal',
            show: layout !== 'column',
            label: __('Content Spacing Horizontal', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'contentSpacingHorizontal',
                    'responsive': true,
                    'selector': `.${elementId} .taxonomy-list-wrapper`,
                    'properties': [
                        {
                            'name': 'column-gap',
                            'valueType': 'pattern',
                            'pattern':'{value}',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'itemWidth',
            label: __('Item Width', 'gutenverse'),
            component: SelectControl,
            show: layout === 'row',
            allowDeviceControl: true,
            options: [
                {
                    value: '100%',
                    label: __('Fullwidth', 'gutenverse'),
                },
                {
                    value: 'fit-content',
                    label: __('Fit Content Width', 'gutenverse'),
                },
                {
                    value: 'custom',
                    label: __('Custom Item Width', 'gutenverse'),
                },
            ],
        },
        {
            id: 'customItemWidth',
            label: __('Taxonomy Item Width', 'gutenverse'),
            show: itemWidth && itemWidth[deviceType] && itemWidth[deviceType] === 'custom',
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 0,
                    max: 100,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 0,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
            },
            liveStyle : [
                {
                    'type': 'unitPoint',
                    'id': 'customItemWidth',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType' : 'direct'
                        }
                    ],
                    'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item`,
                }
            ]
        },
        {
            id: 'contentTypography',
            label: __('Content Typography', 'gutenverse'),
            component: TypographyControl
        },
        {
            id: '__contentSwitch',
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
            onChange: ({ __contentSwitch }) => setSwitcher({ ...switcher, contentSwitch: __contentSwitch })
        },
        {
            id: 'contentColor',
            label: __('Content Color', 'gutenverse'),
            component: ColorControl,
            show: !switcher.contentSwitch || switcher.contentSwitch === 'normal',
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'contentColor',
                    'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a`,
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
            id: 'contentColorHover',
            label: __('Content Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.contentSwitch === 'hover',
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'contentColorHover',
                    'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a:hover`,
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
            id: 'countSplitter',
            component: HeadingControl,
            show: showCount,
            label: __('Taxonomy Count', 'gutenverse'),
        },
        {
            id: 'countTypography',
            show: showCount,
            label: __('Count Typography', 'gutenverse'),
            component: TypographyControl
        },
        {
            id: 'countColor',
            label: __('Count Color', 'gutenverse'),
            component: ColorControl,
            show: showCount,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'countColor',
                    'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item span.taxonomy-list-count.guten-taxonomy`,
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
            id: 'countJustify',
            label: __('Space Count & Taxnomy', 'gutenverse'),
            component: SelectControl,
            show: showCount,
            allowDeviceControl: true,
            options: optionJustify(),
        },
        {
            id: 'countSpacing',
            label: __('Count Spacing', 'gutenverse'),
            component: SizeControl,
            show: showCount && countJustify && countJustify[deviceType] === 'custom',
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'countSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item`,
                    'properties': [
                        {
                            'name': 'gap',
                            'valueType': 'pattern',
                            'pattern': '{value}',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                }
            ]
        },
    ];
};

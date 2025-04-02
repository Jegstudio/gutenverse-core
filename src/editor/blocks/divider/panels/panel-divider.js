import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { ColorControl, IconRadioControl, RangeControl, SelectControl } from 'gutenverse-core/controls';

export const dividerPanel = ({ elementId }) => {
    return [
        {
            id: 'type',
            label: __('Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Default'),
                    value: 'default'
                },
                {
                    label: __('Double'),
                    value: 'double'
                },
                {
                    label: __('Dotted'),
                    value: 'dotted'
                },
                {
                    label: __('Dashed'),
                    value: 'dashed'
                },
                {
                    label: __('Curly'),
                    value: 'curly'
                },
                {
                    label: __('Curved'),
                    value: 'curved'
                },
                {
                    label: __('Slashed'),
                    value: 'slashed'
                },
                {
                    label: __('Squared'),
                    value: 'squared'
                },
                {
                    label: __('Wavy'),
                    value: 'wavy'
                },
                {
                    label: __('Zigzag'),
                    value: 'zigzag'
                },
                {
                    label: __('Multiple'),
                    value: 'multiple'
                },
                {
                    label: __('Arrows'),
                    value: 'arrows'
                },
                {
                    label: __('Pluses'),
                    value: 'pluses'
                },
                {
                    label: __('Rhombus'),
                    value: 'rhombus'
                },
                {
                    label: __('Parallelogram'),
                    value: 'parallelogram'
                },
                {
                    label: __('Rectangles'),
                    value: 'rectangles'
                },
                {
                    label: __('Fir Trees'),
                    value: 'fir'
                },
                {
                    label: __('Half Round'),
                    value: 'halfrounds'
                },
                {
                    label: __('Leaves'),
                    value: 'leaves'
                },
                {
                    label: __('Stripes'),
                    value: 'stripes'
                },
                {
                    label: __('Squares'),
                    value: 'squares'
                },
                {
                    label: __('Trees'),
                    value: 'trees'
                },
                {
                    label: __('Tribal'),
                    value: 'tribal'
                },
                {
                    label: __('X'),
                    value: 'x'
                },
            ]
        },
        {
            id: 'width',
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: '%',
            min: 10,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'width',
                    'selector': `.${elementId} .guten-divider-wrapper`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}%',
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
            id: 'size',
            label: __('Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 100,
            step: 0.1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'size',
                    'selector': `.${elementId} .guten-divider-style`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': '--divider-pattern-height',
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
                    'id': 'size',
                    'selector': `.${elementId} .guten-divider-line`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'border-width',
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
            id: 'gap',
            label: __('Gap', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 50,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'gap',
                    'selector': `.${elementId} .guten-divider-wrapper`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'padding',
                            'valueType': 'pattern',
                            'pattern': '{value}px 0',
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
            id: 'dividerColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'dividerColor',
                    'selector': `.${elementId} .guten-divider-line`,
                    'properties': [
                        {
                            'name': 'border-color',
                            'valueType': 'direct',
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'dividerColor',
                    'selector': `.${elementId} .guten-divider-style`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'dividerAlign',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight />,
                },
            ],
        },
    ];
};
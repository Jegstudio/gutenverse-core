
import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { CheckboxControl, ColorControl, IconRadioControl, RangeControl, SelectControl, SizeControl } from 'gutenverse-core/controls';

export const panelGeneral = (props) => {
    const {
        elementId,
        isDivider,
    } = props;

    return [
        {
            id: 'displayInline',
            label: __('Display Inline', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'isDivider',
            label: __('Divider', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'colorDivider',
            label: __('Color Divider', 'gutenverse'),
            show: isDivider,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'colorDivider',
                    'selector': `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:nth-child(1))`,
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
            id: 'typeDivider',
            label: __('Type Divider', 'gutenverse'),
            show: isDivider,
            component: SelectControl,
            options: [
                {
                    label: __('Solid', 'gutenverse'),
                    value: 'solid'
                },
                {
                    label: __('Double', 'gutenverse'),
                    value: 'double'
                },
                {
                    label: __('Dotted', 'gutenverse'),
                    value: 'dotted'
                },
                {
                    label: __('Dashed', 'gutenverse'),
                    value: 'dashed'
                },
            ],
        },
        {
            id: 'widthDivider',
            label: __('Width Divider', 'gutenverse'),
            show: isDivider,
            component: SizeControl,
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'widthDivider',
                    'selector': `.${elementId}:not(.inline-icon-list) .guten-icon-list-item`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'unitPoint',
                    'id': 'widthDivider',
                    'selector': `.${elementId}.inline-icon-list .guten-icon-list-item`,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'sizeDivider',
            label: __('Size Divider', 'gutenverse'),
            show: isDivider,
            component: SizeControl,
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'sizeDivider',
                    'selector': `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:nth-child(1))`,
                    'properties': [
                        {
                            'name': 'border-top-width',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'unitPoint',
                    'id': 'sizeDivider',
                    'selector': `.${elementId}.inline-icon-list .guten-icon-list-item:not(:nth-child(1))`,
                    'properties': [
                        {
                            'name': 'border-left-width',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'spaceBetween',
            label: __('Space Between', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'spaceBetween',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'margin-top',
                            'valueType': 'pattern',
                            'pattern': 'calc({value}px/2)',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId}:not(.inline-icon-list) li.guten-icon-list-item:not(:first-of-type) > a, .block-editor-block-list__layout .wp-block.${elementId}:not(.inline-icon-list) li.guten-icon-list-item:not(:first-of-type) > a`,
                },
                {
                    'type': 'plain',
                    'id': 'spaceBetween',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'padding-bottom',
                            'valueType': 'pattern',
                            'pattern': 'calc({value}px/2)',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:last-child), .block-editor-block-list__layout .wp-block.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:last-child)`,

                },
                {
                    'type': 'plain',
                    'id': 'spaceBetween',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'margin-right',
                            'valueType': 'pattern',
                            'pattern': 'calc({value}px/2)',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId}.inline-icon-list .guten-icon-list-item:not(:last-child), .block-editor-block-list__layout .wp-block.${elementId}.inline-icon-list .guten-icon-list-item:not(:last-child)`,

                },
                {
                    'type': 'plain',
                    'id': 'spaceBetween',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'margin-left',
                            'valueType': 'pattern',
                            'pattern': 'calc({value}px/2)',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId}.inline-icon-list li.guten-icon-list-item:not(li:first-of-type) > a, .block-editor-block-list__layout .wp-block.${elementId}.inline-icon-list li.guten-icon-list-item:not(li:first-of-type) > a`,

                }
            ]
        },
        {
            id: 'alignList',
            label: __('Text Alignment', 'gutenverse'),
            allowDeviceControl: true,
            component: IconRadioControl,
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
            ],
        },
        {
            id: 'verticalAlign',
            label: __('Vertical Align'),
            component: SelectControl,
            options: [
                {
                    label: __('Top', 'gutenverse'),
                    value: 'flex-start'
                },
                {
                    label: __('Center', 'gutenverse'),
                    value: 'center'
                },
                {
                    label: __('Bottom', 'gutenverse'),
                    value: 'flex-end'
                },
            ],
        },
    ];
};


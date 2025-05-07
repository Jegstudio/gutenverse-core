import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, SelectControl, TypographyControl } from 'gutenverse-core/controls';

export const superPanel = ({ elementId }) => {
    return [
        {
            id: 'superColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'superColor',
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper .super`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'superTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'superTop',
            label: __('Top', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: -100,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'superTop',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper .super`,
                    'properties': [
                        {
                            'name': 'top',
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
            id: 'superSpace',
            label: __('Horizontal Space', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: -5,
            max: 20,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'superSpace',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper .super`,
                    'properties': [
                        {
                            'name': 'left',
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
            id: 'superAlign',
            label: __('Vertical Position', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    value: 'super',
                    label: 'Top'
                },
                {
                    value: 'baseline',
                    label: 'Middle'
                },
                {
                    value: 'sub',
                    label: 'Bottom'
                },
            ],
        },
    ];
};
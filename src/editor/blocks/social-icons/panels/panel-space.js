import { __ } from '@wordpress/i18n';
import { DimensionControl, RangeControl } from 'gutenverse-core/controls';

export const contentSpace = ({ elementId }) => {
    return [
        {
            id: 'gap',
            label: __('Social Icon Gap', 'gutenverse'),
            component: RangeControl,
            default: 10,
            min: 1,
            max: 100,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'gap',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'margin-left',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId}.horizontal > div:not(:first-child)`,
                },
                {
                    'type': 'plain',
                    'id': 'gap',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'margin-top',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId}.vertical > div:not(:first-child)`,
                }
            ]
        },
        {
            id: 'itemPadding',
            label: __('Padding', 'gutenverse'),
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
            }
        },
    ];
};
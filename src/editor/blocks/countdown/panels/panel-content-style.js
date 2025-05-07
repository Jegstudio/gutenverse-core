
import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl } from 'gutenverse-core/controls';

export const contentStylePanel = (props) => {
    const {
        elementId,
    } = props;
    return [
        {
            id: 'column',
            label: __('Column', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 4,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'column',
                    'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .guten-countdown-wrapper .time-container`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'flex',
                            'valueType': 'pattern',
                            'pattern': '0 0 calc( 100% / {value} ); max-width: calc( (100% / {value}))',
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
            id: 'rowGap',
            label: __('Row Gap', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            unit: 'px',
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'rowGap',
                    'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .guten-countdown-wrapper`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'row-gap',
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
            id: 'labelPosition',
            label: __('Label Position', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Top', 'gutenverse'),
                    value: 'top',
                },
                {
                    label: __('Bottom', 'gutenverse'),
                    value: 'bottom',
                },
                {
                    label: __('Left', 'gutenverse'),
                    value: 'left',
                },
                {
                    label: __('Right', 'gutenverse'),
                    value: 'right',
                },
            ],
        },
        {
            id: 'labelSpacing',
            label: __('Label Spacing', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            unit: 'px',
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'labelSpacing',
                    'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .time-container`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'gap',
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
    ];
};
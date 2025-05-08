import { __ } from '@wordpress/i18n';
import { CheckboxControl, RangeColumnControl, SelectControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const layoutPanel = ({ elementId, forceColumnHundred }) => {
    const deviceType = getDeviceType();

    const minWidth = {
        Desktop: 5,
        Tablet: 0,
        Mobile: 0,
    };

    return [
        {
            id: 'forceColumnHundred',
            label: __('Force Column 100%', '--gctd--'),
            description: __('This will force the column width to be 100%.', '--gctd--'),
            allowDeviceControl: true,
            deviceValues: forceColumnHundred,
            usePreviousDeviceValue: true,
            usePreviousDevice: true,
            component: CheckboxControl,
        },
        {
            id: 'width',
            show: !forceColumnHundred || !forceColumnHundred[deviceType],
            label: __('Column Width', '--gctd--'),
            component: RangeColumnControl,
            min: minWidth[deviceType],
            step: 0.1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'width',
                    'responsive': true,
                    'responsiveSelector': true,
                    'selector': {
                        'Desktop': `.${elementId}`,
                        'Tablet': `.${elementId}`,
                        'Mobile': `.guten-element.${elementId}`,
                    },
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}%',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                },
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'verticalAlign',
            label: __('Vertical Align', '--gctd--'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: 'Default',
                    value: 'default'
                },
                {
                    label: 'Top',
                    value: 'flex-start'
                },
                {
                    label: 'Middle',
                    value: 'center'
                },
                {
                    label: 'Bottom',
                    value: 'flex-end'
                },
                {
                    label: 'Space Between',
                    value: 'space-between'
                },
                {
                    label: 'Space Around',
                    value: 'space-around'
                },
                {
                    label: 'Space Evenly',
                    value: 'space-evenly'
                },
            ],
        },
        {
            id: 'horizontalAlign',
            label: __('Horizontal Align', '--gctd--'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: 'Default',
                    value: 'default'
                },
                {
                    label: 'Start',
                    value: 'flex-start'
                },
                {
                    label: 'Center',
                    value: 'center'
                },
                {
                    label: 'End',
                    value: 'flex-end'
                },
                {
                    label: 'Space Between',
                    value: 'space-between'
                },
                {
                    label: 'Space Around',
                    value: 'space-around'
                },
                {
                    label: 'Space Evenly',
                    value: 'space-evenly'
                },
            ],
        },
        {
            id: 'order',
            label: __('Column Order', '--gctd--'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: '1',
                    value: 1
                },
                {
                    label: '2',
                    value: 2
                },
                {
                    label: '3',
                    value: 3
                },
                {
                    label: '4',
                    value: 4
                },
                {
                    label: '5',
                    value: 5
                },
                {
                    label: '6',
                    value: 6
                },
                {
                    label: '7',
                    value: 7
                },
                {
                    label: '8',
                    value: 8
                },
                {
                    label: '9',
                    value: 9
                },
                {
                    label: '10',
                    value: 10
                },
            ],
        }
    ];
};
import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const layoutPanel = ({elementId}) => {
    const deviceType = getDeviceType();

    const minWidth = {
        Desktop: 5,
        Tablet: 10,
        Mobile: 15,
    };

    return [
        {
            id: 'width',
            label: __('Column Width', '--gctd--'),
            component: RangeControl,
            min: minWidth[deviceType],
            step: 0.1,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'plain',
                'responsive': true,
                'selector': `.${elementId}`,
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
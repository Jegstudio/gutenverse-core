import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl, SizeControl } from 'gutenverse-core/controls';

export const layoutPanel = (props) => {
    const {
        elementId,
        layout,
        heightControl,
        overflow,
    } = props;

    return [
        {
            id: 'layout',
            label: __('Content Width', '--gctd--'),
            component: SelectControl,
            options: [
                {
                    value: 'fullwidth',
                    label: __('Fullwidth Section', '--gctd--'),
                },
                {
                    value: 'boxed',
                    label: __('Normal Width Section', '--gctd--'),
                },
            ],
        },
        {
            id: 'width',
            label: __('Container Width', '--gctd--'),
            show: layout === 'boxed',
            component: RangeControl,
            min: 500,
            max: 1600,
            allowDeviceControl: true,
            liveUpdate: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'width',
                    'responsive': true,
                    'selector': `section.guten-section.${elementId}.layout-boxed > .guten-container`,
                    'properties': [
                        {
                            'name': 'max-width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
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
            id: 'gap',
            label: __('Column Gap', '--gctd--'),
            component: SelectControl,
            options: [
                {
                    label: __('Default', '--gctd--'),
                    value: 'default'
                },
                {
                    label: __('No gap', '--gctd--'),
                    value: 'no'
                },
                {
                    label: __('Narrow', '--gctd--'),
                    value: 'narrow'
                },
                {
                    label: __('Extended', '--gctd--'),
                    value: 'extended'
                },
                {
                    label: __('Wide', '--gctd--'),
                    value: 'wide'
                },
                {
                    label: __('Wider', '--gctd--'),
                    value: 'wider'
                }
            ],
        },
        {
            id: 'heightControl',
            label: __('Height', '--gctd--'),
            component: SelectControl,
            options: [
                {
                    label: __('Default', '--gctd--'),
                    value: 'default'
                },
                {
                    label: __('Minimum Height', '--gctd--'),
                    value: 'min'
                },
                {
                    label: __('Fit Screen', '--gctd--'),
                    value: 'fit'
                },
            ],
        },
        {
            id: 'height',
            label: __('Minimum Height', '--gctd--'),
            show: heightControl === 'min',
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 58,
                    max: 1440,
                    step: 1
                },
                vh: {
                    text: 'vh',
                    min: 5,
                    max: 100,
                    step: 1
                },
                vw: {
                    text: 'vw',
                    min: 5,
                    max: 100,
                    step: 1
                },
            },
        },
        {
            id: 'align',
            label: __('Column Position', '--gctd--'),
            show: ['fit', 'min'].includes(heightControl),
            component: SelectControl,
            options: [
                {
                    label: __('Stretch', '--gctd--'),
                    value: 'stretch'
                },
                {
                    label: __('Top', '--gctd--'),
                    value: 'top'
                },
                {
                    label: __('Middle', '--gctd--'),
                    value: 'middle'
                },
                {
                    label: __('Bottom', '--gctd--'),
                    value: 'bottom'
                },
            ],
        },
        {
            id: 'verticalAlign',
            label: __('Vertical Align', '--gctd--'),
            component: SelectControl,
            options: [
                {
                    label: __('Default', '--gctd--'),
                    value: 'default'
                },
                {
                    label: __('Top', '--gctd--'),
                    value: 'flex-start'
                },
                {
                    label: __('Middle', '--gctd--'),
                    value: 'center'
                },
                {
                    label: __('Bottom', '--gctd--'),
                    value: 'flex-end'
                },
                {
                    label: __('Space Between', '--gctd--'),
                    value: 'space-between'
                },
                {
                    label: __('Space Around', '--gctd--'),
                    value: 'space-around'
                },
                {
                    label: __('Space Evenly', '--gctd--'),
                    value: 'space-evenly'
                },
            ],
        },
        {
            id: 'overflow',
            label: __('Overflow', '--gctd--'),
            description: overflow === 'clip'? __('"overflow:clip" May not work on safari', '--gctd--') : false,
            component: SelectControl,
            options: [
                {
                    label: __('Default', '--gctd--'),
                    value: 'none'
                },
                {
                    label: __('Hidden', '--gctd--'),
                    value: 'hidden'
                },
                {
                    label: __('Auto', '--gctd--'),
                    value: 'auto'
                },
                {
                    label: __('Clip', '--gctd--'),
                    value: 'clip'
                },
            ],
        },
        {
            id: 'clipMargin',
            label: __('Overflow Clip Margin', '--gctd--'),
            show: overflow === 'clip',
            component: SizeControl,
            description: __('The "clip margin" sets the boundaries where the overflow is hidden.', '--gctd--'),
            units: {
                px: {
                    text: 'px',
                    min: 0,
                    max: 100,
                    step: 1
                }
            },
            allowDeviceControl: true,
        },
    ];
};
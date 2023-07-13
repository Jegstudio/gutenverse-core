import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl, TextControl } from 'gutenverse-core-editor/controls';

export const progressPanel = () => {
    return [
        {
            id: 'style',
            label: __('Style', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'Default',
                    value: 'default'
                },
                {
                    label: 'Inner Content',
                    value: 'inner-content'
                },
                {
                    label: 'Bar Shadow',
                    value: 'bar-shadow'
                },
                {
                    label: 'Tooltip',
                    value: 'tooltip-style'
                },
                {
                    label: 'Tooltip Box',
                    value: 'tooltip-box'
                },
                {
                    label: 'Tooltip Rounded',
                    value: 'tooltip-rounded'
                },
                {
                    label: 'Tooltip Circle',
                    value: 'tooltip-circle'
                },
                {
                    label: 'Switch',
                    value: 'switch'
                },
                {
                    label: 'Ribbon',
                    value: 'ribbon'
                },
            ]
        },
        {
            id: 'title',
            label: __('Title', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'percentage',
            label: __('Percentage', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1
        },
        {
            id: 'duration',
            label: __('Duration', 'gutenverse'),
            component: RangeControl,
            min: 100,
            max: 10000,
            step: 1
        },
    ];
};


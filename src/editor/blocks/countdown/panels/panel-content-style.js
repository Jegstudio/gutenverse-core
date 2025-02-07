
import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl } from 'gutenverse-core/controls';

export const contentStylePanel = () => {
    return [
        {
            id: 'column',
            label: __('Column', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 4,
            allowDeviceControl: true,
        },
        {
            id: 'rowGap',
            label: __('Row Gap', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            unit: 'px',
            allowDeviceControl: true,
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
        },
    ];
};
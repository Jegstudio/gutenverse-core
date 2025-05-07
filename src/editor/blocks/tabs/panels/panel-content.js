import { SelectControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';

export const contentPanel = () => {
    return [
        {
            id: 'orientation',
            label: __('Tab Orientation', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Horizontal'),
                    value: 'horizontal'
                },
                {
                    label: __('Vertical'),
                    value: 'vertical'
                },
                {
                    label: __('Horizontal Center Align'),
                    value: 'horizontal-center'
                },
                {
                    label: __('Horizontal Right Align'),
                    value: 'horizontal-right'
                },

            ],
        },
    ];
};
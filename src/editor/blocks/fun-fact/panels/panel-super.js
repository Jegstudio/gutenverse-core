import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, SelectControl, TypographyControl } from 'gutenverse-core/controls';

export const superPanel = () => {
    return [
        {
            id: 'superColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl
        },
        {
            id: 'superTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl
        },
        {
            id: 'superTop',
            label: __('Top', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: -100,
            max: 100,
            step: 1
        },
        {
            id: 'superSpace',
            label: __('Horizontal Space', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: -5,
            max: 20,
            step: 1
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
            ]
        },
    ];
};
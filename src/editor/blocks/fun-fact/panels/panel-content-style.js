import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, RangeControl, TypographyControl } from 'gutenverse-core/controls';

export const contentStylePanel = () => {
    return [
        {
            id: 'numberColor',
            label: __('Number Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true
        },
        {
            id: 'numberTypography',
            label: __('Number Typography', 'gutenverse'),
            component: TypographyControl
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl
        },
        {
            id: 'numberBottomSpace',
            label: __('Number Bottom Space', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 0,
            max: 300,
            step: 1
        },
        {
            id: 'numberRightSpace',
            label: __('Number Right Space', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 0,
            max: 300,
            step: 1
        },
        {
            id: 'titleBottomSpace',
            label: __('Title Bottom Space', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 0,
            max: 300,
            step: 1
        },
        {
            id: 'contentPadding',
            label: __('Content Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            }
        },
    ];
};
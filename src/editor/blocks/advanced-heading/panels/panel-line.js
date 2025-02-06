import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, RangeControl, SelectControl } from 'gutenverse-core/controls';

export const linePanel = (props) => {
    const {
        showLine
    } = props;
    return [
        {
            id: 'showLine',
            label: __('Show Line', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('None'),
                    value: 'none'
                },
                {
                    label: __('Top'),
                    value: 'top'
                },
                {
                    label: __('Bottom'),
                    value: 'bottom'
                },
                {
                    label: __('Left of Title'),
                    value: 'before'
                },
                {
                    label: __('Right of Title'),
                    value: 'after'
                },
                {
                    label: __('Between Title and Subtitle'),
                    value: 'between'
                },
            ]
        },

        {
            id: 'lineColor',
            label: __('Line Color', 'gutenverse'),
            show: showLine && showLine !== 'none',
            component: ColorControl,
        },
        {
            id: 'lineWidth',
            label: __('Line Width', 'gutenverse'),
            show: showLine && showLine !== 'none',
            component: RangeControl,
            allowDeviceControl: true,
            unit: '%',
            min: 0,
            max: 100,
            step: 1,
        },
        {
            id: 'lineHeight',
            label: __('Line Height', 'gutenverse'),
            show: showLine && showLine !== 'none',
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 0,
            max: 50,
            step: 1,
        },
        {
            id: 'lineStyle',
            label: __('Line Style', 'gutenverse'),
            show: showLine && showLine !== 'none',
            component: SelectControl,
            options: [
                {
                    label: __('Default/Solid'),
                    value: 'solid'
                },
                {
                    label: __('Dotted'),
                    value: 'dotted'
                },
                {
                    label: __('Dashed'),
                    value: 'dashed'
                },
                {
                    label: __('Double'),
                    value: 'double'
                },
            ],
        },
        {
            id: 'lineMargin',
            label: __('Margin', 'gutenverse'),
            show: showLine && showLine !== 'none',
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
    ];
};
import { __ } from '@wordpress/i18n';
import { BoxShadowControl, ColorControl, DimensionControl, GradientControl, RangeControl, SelectControl } from 'gutenverse-core-editor/controls';
import { allowRenderBoxShadow, handleColor, handleDimension, handleGradient } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const stylePanel = ({elementId, colorMode}) => {
    return [
        {
            id: 'colorMode',
            label: __('Color Mode', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Default', 'gutenverse'),
                    value: 'default'
                },
                {
                    label: __('Gradient', 'gutenverse'),
                    value: 'gradient'
                }
            ],
        },
        {
            id: 'barGradient',
            show: colorMode === 'gradient',
            label: __('Bar Gradient', 'gutenverse'),
            component: GradientControl,
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .skill-bar`,
                    render: value => handleGradient(value, '90')
                }
            ]
        },
        {
            id: 'trackGradient',
            show: colorMode === 'gradient',
            label: __('Track Gradient', 'gutenverse'),
            component: GradientControl,
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .skill-bar .skill-track`,
                    render: value => handleGradient(value, '90')
                }
            ]
        },
        {
            id: 'barColor',
            show: colorMode === 'default' || !colorMode,
            label: __('Bar Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .skill-bar`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'trackColor',
            show: colorMode === 'default' || !colorMode,
            label: __('Track Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .skill-bar .skill-track`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'trackHeight',
            label: __('Track Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 200,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .skill-bar`,
                    render: value => `height: ${value}px;`
                }
            ]
        },
        {
            id: 'barRadius',
            label: __('Bar Border Radius', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .skill-bar`,
                    render: value => handleDimension(value, 'border-radius', false)
                }
            ]
        },
        {
            id: 'trackRadius',
            label: __('Track Border Radius', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .skill-bar .skill-track`,
                    render: value => handleDimension(value, 'border-radius', false)
                }
            ]
        },
        {
            id: 'barPadding',
            label: __('Bar Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .skill-bar`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'barMargin',
            label: __('Bar Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .skill-bar`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'barBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .skill-bar`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};


import { __ } from '@wordpress/i18n';
import { BoxShadowControl, ColorControl, DimensionControl, RangeControl, SelectControl, GradientWithAngleControl } from 'gutenverse-core/controls';

export const stylePanel = ({ elementId, colorMode }) => {
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
            component: GradientWithAngleControl,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'barGradient',
                    'properties': [
                        {
                            'name': 'background',
                            'valueType': 'function',
                            'functionName': 'customHandleBackground',
                        }
                    ],
                    'selector': `.${elementId} .progress-group .progress-skill-bar .number-percentage, .${elementId} .progress-group .number-percentage`
                }
            ]
        },
        {
            id: 'trackGradient',
            show: colorMode === 'gradient',
            label: __('Track Gradient', 'gutenverse'),
            component: GradientWithAngleControl,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'trackGradient',
                    'properties': [
                        {
                            'name': 'background',
                            'valueType': 'function',
                            'functionName': 'customHandleBackground',
                        }
                    ],
                    'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar .skill-track`
                }
            ]
        },
        {
            id: 'barColor',
            show: colorMode === 'default' || !colorMode,
            label: __('Bar Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'barColor',
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar`
                }
            ]
        },
        {
            id: 'trackColor',
            show: colorMode === 'default' || !colorMode,
            label: __('Track Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'trackColor',
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar .skill-track`
                }
            ]
        },
        {
            id: 'trackHeight',
            label: __('Track Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 200,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'trackHeight',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar`
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
        },
        {
            id: 'barBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'barBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar`,
                }
            ]
        },
    ];
};


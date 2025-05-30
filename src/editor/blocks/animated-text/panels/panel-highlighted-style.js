import { __ } from '@wordpress/i18n';
import { ColorControl, GradientControl, RangeControl, SelectControl } from 'gutenverse-core/controls';

export const styleHighlightPanel = (props) => {
    const {
        elementId,
        highlightColorType,
    } = props;

    return [
        {
            id: 'highlightColorType',
            label: __('Color Type'),
            component: SelectControl,
            options: [
                {
                    label: __('Color', 'gutenverse'),
                    value: 'color',
                },
                {
                    label: __('Gradient', 'gutenverse'),
                    value: 'gradient',
                },
            ]
        },
        {
            id: 'highlightColor',
            show: highlightColorType === 'color',
            label: __('Highlight color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'highlightColor',
                    'selector': `.editor-styles-wrapper .${elementId} .text-content svg path`,
                    'properties': [
                        {
                            'name': 'stroke',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'highlightGradient',
            show: highlightColorType === 'gradient',
            label: __('Highlight Gradient', 'gutenverse'),
            component: GradientControl,
        },
        {
            id: 'highlightThickness',
            label: __('Highlight Thcikness', 'gutenverse'),
            component: RangeControl,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'highlightThickness',
                    'selector': `.editor-styles-wrapper .${elementId} .text-content svg path`,
                    'properties': [
                        {
                            'name': 'stroke-width',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
    ];
};


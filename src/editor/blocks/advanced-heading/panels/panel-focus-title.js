import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, DimensionControl, TextStrokeControl, TypographyControl } from 'gutenverse-core/controls';

export const focusTitlePanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'focusColor',
            label: __('Focus Heading Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'focusColor',
                    'type': 'color',
                    'selector': `.editor-styles-wrapper .${elementId}.guten-advanced-heading .heading-focus`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'focusTypography',
            label: __('Focus Heading Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'focusTextStroke',
            label: __('Focus Text Stroke', 'gutenverse'),
            component: TextStrokeControl,
            liveStyle: [
                {
                    'id': 'focusTextStroke',
                    'type': 'textStroke',
                    'selector': `.editor-styles-wrapper .${elementId}.guten-advanced-heading .heading-focus`,
                }
            ]
        },
        {
            id: 'focusBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'focusBackground',
                    'type': 'background',
                    'responsive': true,
                    'selector': `.editor-styles-wrapper .${elementId}.guten-advanced-heading .heading-focus`,
                }
            ]
        },
        {
            id: 'focusMargin',
            label: __('Margin', 'gutenverse'),
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
        {
            id: 'focusPadding',
            label: __('Padding', 'gutenverse'),
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
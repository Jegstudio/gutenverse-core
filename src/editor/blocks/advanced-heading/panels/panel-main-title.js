import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, DimensionControl, TextStrokeControl, TypographyControl } from 'gutenverse-core/controls';

export const mainTitlePanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'mainColor',
            label: __('Main Heading Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'mainColor',
                    'type': 'color',
                    'selector': `.editor-styles-wrapper .${elementId}.guten-advanced-heading .heading-title`,
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
            id: 'mainTypography',
            label: __('Main Heading Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'mainTextStroke',
            label: __('Main Text Stroke', 'gutenverse'),
            component: TextStrokeControl,
            liveStyle: [
                {
                    'id': 'mainTextStroke',
                    'type': 'textStroke',
                    'selector': `.editor-styles-wrapper .${elementId}.guten-advanced-heading .heading-title`,
                }
            ]
        },
        {
            id: 'mainBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'mainBackground',
                    'type': 'background',
                    'responsive': true,
                    'selector': `.editor-styles-wrapper .${elementId}.guten-advanced-heading .heading-title`,
                }
            ]
        },
        {
            id: 'mainMargin',
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
            id: 'mainPadding',
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
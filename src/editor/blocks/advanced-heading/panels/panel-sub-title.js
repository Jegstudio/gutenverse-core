import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, DimensionControl, TypographyControl } from 'gutenverse-core/controls';

export const subTitlePanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'subColor',
            label: __('Subtitle Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'subColor',
                    'type': 'color',
                    'selector': `.editor-styles-wrapper .${elementId}.guten-advanced-heading .heading-subtitle`,
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
            id: 'subTypography',
            label: __('Subtitle Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'subBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'subBackground',
                    'type': 'background',
                    'responsive': true,
                    'selector': `.editor-styles-wrapper .${elementId}.guten-advanced-heading .heading-subtitle`,
                }
            ]
        },
        {
            id: 'subMargin',
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
            id: 'subPadding',
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
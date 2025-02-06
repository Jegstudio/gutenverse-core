import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, DimensionControl, TextStrokeControl, TypographyControl } from 'gutenverse-core/controls';
import { handleBackground, handleColor, handleDimension, handleTextStroke, handleTypography } from 'gutenverse-core/styling';

export const mainTitlePanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'mainColor',
            label: __('Main Heading Color', 'gutenverse'),
            component: ColorControl,
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
        },
        {
            id: 'mainBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
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
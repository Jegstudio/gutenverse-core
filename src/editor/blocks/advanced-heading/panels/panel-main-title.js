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
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-title`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'mainTypography',
            label: __('Main Heading Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-title`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'mainTextStroke',
            label: __('Main Text Stroke', 'gutenverse'),
            component: TextStrokeControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-title`,
                    hasChild: true,
                    render: value => handleTextStroke(value)
                }
            ]
        },
        {
            id: 'mainBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-title`,
                    hasChild: true,
                    render: value => handleBackground(value)
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
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-title`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
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
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-title`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
    ];
};
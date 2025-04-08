import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, DimensionControl, TextStrokeControl, TypographyControl } from 'gutenverse-core/controls';
import { handleBackground, handleColor, handleDimension, handleTextStroke, handleTypography } from 'gutenverse-core/styling';

export const focusTitlePanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'focusColor',
            label: __('Focus Heading Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-focus`,
                    render: value => handleColor(value, 'color')
                },
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-focus`,
                    render: value => handleColor(value, '-webkit-text-fill-color')
                }
            ]
        },
        {
            id: 'focusTypography',
            label: __('Focus Heading Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-focus`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'focusTextStroke',
            label: __('Focus Text Stroke', 'gutenverse'),
            component: TextStrokeControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-focus`,
                    hasChild: true,
                    render: value => handleTextStroke(value)
                }
            ]
        },
        {
            id: 'focusBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-focus`,
                    hasChild: true,
                    render: value => handleBackground(value)
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
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-focus`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
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
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-focus`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
    ];
};
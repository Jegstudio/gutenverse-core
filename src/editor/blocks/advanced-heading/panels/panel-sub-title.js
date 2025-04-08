import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, DimensionControl, TypographyControl } from 'gutenverse-core/controls';
import { handleBackground, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const subTitlePanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'subColor',
            label: __('Subtitle Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-subtitle`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'subTypography',
            label: __('Subtitle Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-subtitle`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'subBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-subtitle`,
                    hasChild: true,
                    render: value => handleBackground(value)
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
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-subtitle`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
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
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .heading-subtitle`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
    ];
};
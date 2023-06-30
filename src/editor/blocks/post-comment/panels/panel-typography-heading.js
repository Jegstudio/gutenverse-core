import { __ } from '@wordpress/i18n';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/controls';
import { ColorControl, DimensionControl, TypographyControl } from 'gutenverse-core/controls';

export const headingTypographyPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'typographyHeading',
            label: __('Heading Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'colorHeading',
            label: __('Heading Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'marginHeading',
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
                    selector: `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6, .${elementId} .comment-reply-title`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
    ];
};


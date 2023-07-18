import { __ } from '@wordpress/i18n';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';
import { ColorControl, DimensionControl, TypographyControl } from 'gutenverse-core/controls';

export const linkTypographyPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'typographyLink',
            label: __('Link Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} a`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'colorLink',
            label: __('Link Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'marginLink',
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
                    selector: `.${elementId} a`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
    ];
};


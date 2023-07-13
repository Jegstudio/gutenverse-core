import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, TypographyControl } from 'gutenverse-core-editor/controls';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const excerptPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'excerptMargin',
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
            },
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-post-excerpt`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'excerptColor',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-post-excerpt p`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'excerptTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-post-excerpt p`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
    ];
};
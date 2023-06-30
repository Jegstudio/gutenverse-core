import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/controls';

export const titlePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'titleMargin',
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
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-post-title`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: '__styleHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({__styleHover}) => setSwitcher({...switcher, styleHover: __styleHover})
        },
        {
            id: 'titleColor',
            show: !switcher.styleHover || switcher.styleHover === 'normal',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-post-title a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'titleTypography',
            show: !switcher.styleHover || switcher.styleHover === 'normal',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-post-title a`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'titleColorHover',
            show: switcher.styleHover === 'hover',
            label: __('Hover Text color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post:hover .guten-postblock-content .guten-post-title a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'titleTypographyHover',
            show: switcher.styleHover === 'hover',
            label: __('Hover Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post:hover .guten-postblock-content .guten-post-title a`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
    ];
};
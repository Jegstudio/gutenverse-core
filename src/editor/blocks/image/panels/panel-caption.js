import { __ } from '@wordpress/i18n';
import { handleColor, handleTypography } from 'gutenverse-core/styling';
import { ColorControl, RangeControl, SelectControl, TextControl, TypographyControl } from 'gutenverse-core/controls';

export const captionPanel = (props) => {
    const {
        elementId,
        captionType
    } = props;

    return [
        {
            id: 'captionType',
            label: __('Show Caption', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'None',
                    value: 'none'
                },
                {
                    label: 'Caption from Image',
                    value: 'original'
                },
                {
                    label: 'Custom Caption',
                    value: 'custom'
                },
            ]
        },
        {
            id: 'captionCustom',
            show: captionType === 'custom',
            label: __('Custom Caption', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'captionSpace',
            label: __('Caption Space', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .guten-caption`,
                    render: value => `margin-top: ${value}px;`
                }
            ]
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-caption`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'captionColor',
            label: __('Caption Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-caption`,
                    render: (value) => handleColor(value, 'color')
                }
            ],
        },
    ];
};


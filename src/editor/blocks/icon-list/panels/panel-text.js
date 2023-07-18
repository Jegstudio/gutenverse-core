import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, TypographyControl } from 'gutenverse-core/controls';
import { handleColor, handleTypography } from 'gutenverse-core/styling';

export const panelText = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'textColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-icon-list-item .list-text`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'textColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-icon-list-item:hover .list-text`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'textIndent',
            label: __('Text Indent', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max : 50,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-icon-list-item .list-text, .block-editor-block-list__layout .wp-block.${elementId} .guten-icon-list-item .list-text`,
                    render: value => `padding-left: ${value}px;`
                }
            ]
        },
        {
            id: 'textTypography',
            label: __('Text Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-icon-list-item .list-text`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
    ];
};


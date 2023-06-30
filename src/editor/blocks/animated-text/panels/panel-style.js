import { __ } from '@wordpress/i18n';
import { handleColor, handleTypography } from 'gutenverse-core/controls';
import { ColorControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';
import { allowRenderTextShadow, handleTextShadow } from 'gutenverse-core/controls';

export const stylePanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'color',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} *`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} *`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'textShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} *`,
                    allowRender: (value) => allowRenderTextShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        }
    ];
};


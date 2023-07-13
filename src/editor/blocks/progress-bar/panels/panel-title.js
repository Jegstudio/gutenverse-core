
import { __ } from '@wordpress/i18n';
import { ColorControl, TextShadowControl, TypographyControl } from 'gutenverse-core-editor/controls';
import { handleColor, handleTypography } from 'gutenverse-core/styling';
import { handleTextShadow } from 'gutenverse-core/styling';

export const titlePanel = ({elementId, ...props}) => {
    return [
        {
            id: 'titleColor',
            label: __('Title color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .skill-bar-content .skill-title`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .skill-bar-content .skill-title`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'titleTextShadow',
            label: __('Title Shadow', 'gutenverse'),
            component: TextShadowControl,
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .skill-bar-content .skill-title`,
                    allowRender: (value) => allowRenderTextShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        }
    ];
};
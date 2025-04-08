
import { __ } from '@wordpress/i18n';
import { ColorControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';
import { allowRenderTextShadow, handleColor, handleTypography } from 'gutenverse-core/styling';
import { handleTextShadow } from 'gutenverse-core/styling';

export const percentPanel = ({elementId, ...props}) => {
    return [
        {
            id: 'percentBgColor',
            label: __('Percent Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .progress-group[class*="tooltip-"] .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper,
                    .${elementId} .progress-group.ribbon .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper,
                    .${elementId} .progress-group[class*="tooltip-"]:not(.tooltip-style) .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper:before`,
                    render: value => handleColor(value, 'background-color')
                },
                {
                    selector: `.${elementId} .progress-group.tooltip-style .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper:before`,
                    render: value => handleColor(value, 'color')
                },
                {
                    selector: `.${elementId} .progress-group.ribbon .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper:before`,
                    render: value => `${handleColor(value, 'border-right-color')}${handleColor(value, 'border-bottom-color')}`
                }
            ]
        },
        {
            id: 'percentColor',
            label: __('Percent Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .number-percentage, .${elementId} .progress-group .number-percentage`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'percentTypography',
            label: __('Percent Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .number-percentage, .${elementId} .progress-group .number-percentage`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'percentTextShadow',
            label: __('Percent Shadow', 'gutenverse'),
            component: TextShadowControl,
            style: [
                {
                    selector: `.${elementId} .progress-group .progress-skill-bar .number-percentage, .${elementId} .progress-group .number-percentage`,
                    allowRender: (value) => allowRenderTextShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        }
    ];
};
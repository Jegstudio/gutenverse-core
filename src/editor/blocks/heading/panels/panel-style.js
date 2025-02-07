/* WordPress dependencies */
import { __ } from '@wordpress/i18n';

/* Gutenverse dependencies */
import { handleColor, handleTypography, allowRenderTextShadow, handleTextShadow, handleTextStroke } from 'gutenverse-core/styling';
import { ColorControl, TextShadowControl, TextStrokeControl, TypographyControl, SelectControl, HeadingControl, SwitchControl  } from 'gutenverse-core/controls';

export const stylePanel = (props) => {
    const {
        elementId,
        containsAnchorTag,
        switcher,
        setSwitcher
    } = props;
    return [
        {
            id: 'color',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
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
                    selector: `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
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
                    selector: `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
                    allowRender: (value) => allowRenderTextShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        },
        {
            id: 'textStroke',
            label: __('Text Stroke', 'gutenverse'),
            component: TextStrokeControl,
            style: [
                {
                    selector: `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
                    hasChild: true,
                    render: value => handleTextStroke(value)
                }
            ]
        },
        {
            id: 'overflowWrap',
            label: __('Text Overflow Wrap', 'gutenverse'),
            description: __('If a word is longer than the container, choose whether to break it into a new line or not.', 'gutenverse'),
            allowDeviceControl: true,
            component: SelectControl,
            options: [
                {
                    label: __('Break Word', 'gutenverse'),
                    value: 'break-word'
                },
                {
                    label: __('Normal', 'gutenverse'),
                    value: 'normal'
                },
            ],
            style: [
                {
                    selector: `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
                    render: (value) => `overflow-wrap: ${value}; word-break:${value};`
                },
            ]
        },
        {
            id: 'linkHeader',
            component: HeadingControl,
            label: __('Link', 'gutenverse'),
            show: containsAnchorTag,
        },
        {
            id: '__linkHover',
            component: SwitchControl,
            show: containsAnchorTag,
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
            onChange: ({ __linkHover }) => setSwitcher({ ...switcher, state: __linkHover })
        },
        {
            id: 'linkColor',
            label: __('Link Color', 'gutenverse'),
            component: ColorControl,
            show: (!switcher.state || switcher.state === 'normal') && containsAnchorTag,
            style: [
                {
                    selector: `.${elementId} a`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'linkTypography',
            label: __('Link Typography', 'gutenverse'),
            component: TypographyControl,
            show: (!switcher.state || switcher.state === 'normal') && containsAnchorTag,
            style: [
                {
                    selector: `.${elementId} a`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'linkColorHover',
            label: __('Link Color Hover', 'gutenverse'),
            component: ColorControl,
            show: (switcher.state === 'hover') && containsAnchorTag,
            style: [
                {
                    selector: `.${elementId} a:hover`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'linkTypographyHover',
            label: __('Link Typography Hover', 'gutenverse'),
            component: TypographyControl,
            show: (switcher.state === 'hover') && containsAnchorTag,
            style: [
                {
                    selector: `.${elementId} a:hover`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
    ];
};


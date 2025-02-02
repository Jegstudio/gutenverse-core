/* WordPress dependencies */
import { __ } from '@wordpress/i18n';

/* Gutenverse dependencies */
import { handleColor, handleTypography, allowRenderTextShadow, handleTextShadow, handleTextStroke } from 'gutenverse-core/styling';
import { ColorControl, TextShadowControl, TextStrokeControl, TypographyControl, SelectControl, CheckboxControl } from 'gutenverse-core/controls';

export const stylePanel = (props) => {
    const {
        elementId,
        overflowWrap,
        useStyleInLink = false,
    } = props;

    const linkStyle = useStyleInLink ? `
        , .guten-element.${elementId} a:not(.guten-text-highlight a), 
        .guten-element.${elementId} a:not(.guten-text-highlight a) *, 
        .guten-element.${elementId} a:hover:not(.guten-text-highlight a), 
        .guten-element.${elementId} a:hover:not(.guten-text-highlight a) *` : '';

    return [
        {
            id: 'color',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId} ${linkStyle}`,
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
                    selector: `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId} ${linkStyle}`,
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
                    selector: `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId} ${linkStyle}`,
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
                    selector: `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId} ${linkStyle}`,
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
                    selector: `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId} ${linkStyle}`,
                    render: (value) => `overflow-wrap: ${value}; word-break:${value};`
                },
            ]
        },
        {
            id: 'useStyleInLink',
            label: __('Use Style in Link', 'gutenverse'),
            description: __('Applies heading block styling to links within text, overriding the default core link style.', 'gutenverse'),
            component: CheckboxControl,
        },
    ];
};


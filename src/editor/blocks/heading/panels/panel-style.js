/* WordPress dependencies */
import { __ } from '@wordpress/i18n';

/* Gutenverse dependencies */
import { ColorControl, TextShadowControl, TextStrokeControl, TypographyControl, SelectControl, CheckboxControl } from 'gutenverse-core/controls';

export const stylePanel = () => {

    return [
        {
            id: 'color',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'textShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
        },
        {
            id: 'textStroke',
            label: __('Text Stroke', 'gutenverse'),
            component: TextStrokeControl,
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
        },
        {
            id: 'useStyleInLink',
            label: __('Use Style in Link', 'gutenverse'),
            description: __('Applies heading block styling to links within text, overriding the default core link style.', 'gutenverse'),
            component: CheckboxControl,
        },
    ];
};
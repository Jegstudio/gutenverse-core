import { __ } from '@wordpress/i18n';
import { ColorControl, TextShadowControl, TextStrokeControl, TypographyControl } from 'gutenverse-core/controls';

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
        }
    ];
};


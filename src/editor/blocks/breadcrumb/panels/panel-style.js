import { ColorControl, RangeControl, TypographyControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';

export const stylePanel = () => {
    return [
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'linkColor',
            label: __('Link Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'linkColorHover',
            label: __('Link Color Hover', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'lastTextColor',
            label: __('Last Text Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'arrowColor',
            component: ColorControl,
            label: __('Arrow Color', 'gutenverse-news'),
        },
        {
            id: 'gap',
            label: __('Gap', 'gutenverse-news'),
            description: __('Value between arrow and text', 'gutenverse-news'),
            component: RangeControl,
            min: 1,
            max: 100,
            unit: 'px',
            step: 1,
        },
    ];
};
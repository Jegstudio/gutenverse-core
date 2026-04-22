import { __ } from '@wordpress/i18n';
import { SelectControl } from 'gutenverse-core/controls';

export const additionalPanel = () => {
    return [
        {
            id: 'htmlTag',
            label: __('HTML Tag', '--gctd--'),
            component: SelectControl,
            options: [
                {
                    label: __('div', '--gctd--'),
                    value: 'div'
                },
                {
                    label: __('header', '--gctd--'),
                    value: 'header'
                },
                {
                    label: __('footer', '--gctd--'),
                    value: 'footer'
                },
                {
                    label: __('main', '--gctd--'),
                    value: 'main'
                },
                {
                    label: __('article', '--gctd--'),
                    value: 'article'
                },
                {
                    label: __('section', '--gctd--'),
                    value: 'section'
                },
                {
                    label: __('aside', '--gctd--'),
                    value: 'aside'
                },
                {
                    label: __('nav', '--gctd--'),
                    value: 'nav'
                },
            ]
        }
    ];
};

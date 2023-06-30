import { __ } from '@wordpress/i18n';
import { ImageControl, RepeaterControl, TextControl } from 'gutenverse-core/controls';

export const logosPanel = () => {
    return [
        {
            id: 'logos',
            label: __('Client Logos', 'gutenverse'),
            component: RepeaterControl,
            titleFormat: '<strong><%= value.title%></strong>',
            options: [
                {
                    id: 'title',
                    label: __('Title', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'src',
                    label: __('Client Logo', 'gutenverse'),
                    component: ImageControl,
                },
                {
                    id: 'hoverSrc',
                    label: __('Hover Logo', 'gutenverse'),
                    component: ImageControl,
                },
            ],
        },
    ];
};
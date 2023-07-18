import { __ } from '@wordpress/i18n';
import { ImageControl, RepeaterControl, TextareaControl, TextControl } from 'gutenverse-core/controls';

export const itemPanel = () => {
    return [
        {
            id: 'testimonialData',
            label: __('Testimonial List', 'gutenverse'),
            component: RepeaterControl,
            titleFormat: '<strong><%= value.name%></strong>',
            options: [
                {
                    id: 'name',
                    label: __('Name', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'src',
                    label: __('Profile Picture', 'gutenverse'),
                    component: ImageControl,
                },
                {
                    id: 'description',
                    label: __('Description', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'comment',
                    label: __('Comment', 'gutenverse'),
                    component: TextareaControl,
                }
            ],
        },
    ];
};
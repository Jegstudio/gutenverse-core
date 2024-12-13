import { __ } from '@wordpress/i18n';
import { CheckboxControl, ImageControl, RepeaterControl, TextControl } from 'gutenverse-core/controls';

export const galleryPanel = (props) => {
    return [
        {
            id: 'images',
            component: RepeaterControl,
            titleFormat: '<strong><%= value.title ? value.title : "Gallery Item" %></strong>',
            repeaterDefault: {
                id: '',
                current: false
            },
            options: [
                {
                    id: 'src',
                    label: __('Image', 'gutenverse'),
                    component: ImageControl,
                },
                {
                    id: 'title',
                    label: __('Title', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'subtitle',
                    label: __('Sub Title', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'link',
                    show: value => !value.disableLink,
                    label: __('Link', 'gutenverse'),
                    component: TextControl
                },
                {
                    id: 'current',
                    label: __('Set as Current Item', 'gutenverse'),
                    component: CheckboxControl,
                },
            ],
        },
    ];
};
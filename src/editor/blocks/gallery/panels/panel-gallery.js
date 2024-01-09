import { __ } from '@wordpress/i18n';
import { CheckboxControl, ImageControl, RangeControl, RepeaterControl, TextareaControl, TextControl } from 'gutenverse-core/controls';

export const galleryPanel = () => {
    return [
        {
            id: 'images',
            component: RepeaterControl,
            titleFormat: '<strong><%= value.id%></strong>',
            options: [
                {
                    id: 'id',
                    label: __('Control Name', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'src',
                    label: __('Image', 'gutenverse'),
                    component: ImageControl,
                },
                {
                    id: 'lazyLoad',
                    label: __('Set Lazy Load', 'gutenverse'),
                    component: CheckboxControl,
                },
                {
                    id: 'title',
                    label: __('Title', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'content',
                    label: __('Content', 'gutenverse'),
                    component: TextareaControl,
                },
                {
                    id: 'showPrice',
                    label: __('Enable Price', 'gutenverse'),
                    component: CheckboxControl
                },
                {
                    id: 'price',
                    show: value => value.showPrice,
                    label: __('Price Value', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'showRating',
                    label: __('Enable Rating', 'gutenverse'),
                    component: CheckboxControl
                },
                {
                    id: 'ratingNumber',
                    show: value => value.showRating,
                    label: __('Rating', 'gutenverse'),
                    component: RangeControl,
                    min: 0,
                    max: 5,
                    step: 0.5,
                },
                {
                    id: 'showCategory',
                    label: __('Enable Category', 'gutenverse'),
                    component: CheckboxControl
                },
                {
                    id: 'category',
                    show: value => value.showCategory,
                    label: __('Category', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'disableLightbox',
                    label: __('Disable Lightbox', 'gutenverse'),
                    component: CheckboxControl
                },
                {
                    id: 'disableLink',
                    label: __('Disable Link', 'gutenverse'),
                    component: CheckboxControl
                },
                {
                    id: 'link',
                    show: value => !value.disableLink,
                    label: __('Link', 'gutenverse'),
                    component: TextControl
                }
            ],
        },
    ];
};
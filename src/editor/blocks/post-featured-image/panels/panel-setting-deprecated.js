/* WordPress dependencies */
import { __ } from '@wordpress/i18n';

/* Gutenverse dependencies */
import { SelectControl, TextControl } from 'gutenverse-core-editor/controls';

export const settingPanelDeprecated = (props) => {
    const {
        linkTo
    } = props;

    return [
        {
            id: 'postId',
            label: __('Post ID', 'gutenverse'),
            description: __('Keep this empty to fetch post data from default loop.', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'noContentText',
            label: __('No Content Text', 'gutenverse'),
            description: __('Text to show if there is no content. You can leave this empty', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'linkTo',
            label: __('Link To', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('None'),
                    value: 'none'
                },
                {
                    label: __('Home URL'),
                    value: 'home'
                },
                {
                    label: __('Post URL'),
                    value: 'post'
                },
                {
                    label: __('Image URL'),
                    value: 'media'
                },
                {
                    label: __('Custom URL'),
                    value: 'custom'
                }
            ],
        },
        {
            id: 'customURL',
            show: linkTo === 'custom',
            label: __('Custom URL', 'gutenverse'),
            component: TextControl,
        },
    ];
};
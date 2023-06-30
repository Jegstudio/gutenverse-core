/* WordPress dependencies */
import { __ } from '@wordpress/i18n';

/* Gutenverse dependencies */
import { TextControl } from 'gutenverse-core/controls';

export const settingPanelDeprecated = () => {
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
    ];
};
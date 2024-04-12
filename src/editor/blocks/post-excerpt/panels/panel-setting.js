import { __ } from '@wordpress/i18n';
import { CheckboxControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const settingPanel = () => {
    return [
        {
            id: 'showReadmore',
            label: __('Show Readmore', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'readmoreText',
            label: __('Readmore Text', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'htmlTag',
            label: __('Excerpt Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('P'),
                    value: 'p'
                },
            ],
        },
        {
            id: 'noContentText',
            label: __('No Content Text', 'gutenverse'),
            description: __('Text to show if there is no content. You can leave this empty', 'gutenverse'),
            component: TextControl,
        },
    ];
};
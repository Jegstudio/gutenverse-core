import { __ } from '@wordpress/i18n';
import { CheckboxControl } from 'gutenverse-core/controls';

export const settingPanel = () => {
    return [
        {
            id: 'inheritLayout',
            label: __('Inherit Theme Layout', 'gutenverse'),
            description: __('The Post Content\'s width will inherit your theme layout content size.', 'gutenverse'),
            component: CheckboxControl,
        },
    ];
};
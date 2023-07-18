import { __ } from '@wordpress/i18n';
import { IDGeneratorControl } from 'gutenverse-core/controls';

export const IDPanel = () => {
    return [
        {
            id: 'elementId',
            label: __('Block Element ID', 'gutenverse'),
            description: __('This is the block\'s ID. Click Generate to create a new ID.'),
            component: IDGeneratorControl,
        },
    ];
};
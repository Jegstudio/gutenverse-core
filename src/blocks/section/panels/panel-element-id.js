import { __ } from '@wordpress/i18n';
import { ChildIDGeneratorControl, IDGeneratorControl } from 'gutenverse-core/controls';

export const IDPanel = () => {
    return [
        {
            id: 'elementId',
            label: __('Block ID', '--gctd--'),
            description: __('This is the block\'s ID. Click Generate to create a new ID.', '--gctd--'),
            component: IDGeneratorControl,
        },
        {
            id: '_childElementId',
            label: __('Child Blocks IDs', '--gctd--'),
            description: __('This will automatically regenerate all Block IDs inside this section.', '--gctd--'),
            component: ChildIDGeneratorControl,
        },
    ];
};
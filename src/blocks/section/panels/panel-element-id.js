import { __ } from '@wordpress/i18n';
import { ChildIDGeneratorControl, IDGeneratorControl } from 'gutenverse-core-editor/controls';

export const IDPanel = () => {
    return [
        {
            id: 'elementId',
            label: __('Block ID', 'gutenverse'),
            description: __('This is the block\'s ID. Click Generate to create a new ID.'),
            component: IDGeneratorControl,
        },
        {
            id: '_childElementId',
            label: __('Child Blocks IDs', 'gutenverse'),
            description: __('This will automatically regenerate all Block IDs inside this section.'),
            component: ChildIDGeneratorControl,
        },
    ];
};
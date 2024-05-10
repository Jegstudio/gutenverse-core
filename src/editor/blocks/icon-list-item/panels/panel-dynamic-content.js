import { LockedDynamicContentControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

export const itemDynamicPanel = (props) => {
    return applyFilters(
        'gutenverse.dynamic-content-options',
        [{
            component: LockedDynamicContentControl,
        }],
        {
            ...props,
            blockType: 'icon'
        }
    );
};
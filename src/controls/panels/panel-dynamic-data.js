import { applyFilters } from '@wordpress/hooks';
import { LockedDynamicContentControl } from 'gutenverse-core/controls';

export const dynamicDataPanel = (props) => {
    return applyFilters(
        'gutenverse.dynamic-data-control',
        [{
            component: LockedDynamicContentControl,
        }],
        props
    );
};
import { applyFilters } from '@wordpress/hooks';
import { LockedChildStyleControl } from 'gutenverse-core/controls';

export const childStylePanel = (props) => {
    return applyFilters(
        'gutenverse.child-style-control',
        [{
            component: LockedChildStyleControl,
        }],
        props
    );
};

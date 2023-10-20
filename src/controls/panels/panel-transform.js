import { applyFilters } from '@wordpress/hooks';
import { LockedTransform } from 'gutenverse-core/controls';

export const transformPanel = (props) => {
    return applyFilters(
        'gutenverse.transform',
        [{
            component: LockedTransform,
        }],
        props
    );
};

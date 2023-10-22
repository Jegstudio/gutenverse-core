import { applyFilters } from '@wordpress/hooks';
import { LockedTransformControl } from 'gutenverse-core/controls';

export const transformPanel = (props) => {
    return applyFilters(
        'gutenverse.transform-options',
        [{
            component: LockedTransformControl,
        }],
        props
    );
};

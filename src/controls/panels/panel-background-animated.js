import { LockedProBackgroundControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

export const backgroundAnimatedPanel = (props) => {
    return applyFilters(
        'gutenverse.background-animated.options',
        [{
            component: LockedProBackgroundControl,
        }],
        props
    );
};
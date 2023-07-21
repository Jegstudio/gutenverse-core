import { applyFilters } from '@wordpress/hooks';
import { LockedProAnimationControl } from 'gutenverse-core/controls';

export const advanceAnimationPanel = (props) => {
    return applyFilters(
        'gutenverse.advance-animation',
        [{
            component: LockedProAnimationControl,
        }],
        props
    );
};

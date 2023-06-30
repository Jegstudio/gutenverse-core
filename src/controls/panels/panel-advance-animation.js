import { applyFilters } from '@wordpress/hooks';
import LockedAnimationControl from '../controls/locked/locked-animation-control';

export const advanceAnimationPanel = (props) => {
    return applyFilters(
        'gutenverse.advance-animation',
        [{
            component: LockedAnimationControl,
        }],
        props
    );
};

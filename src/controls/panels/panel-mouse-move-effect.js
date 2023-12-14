import { applyFilters } from '@wordpress/hooks';
import { LockedMouseMoveEffectControl } from 'gutenverse-core/controls';

export const mouseMoveEffectPanel = (props) => {
    return applyFilters(
        'gutenverse.mouse-move-effect-options',
        [{
            component: LockedMouseMoveEffectControl,
        }],
        props
    );
};

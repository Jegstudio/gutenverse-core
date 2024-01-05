import { applyFilters } from '@wordpress/hooks';
import { LockedProCursorEffectControl } from 'gutenverse-core/controls';

export const cursorEffectPanel = (props) => {
    return applyFilters(
        'gutenverse.cursor-effect-options',
        [{
            component: LockedProCursorEffectControl,
        }],
        props
    );
};

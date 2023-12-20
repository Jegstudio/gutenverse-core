import { applyFilters } from '@wordpress/hooks';
import { LockedProBackgroundEffectControl } from 'gutenverse-core/controls';

export const backgroundEffectPanel = (props) => {
    return applyFilters(
        'gutenverse.background-effect-options',
        [{
            component: LockedProBackgroundEffectControl,
        }],
        props
    );
};

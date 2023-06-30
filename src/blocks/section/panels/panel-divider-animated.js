import { LockedProDividerControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

export const dividerPanelAnimated = (props) => {
    return applyFilters(
        'gutenverse.section.divider-animated.options',
        [{
            component: LockedProDividerControl,
        }],
        props
    );
};
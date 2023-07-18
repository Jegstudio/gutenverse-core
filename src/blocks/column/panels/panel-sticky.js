import { LockedProStickyControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

export const stickyPanel = (props) => {
    const stickyOption = [
        {
            component: LockedProStickyControl,
        },
    ];

    return applyFilters(
        'gutenverse.column.sticky',
        stickyOption,
        props
    );
};
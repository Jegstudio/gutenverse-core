import { LockedProStickyControl } from 'gutenverse-core-editor/controls';
import { applyFilters } from '@wordpress/hooks';

export const stickyPanel = (props) => {
    const stickyOption = [
        {
            component: LockedProStickyControl,
        },
    ];

    return applyFilters(
        'gutenverse.section.sticky',
        stickyOption,
        props
    );
};
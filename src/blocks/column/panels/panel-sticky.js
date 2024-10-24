import { LockedProStickyControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

export const stickyPanel = (props) => {
    const stickyOption = [
        {
            component: LockedProStickyControl,
        },
    ];

    const stickyFilter = applyFilters(
        'gutenverse.column.sticky',
        stickyOption,
        props
    );

    if(stickyFilter?.result){
        return stickyFilter?.result;
    }

    return stickyFilter;
};
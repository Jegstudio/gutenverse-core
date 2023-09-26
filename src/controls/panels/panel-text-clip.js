import { applyFilters } from '@wordpress/hooks';
import { LockedProTextClip } from 'gutenverse-core/controls';

export const textClipPanel = (props) => {
    return applyFilters(
        'gutenverse.text-clip',
        [{
            component: LockedProTextClip,
        }],
        props
    );
};

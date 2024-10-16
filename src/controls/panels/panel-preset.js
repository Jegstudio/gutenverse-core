import { applyFilters } from '@wordpress/hooks';
import { LockedPresetControl } from 'gutenverse-core/controls';

export const presetPanel = (props) => {
    return applyFilters(
        'gutenverse.preset-blocks',
        [{
            component: LockedPresetControl,
        }],
        props
    );
};

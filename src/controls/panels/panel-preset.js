import { applyFilters } from '@wordpress/hooks';
import LockedPresetControl from '../controls/locked/locked-preset-control';

export const presetPanel = (props) => {
    return applyFilters(
        'gutenverse.preset-blocks',
        [{
            component: LockedPresetControl,
        }],
        props
    );
};

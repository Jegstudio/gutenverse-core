import { applyFilters } from '@wordpress/hooks';
import { LockedConditionControl } from 'gutenverse-core/controls';

export const conditionPanel = (props) => {
    return applyFilters(
        'gutenverse.conditions.control',
        [{
            component: LockedConditionControl,
        }],
        props
    );
};

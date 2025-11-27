import { applyFilters } from '@wordpress/hooks';
import { LockedTooltipControl } from 'gutenverse-core/controls';

export const tooltipPanel = (props) => {
    return applyFilters(
        'gutenverse.tooltip-options',
        [{
            component: LockedTooltipControl,
        }],
        props,
        ''
    );
};
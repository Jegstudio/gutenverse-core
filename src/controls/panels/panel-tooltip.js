import { applyFilters } from '@wordpress/hooks';
import { LockedTooltipControl } from 'gutenverse-core/controls';

export const tooltipPanel = (props) => {
    const result = applyFilters(
        'gutenverse.tooltip-options',
        [{
            component: LockedTooltipControl,
        }],
        props,
        ''
    );
    return result ? result : [];
};
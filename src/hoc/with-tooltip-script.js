import { applyFilters } from '@wordpress/hooks';

export const withTooltipScript = (wrapper = '') => (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.tooltip-script',
            <BlockElement {...props} />,
            { BlockElement, wrapper, props }
        );
    };
};
import { applyFilters } from '@wordpress/hooks';

export const withTooltip = (wrapper = '') => (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.tooltip',
            <BlockElement {...props} />,
            { BlockElement, wrapper, props }
        );
    };
};
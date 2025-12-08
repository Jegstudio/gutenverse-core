import { applyFilters } from '@wordpress/hooks';

export const withTooltipScript = (wrapper = '') => (BlockElement) => {
    return (props) => {
        const result = applyFilters(
            'gutenverse.hoc.tooltip-script',
            <BlockElement {...props} />,
            { BlockElement, wrapper, props }
        );
        return result ? result : <BlockElement {...props} />;
    };
};
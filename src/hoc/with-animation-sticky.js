import { applyFilters } from '@wordpress/hooks';

export const withAnimationSticky = () => (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.sticky-animation',
            <BlockElement {...props} />,
            { BlockElement, props }
        );
    };
};

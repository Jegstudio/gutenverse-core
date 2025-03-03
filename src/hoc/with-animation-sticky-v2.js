import { applyFilters } from '@wordpress/hooks';

export const withAnimationStickyV2 = () => (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.v2.sticky-animation',
            <BlockElement {...props} />,
            { BlockElement, props }
        );
    };
};

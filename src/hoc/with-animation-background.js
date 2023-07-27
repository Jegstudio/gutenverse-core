import { applyFilters } from '@wordpress/hooks';

export const withAnimationBackground = (blockType) => (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.background-animation',
            <BlockElement {...props} />,
            { BlockElement, blockType, props }
        );
    };
};

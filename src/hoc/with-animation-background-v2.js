import { applyFilters } from '@wordpress/hooks';

export const withAnimationBackgroundV2 = (blockType) => (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.v2.background-animation',
            <BlockElement {...props} />,
            { BlockElement, blockType, props }
        );
    };
};

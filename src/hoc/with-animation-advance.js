import { applyFilters } from '@wordpress/hooks';

export const withAnimationAdvance = (blockType) => (BlockElement) => {
    return applyFilters(
        'gutenverse.hoc.animation-advance',
        (props) => <BlockElement {...props} />,
        { BlockElement, blockType }
    );
};
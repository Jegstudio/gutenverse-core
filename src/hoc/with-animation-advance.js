import { applyFilters } from '@wordpress/hooks';

export const withAnimationAdvance = (blockType) => (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.advance-animation',
            <BlockElement {...props} />,
            { BlockElement, blockType, props }
        );
    };
};
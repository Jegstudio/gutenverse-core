import { applyFilters } from '@wordpress/hooks';

export const withAnimationAdvanceV2 = (blockType) => (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.v2.advance-animation',
            <BlockElement {...props} />,
            { BlockElement, blockType, props }
        );
    };
};
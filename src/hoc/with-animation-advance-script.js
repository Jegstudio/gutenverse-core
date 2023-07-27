import { applyFilters } from '@wordpress/hooks';

export const withAnimationAdvanceScript = (blockType) => (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.advance-animation-script',
            <BlockElement {...props} />,
            { BlockElement, blockType, props }
        );
    };
};

import { applyFilters } from '@wordpress/hooks';

export const withBackgroundEffect = (blockType) => (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.background-effect',
            <BlockElement {...props} />,
            { BlockElement, props, blockType }
        );
    };
};
import { applyFilters } from '@wordpress/hooks';

export const withCursorEffect = (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.cursor-effect',
            <BlockElement {...props} />,
            { BlockElement, props }
        );
    };
};

import { applyFilters } from '@wordpress/hooks';

export const withMouseMoveEffect = (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.mouse-move-effect',
            <BlockElement {...props} />,
            { BlockElement, props }
        );
    };
};

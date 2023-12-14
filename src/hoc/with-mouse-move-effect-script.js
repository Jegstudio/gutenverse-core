import { applyFilters } from '@wordpress/hooks';

export const withMouseMoveEffectScript = (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.mouse-move-effect-script',
            <BlockElement {...props} />,
            { BlockElement, props }
        );
    };
};
import { applyFilters } from '@wordpress/hooks';

export const withCursorEffectScript = (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.cursor-effect-script',
            <BlockElement {...props} />,
            { BlockElement, props }
        );
    };
};
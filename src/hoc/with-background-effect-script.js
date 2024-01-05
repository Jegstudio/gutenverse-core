import { applyFilters } from '@wordpress/hooks';

export const withBackgroundEffectScript = (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.background-effect-script',
            <BlockElement {...props} />,
            { BlockElement, props }
        );
    };
};
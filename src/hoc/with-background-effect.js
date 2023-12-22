import { applyFilters } from '@wordpress/hooks';

export const withBackgroundEffect = (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.background-effect',
            <BlockElement {...props} />,
            { BlockElement, props }
        );
    };
};
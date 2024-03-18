import { applyFilters } from '@wordpress/hooks';

export const withDinamicContent = (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.dinamic-content',
            <BlockElement {...props} />,
            { BlockElement, props }
        );
    };
};

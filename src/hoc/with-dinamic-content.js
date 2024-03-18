import { applyFilters } from '@wordpress/hooks';

export const withDinamicContent = (contentAttribute) =>  (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.dinamic-content',
            <BlockElement {...props} />,
            { BlockElement, props, contentAttribute }
        );
    };
};

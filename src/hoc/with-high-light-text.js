import { applyFilters } from '@wordpress/hooks';

export const withHighLightText = (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.high-light-text',
            <BlockElement {...props} />,
            { BlockElement, props }
        );
    };
};

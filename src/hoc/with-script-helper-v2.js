import { applyFilters } from '@wordpress/hooks';

export const withScriptHelperV2 = () => (BlockElement) => {
    return (props) => {
        return applyFilters(
            'gutenverse.hoc.v2.script-helper',
            <BlockElement {...props} />,
            { BlockElement, props }
        );
    };
};

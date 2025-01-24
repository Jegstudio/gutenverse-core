import { applyFilters } from '@wordpress/hooks';

export const withAnimationSticky = () => (BlockElement) => {
    return (props) => {
        const {attributes} = props;
        const {sticky} = attributes;
        let isActivated = false;
        Object.keys(attributes).forEach(key => {
            if(attributes[key]){
                isActivated = true;
            }
        });

        if(isActivated){
            return applyFilters(
                'gutenverse.hoc.sticky-animation',
                <BlockElement {...props} />,
                { BlockElement, props }
            );
        }else{
            return <BlockElement {...props} />
        }
    };
};

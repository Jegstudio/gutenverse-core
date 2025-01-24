import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';

export const withAnimationBackground = (blockType) => (BlockElement) => {
    return (props) => {
        const {attributes} = props;
        if(!isEmpty(attributes.backgroundAnimated)){
            return applyFilters(
                'gutenverse.hoc.background-animation',
                <BlockElement {...props} />,
                { BlockElement, blockType, props }
            );
        }else{
            return <BlockElement {...props} />
        }
    };
};

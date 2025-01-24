import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';

export const withAnimationAdvance = (blockType) => (BlockElement) => {
    return (props) => {
        const {attributes} = props;
        if(!isEmpty(attributes.advanceAnimation)){
            return applyFilters(
                'gutenverse.hoc.advance-animation',
                <BlockElement {...props} />,
                { BlockElement, blockType, props }
            );
        }else{
            return <BlockElement {...props} />
        }
    };
};
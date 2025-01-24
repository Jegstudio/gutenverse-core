import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';

export const withBackgroundEffect = (BlockElement) => {
    return (props) => {
        const {attributes} = props;
        if(!isEmpty(attributes.backgroundEffect)){
            return applyFilters(
                'gutenverse.hoc.background-effect',
                <BlockElement {...props} />,
                { BlockElement, props }
            );
        }else{
            return <BlockElement {...props} />
        }
    };
};
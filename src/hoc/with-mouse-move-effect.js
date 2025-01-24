import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';

export const withMouseMoveEffect = (BlockElement) => {
    return (props) => {
        const {attributes} = props;
        if(!isEmpty(attributes.mouseMoveEffect)){
            return applyFilters(
                'gutenverse.hoc.mouse-move-effect',
                <BlockElement {...props} />,
                { BlockElement, props }
            );
        }else{
            return <BlockElement {...props} />
        }
    };
};

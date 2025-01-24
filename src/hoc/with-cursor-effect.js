import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';


export const withCursorEffect = (BlockElement) => {
    return (props) => {
        const {attributes} = props;
        if(!isEmpty(attributes.cursorEffect)){
            return applyFilters(
                'gutenverse.hoc.cursor-effect',
                <BlockElement {...props} />,
                { BlockElement, props }
            );
        }else{
            return <BlockElement {...props} />
        }
    };
};

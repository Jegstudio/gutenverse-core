import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivMountain = (props) => {
    const {id, gradient, gradientColor} = props;
    return gradient && !isEmpty(gradientColor) ? <svg fill="none" height="208" className="guten-shape-fill" viewBox="0 0 1200 208" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d="m0 208 300-36 300-108 300 108 300-144v-28h-300-300-300-300z" fill={`url(#${id})`} fillRule="evenodd"/>
        {shapeDividerGradient(props)}
    </svg> : <svg fill="none" height="208" className="guten-shape-fill" viewBox="0 0 1200 208" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d="m0 208 300-36 300-108 300 108 300-144v-28h-300-300-300-300z" fill="#000" fillRule="evenodd"/>
    </svg>;
};
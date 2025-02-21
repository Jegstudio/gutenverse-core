import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivMountain = (props) => {
    const {id, gradient, gradientColor, invert} = props;
    const d = invert ? 'M 1200,180 900,36 600,144 300,36 0,0 h 1200 z'
        :'m0 208 300-36 300-108 300 108 300-144v-28h-300-300-300-300z';
    return gradient && !isEmpty(gradientColor) ? <svg fill="none" height="208" className="guten-shape-fill" viewBox="0 0 1200 208" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d={d} fill={`url(#${id})`} fillRule="evenodd"/>
        {shapeDividerGradient(props)}
    </svg> : <svg fill="none" height="208" className="guten-shape-fill" viewBox="0 0 1200 208" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d={d} fill="#000" fillRule="evenodd"/>
    </svg>;
};
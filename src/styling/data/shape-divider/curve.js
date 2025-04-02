import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivCurve = (props) => {
    const {id, gradient, gradientColor, invert} = props;
    const d = invert ? 'M 0,100 V 0 H 600 C 339.74,0 113.72,40.53 0,100 Z M 600,0 h 600 V 100 C 1086.28,40.53 860.26,0 600,0 Z'
        :'m1200 0c-113.72 59.47-339.74 100-600 100s-486.28-40.53-600-100z';
    return gradient && !isEmpty(gradientColor) ? <svg className="guten-shape-fill" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none" height="100" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d={d} fill={`url(#${id})`}/>
        {shapeDividerGradient(props)}
    </svg> : <svg className="guten-shape-fill" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none" height="100" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d={d} fill="#000"/>
    </svg>;
};
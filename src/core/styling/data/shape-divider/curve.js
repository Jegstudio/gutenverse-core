import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivCurve = (props) => {
    const {id, gradient, gradientColor} = props;
    return gradient && !isEmpty(gradientColor) ? <svg className="guten-shape-fill" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none" height="100" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d="m1200 0c-113.72 59.47-339.74 100-600 100s-486.28-40.53-600-100z" fill={`url(#${id})`}/>
        {shapeDividerGradient(props)}
    </svg> : <svg className="guten-shape-fill" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none" height="100" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d="m1200 0c-113.72 59.47-339.74 100-600 100s-486.28-40.53-600-100z" fill="#000"/>
    </svg>;
};
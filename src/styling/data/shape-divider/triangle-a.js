import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivTriangleA = (props) => {
    const {id, gradient, gradientColor, invert} = props;
    const d = invert ? 'M 0,100 V 0 H 376 Z M 376,0 h 824 v 100 z'
        : 'm376 100-376-100h1200z';
    return gradient && !isEmpty(gradientColor) ? <svg fill="none" height="100" className="guten-shape-fill" viewBox="0 0 1200 100" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d={d} fill={`url(#${id})`}/>
        {shapeDividerGradient(props)}
    </svg> : <svg fill="none" height="100" className="guten-shape-fill" viewBox="0 0 1200 100" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d={d} fill="#000"/>
    </svg>;
};
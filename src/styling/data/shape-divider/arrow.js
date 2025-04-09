import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivArrow = (props) => {
    const {id, gradient, gradientColor, invert} = props;
    const d = invert ? 'M 0,10 V 0 H 600 L 590,10 Z M 600,0 h 600 V 10 H 610 Z'
        :'m600 10-10-10h20z';
    return gradient && !isEmpty(gradientColor) ? <svg className="guten-shape-fill" viewBox="0 0 1200 10" preserveAspectRatio="none" fill="none" height="10" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d={d} fill={`url(#${id})`}/>
        {shapeDividerGradient(props)}
    </svg> : <svg className="guten-shape-fill" viewBox="0 0 1200 10" preserveAspectRatio="none" fill="none" height="10" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d={d} fill="#000"/>
    </svg>;
};
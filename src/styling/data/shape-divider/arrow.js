import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivArrow = (props) => {
    const {id, gradient, gradientColor} = props;
    return gradient && !isEmpty(gradientColor) ? <svg className="guten-shape-fill" viewBox="0 0 1200 10" preserveAspectRatio="none" fill="none" height="10" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d="m600 10-10-10h20z" fill={`url(#${id})`}/>
        {shapeDividerGradient(props)}
    </svg> : <svg className="guten-shape-fill" viewBox="0 0 1200 10" preserveAspectRatio="none" fill="none" height="10" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d="m600 10-10-10h20z" fill="#000"/>
    </svg>;
};
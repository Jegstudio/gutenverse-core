import { isEmpty } from 'lodash';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivTriangleN = (props) => {
    const {id, gradient, gradientColor} = props;
    return gradient && !isEmpty(gradientColor) ? <svg fill="none" height="100" className="guten-shape-fill" viewBox="0 0 1200 100" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d="m1200 0v100l-600-95-600 95v-100z" fill={`url(#${id})`}/>
        {shapeDividerGradient(props)}
    </svg> : <svg fill="none" height="100" className="guten-shape-fill" viewBox="0 0 1200 100" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d="m1200 0v100l-600-95-600 95v-100z" fill="#000"/>
    </svg>;
};
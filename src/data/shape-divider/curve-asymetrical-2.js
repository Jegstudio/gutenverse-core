import { isEmpty } from 'lodash';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivCurveA2 = (props) => {
    const {id, gradient, gradientColor} = props;
    return gradient && !isEmpty(gradientColor) ? <svg fill="none" height="86" className="guten-shape-fill" viewBox="0 0 1200 86" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d="m1200 0v16c-163.37 42.23-429.49 69.72-730 69.72-172.25 0-333.2-9-470-24.69v-61.03z" fill={`url(#${id})`}/>
        {shapeDividerGradient(props)}
    </svg> : <svg fill="none" height="86" className="guten-shape-fill" viewBox="0 0 1200 86" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d="m1200 0v16c-163.37 42.23-429.49 69.72-730 69.72-172.25 0-333.2-9-470-24.69v-61.03z" fill="#000"/>
    </svg>;
};
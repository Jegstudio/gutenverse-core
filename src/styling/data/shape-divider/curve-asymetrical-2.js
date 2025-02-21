import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivCurveA2 = (props) => {
    const {id, gradient, gradientColor, invert} = props;
    const d = invert ? 'M 1200,70 C 1036.63,27.77 770.51,0.279297 470,0.279297 297.75,0.279297 136.8,9.280703 0,24.970703 V 0 h 1200 z'
        :'m1200 0v16c-163.37 42.23-429.49 69.72-730 69.72-172.25 0-333.2-9-470-24.69v-61.03z';
    return gradient && !isEmpty(gradientColor) ? <svg fill="none" height="86" className="guten-shape-fill" viewBox="0 0 1200 86" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d={d} fill={`url(#${id})`}/>
        {shapeDividerGradient(props)}
    </svg> : <svg fill="none" height="86" className="guten-shape-fill" viewBox="0 0 1200 86" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d={d} fill="#000"/>
    </svg>;
};
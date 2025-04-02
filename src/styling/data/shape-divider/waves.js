import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivWaves = (props) => {
    const {id, gradient, gradientColor, invert} = props;
    const d = invert ? 'm 1167.0001,143 c -34,0 -100,-6.3e-4 -167,-27.97892 C 933.00001,87.042746 867,31.087613 800,10.103956 733.00001,-10.879706 667.00001,3.1082614 600,31.086478 532.99999,59.064801 467,101.03387 400,122.01753 c -67,20.98379 -133,20.98379 -200,0 C 133,101.03387 67,59.064422 33,38.080645 L 0,17.098123 V 0 h 1200 v 143 z'
        : 'm1200 20.0467h-33c-34 0-100 0-167 24.0561s-133 72.1682-200 90.2102-133 6.014-200-18.042c-67-24.0561-133-60.1402-200-78.1822-67-18.0421-133-18.0421-200 0-67 18.042-133 54.1261-167 72.1682l-33 18.042v-128.299h1200z';
    return gradient && !isEmpty(gradientColor) ? <svg fill="none" height="143" className="guten-shape-fill" viewBox="0 0 1200 143" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d={d} fillRule="evenodd" fill={`url(#${id})`}/>
        {shapeDividerGradient(props)}
    </svg> : <svg fill="none" height="143" className="guten-shape-fill" viewBox="0 0 1200 143" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d={d} fill="#000" fillRule="evenodd"/>
    </svg>;
};
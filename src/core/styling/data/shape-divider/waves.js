import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivWaves = (props) => {
    const {id, gradient, gradientColor} = props;
    return gradient && !isEmpty(gradientColor) ? <svg fill="none" height="143" className="guten-shape-fill" viewBox="0 0 1200 143" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d="m1200 20.0467h-33c-34 0-100 0-167 24.0561s-133 72.1682-200 90.2102-133 6.014-200-18.042c-67-24.0561-133-60.1402-200-78.1822-67-18.0421-133-18.0421-200 0-67 18.042-133 54.1261-167 72.1682l-33 18.042v-128.299h1200z" fillRule="evenodd" fill={`url(#${id})`}/>
        {shapeDividerGradient(props)}
    </svg> : <svg fill="none" height="143" className="guten-shape-fill" viewBox="0 0 1200 143" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d="m1200 20.0467h-33c-34 0-100 0-167 24.0561s-133 72.1682-200 90.2102-133 6.014-200-18.042c-67-24.0561-133-60.1402-200-78.1822-67-18.0421-133-18.0421-200 0-67 18.042-133 54.1261-167 72.1682l-33 18.042v-128.299h1200z" fill="#000" fillRule="evenodd"/>
    </svg>;
};
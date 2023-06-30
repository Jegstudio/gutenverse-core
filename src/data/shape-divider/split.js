import { isEmpty } from 'lodash';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivSplit = (props) => {
    const {id, gradient, gradientColor} = props;
    return gradient && !isEmpty(gradientColor) ? <svg fill="none" height="50" className="guten-shape-fill" viewBox="0 0 1200 50" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d="m650 0c-13.261 0-25.978 5.26784-35.355 14.6447-9.377 9.3768-14.645 22.0945-14.645 35.3553-.029-13.2418-5.31-25.9312-14.683-35.2843-9.374-9.35299-22.075-14.605732-35.317-14.6057v-.11z" fill={`url(#${id})`}/>
        {shapeDividerGradient(props)}
    </svg> : <svg fill="none" height="50" className="guten-shape-fill" viewBox="0 0 1200 50" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d="m650 0c-13.261 0-25.978 5.26784-35.355 14.6447-9.377 9.3768-14.645 22.0945-14.645 35.3553-.029-13.2418-5.31-25.9312-14.683-35.2843-9.374-9.35299-22.075-14.605732-35.317-14.6057v-.11z" fill="#000"/>
    </svg>;
};
import { isEmpty } from 'lodash';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivTilt = (props) => {
    const {id, gradient, gradientColor} = props;
    return gradient && !isEmpty(gradientColor) ? <svg width="1200" height="111" className="guten-shape-fill" preserveAspectRatio="none" viewBox="0 0 1200 111" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1200 0V5.61L0 110.59V0H1200Z" fill={`url(#${id})`}/>
        {shapeDividerGradient(props)}
    </svg> : <svg width="1200" height="111" className="guten-shape-fill" preserveAspectRatio="none" viewBox="0 0 1200 111" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1200 0V5.61L0 110.59V0H1200Z" fill="#000"/>
    </svg>;
};
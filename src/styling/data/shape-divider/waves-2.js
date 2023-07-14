import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivWaves2 = (props) => {
    const {id, gradient, gradientColor} = props;
    return gradient && !isEmpty(gradientColor) ? <svg fill="none" height="191" className="guten-shape-fill" viewBox="0 0 1200 191" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d="m1200 0h-1200v89l50 24c50 24 150 72 250 72 61.538 0 123.077-18.178 184.615-36.355 38.462-11.361 76.923-22.722 115.385-29.645 55.556-10 111.111-10.741 166.667-11.481 44.444-.593 88.889-1.186 133.333-6.519 100-12 200-48 250-66l50-18z" fill={`url(#${id})`}/>
        {shapeDividerGradient(props)}
    </svg> : <svg fill="none" height="191" className="guten-shape-fill" viewBox="0 0 1200 191" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d="m1200 0h-1200v89l50 24c50 24 150 72 250 72 61.538 0 123.077-18.178 184.615-36.355 38.462-11.361 76.923-22.722 115.385-29.645 55.556-10 111.111-10.741 166.667-11.481 44.444-.593 88.889-1.186 133.333-6.519 100-12 200-48 250-66l50-18z" fill="#000"/>
    </svg>;
};
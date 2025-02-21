import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivWaves2 = (props) => {
    const {id, gradient, gradientColor, invert = false} = props;

    const d = invert ? 'm 1200,174 -50,-18 C 1100,138 1000,102 900,90 855.556,84.667 811.11197,84.07347 766.66797,83.48047 711.11197,82.74047 655.556,82 600,72 561.538,65.077 523.07723,53.71647 484.61523,42.35547 423.07723,24.17847 361.538,6 300,6 200,6 100,54 50,78 L 0,102 V 0 h 1200 z'
        : 'm1200 0h-1200v89l50 24c50 24 150 72 250 72 61.538 0 123.077-18.178 184.615-36.355 38.462-11.361 76.923-22.722 115.385-29.645 55.556-10 111.111-10.741 166.667-11.481 44.444-.593 88.889-1.186 133.333-6.519 100-12 200-48 250-66l50-18z';
    return gradient && !isEmpty(gradientColor) ? <svg fill="none" height="191" className="guten-shape-fill" viewBox="0 0 1200 191" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d={d} fill={`url(#${id})`}/>
        {shapeDividerGradient(props)}
    </svg> : <svg fill="none" height="191" className="guten-shape-fill" viewBox="0 0 1200 191" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <path d={d} fill="#000"/>
    </svg>;
};
import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivTriangleNO = (props) => {
    const {id, gradient, gradientColor, gradientColor2, gradientAngle2, gradientColor3, gradientAngle3 } = props;
    return gradient ? <svg fill="none" height="100" className="guten-shape-fill" viewBox="0 0 1200 100" width="1200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000">
            <path d="m1200 0v100l-600-95-600 95v-100z" opacity=".25" fill={!isEmpty(gradientColor) ? `url(#${id})` : '#00000044'}/>
            <path d="m1200 0v80l-600-75-600 75v-80z" opacity=".5" fill={!isEmpty(gradientColor2) ? `url(#${id}-2)` : '#00000088'}/>
            <path d="m1200 0v60l-600-55-600 55v-60z" fill={!isEmpty(gradientColor3) ? `url(#${id}-3)` : '#000'}/>
        </g>
        {!isEmpty(gradientColor) && shapeDividerGradient(props)}
        {!isEmpty(gradientColor2) && shapeDividerGradient({id: `${id}-2`, gradientColor: gradientColor2, gradientAngle: gradientAngle2})}
        {!isEmpty(gradientColor3) && shapeDividerGradient({id: `${id}-3`, gradientColor: gradientColor3, gradientAngle: gradientAngle3})}
    </svg> : <svg fill="none" height="100" className="guten-shape-fill" viewBox="0 0 1200 100" width="1200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000">
            <path d="m1200 0v100l-600-95-600 95v-100z" opacity=".25"/>
            <path d="m1200 0v80l-600-75-600 75v-80z" opacity=".5"/>
            <path d="m1200 0v60l-600-55-600 55v-60z"/>
        </g>
    </svg>;
};
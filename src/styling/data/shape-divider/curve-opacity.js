import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivCurveO = (props) => {
    const {id, gradient, gradientColor, gradientColor2, gradientAngle2, gradientColor3, gradientAngle3 } = props;
    return gradient ? <svg fill="none" height="100" className="guten-shape-fill" viewBox="0 0 1200 100" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000">
            <path d="m1200 0c-113.72 59.47-339.74 100-600 100s-486.28-40.53-600-100z" opacity=".25" fill={!isEmpty(gradientColor) ? `url(#${id})` : '#00000044'}/>
            <path d="m1200 0c-113.72 47.576-339.74 80-600 80s-486.28-32.424-600-80z" opacity=".5" fill={!isEmpty(gradientColor2) ? `url(#${id}-2)` : '#00000088'}/>
            <path d="m1200 0c-113.72 35.682-339.74 60-600 60s-486.28-24.318-600-60z" fill={!isEmpty(gradientColor3) ? `url(#${id}-3)` : '#000'}/>
        </g>
        {!isEmpty(gradientColor) && shapeDividerGradient(props)}
        {!isEmpty(gradientColor2) && shapeDividerGradient({id: `${id}-2`, gradientColor: gradientColor2, gradientAngle: gradientAngle2})}
        {!isEmpty(gradientColor3) && shapeDividerGradient({id: `${id}-3`, gradientColor: gradientColor3, gradientAngle: gradientAngle3})}
    </svg> : <svg fill="none" height="100" className="guten-shape-fill" viewBox="0 0 1200 100" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000">
            <path d="m1200 0c-113.72 59.47-339.74 100-600 100s-486.28-40.53-600-100z" opacity=".25"/>
            <path d="m1200 0c-113.72 47.576-339.74 80-600 80s-486.28-32.424-600-80z" opacity=".5"/>
            <path d="m1200 0c-113.72 35.682-339.74 60-600 60s-486.28-24.318-600-60z"/>
        </g>
    </svg>;
};
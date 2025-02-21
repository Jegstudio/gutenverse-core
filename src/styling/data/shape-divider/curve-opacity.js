import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivCurveO = (props) => {
    const {id, gradient, gradientColor, gradientColor2, gradientAngle2, gradientColor3, gradientAngle3, invert } = props;
    const d1 = invert ? 'M 0,100 V 0 H 1200 V 100 C 1086.28,64.318 860.26,40 600,40 339.74,40 113.72,64.318 0,100 Z'
        :'m1200 0c-113.72 59.47-339.74 100-600 100s-486.28-40.53-600-100z';
    const d2 = invert ? 'M 0,100 V 0 H 1200 V 100 C 1086.28,52.424 860.26,20 600,20 339.74,20 113.72,52.424 0,100 Z'
        :'m1200 0c-113.72 47.576-339.74 80-600 80s-486.28-32.424-600-80z';
    const d3 = invert ? 'M 0,100 V 0 H 600 C 339.74,0 113.72,40.53 0,100 Z M 600,0 h 600 V 100 C 1086.28,40.53 860.26,0 600,0 Z'
        :'m1200 0c-113.72 35.682-339.74 60-600 60s-486.28-24.318-600-60z';
    return gradient ? <svg fill="none" height="100" className="guten-shape-fill" viewBox="0 0 1200 100" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000">
            <path d={d1} opacity=".25" fill={!isEmpty(gradientColor) ? `url(#${id})` : '#00000044'}/>
            <path d={d2} opacity=".5" fill={!isEmpty(gradientColor2) ? `url(#${id}-2)` : '#00000088'}/>
            <path d={d3} fill={!isEmpty(gradientColor3) ? `url(#${id}-3)` : '#000'}/>
        </g>
        {!isEmpty(gradientColor) && shapeDividerGradient(props)}
        {!isEmpty(gradientColor2) && shapeDividerGradient({id: `${id}-2`, gradientColor: gradientColor2, gradientAngle: gradientAngle2})}
        {!isEmpty(gradientColor3) && shapeDividerGradient({id: `${id}-3`, gradientColor: gradientColor3, gradientAngle: gradientAngle3})}
    </svg> : <svg fill="none" height="100" className="guten-shape-fill" viewBox="0 0 1200 100" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000">
            <path d={d1} opacity=".25"/>
            <path d={d2} opacity=".5"/>
            <path d={d3}/>
        </g>
    </svg>;
};
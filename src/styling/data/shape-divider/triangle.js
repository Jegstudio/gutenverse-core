import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivTriangle = (props) => {
    const {id, gradient, gradientColor, gradientColor2, gradientAngle2, gradientColor3, gradientAngle3 } = props;
    return gradient && !isEmpty(gradientColor) ? <svg fill="none" height="100" className="guten-shape-fill" preserveAspectRatio="none" viewBox="0 0 1200 100" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="m1200 40v-40h-1200v40h.39l600 60 600-60z" opacity=".25" fill={!isEmpty(gradientColor) ? `url(#${id})` : '#00000044'}/>
            <path d="m1200 20v-20h-1200v20h.39l600 80 600-80z" opacity=".5" fill={!isEmpty(gradientColor) ? `url(#${id}-2)` : '#00000088'}/>
            <path d="m600 100-600-100h1200z" fill={!isEmpty(gradientColor) ? `url(#${id}-3)` : '#000'}/>
        </g>
        {!isEmpty(gradientColor) && shapeDividerGradient(props)}
        {!isEmpty(gradientColor2) && shapeDividerGradient({id: `${id}-2`, gradientColor: gradientColor2, gradientAngle: gradientAngle2})}
        {!isEmpty(gradientColor3) && shapeDividerGradient({id: `${id}-3`, gradientColor: gradientColor3, gradientAngle: gradientAngle3})}
    </svg> : <svg fill="none" height="100" className="guten-shape-fill" preserveAspectRatio="none" viewBox="0 0 1200 100" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="m1200 40v-40h-1200v40h.39l600 60 600-60z" opacity=".25"/>
            <path d="m1200 20v-20h-1200v20h.39l600 80 600-80z" opacity=".5"/>
            <path d="m600 100-600-100h1200z"/>
        </g>
    </svg>;
};
import { isEmpty } from 'lodash';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivTriangleAO = (props) => {
    const {id, gradient, gradientColor, gradientColor2, gradientAngle2, gradientColor3, gradientAngle3 } = props;
    return gradient ? <svg fill="none" height="100" className="guten-shape-fill" viewBox="0 0 1200 100" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000">
            <path d="m1200 0h-1200v40l376 60 824-60z" opacity=".25" fill={!isEmpty(gradientColor) ? `url(#${id})` : '#00000044'}/>
            <path d="m1200 0h-1200v20l376 80 824-80z" opacity=".5" fill={!isEmpty(gradientColor2) ? `url(#${id}-2)` : '#00000088'}/>
            <path d="m376 100-376-100h1200z" fill={!isEmpty(gradientColor3) ? `url(#${id}-3)` : '#000'}/>
        </g>
        {!isEmpty(gradientColor) && shapeDividerGradient(props)}
        {!isEmpty(gradientColor2) && shapeDividerGradient({id: `${id}-2`, gradientColor: gradientColor2, gradientAngle: gradientAngle2})}
        {!isEmpty(gradientColor3) && shapeDividerGradient({id: `${id}-3`, gradientColor: gradientColor3, gradientAngle: gradientAngle3})}
    </svg> : <svg fill="none" height="100" className="guten-shape-fill" viewBox="0 0 1200 100" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000">
            <path d="m1200 0h-1200v40l376 60 824-60z" opacity=".25"/>
            <path d="m1200 0h-1200v20l376 80 824-80z" opacity=".5"/>
            <path d="m376 100-376-100h1200z"/>
        </g>
    </svg>;
};
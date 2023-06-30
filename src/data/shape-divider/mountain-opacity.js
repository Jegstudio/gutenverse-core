import { isEmpty } from 'lodash';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivMountainO = (props) => {
    const {id, gradient, gradientColor, gradientColor2, gradientAngle2, gradientColor3, gradientAngle3 } = props;
    return gradient ? <svg fill="none" height="258" className="guten-shape-fill" viewBox="0 0 1200 258" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="m0 258 301-43.5 299-150.5 309 149.5 291-185.5v-28h-1200z" opacity=".25" fill={!isEmpty(gradientColor) ? `url(#${id})` : '#00000044'}/>
            <path d="m0 238 300-43.5 300-130.5 304 130.5 296-166.5v-28h-1200z" opacity=".5" fill={!isEmpty(gradientColor2) ? `url(#${id}-2)` : '#00000088'}/>
            <path d="m0 208 300-36 300-108 300 108 300-144v-28h-300-300-300-300z" fill={!isEmpty(gradientColor3) ? `url(#${id}-3)` : '#000'}/>
        </g>
        {!isEmpty(gradientColor) && shapeDividerGradient(props)}
        {!isEmpty(gradientColor2) && shapeDividerGradient({id: `${id}-2`, gradientColor: gradientColor2, gradientAngle: gradientAngle2})}
        {!isEmpty(gradientColor3) && shapeDividerGradient({id: `${id}-3`, gradientColor: gradientColor3, gradientAngle: gradientAngle3})}
    </svg> : <svg fill="none" height="258" className="guten-shape-fill" viewBox="0 0 1200 258" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="m0 258 301-43.5 299-150.5 309 149.5 291-185.5v-28h-1200z" opacity=".25"/>
            <path d="m0 238 300-43.5 300-130.5 304 130.5 296-166.5v-28h-1200z" opacity=".5"/>
            <path d="m0 208 300-36 300-108 300 108 300-144v-28h-300-300-300-300z"/>
        </g>
    </svg>;
};
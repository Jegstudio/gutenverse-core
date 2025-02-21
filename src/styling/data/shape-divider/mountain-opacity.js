import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivMountainO = (props) => {
    const {id, gradient, gradientColor, gradientColor2, gradientAngle2, gradientColor3, gradientAngle3, invert } = props;
    const d1 = invert ? 'M 1200,230 900,86 600,194 300,86 0,50 V 0 h 1200 z'
        : 'm0 258 301-43.5 299-150.5 309 149.5 291-185.5v-28h-1200z';

    const d2 = invert ? 'M 1200,230 904,63.5 600,194 300,63.5 0,20 V 0 h 1200 z'
        : 'm0 238 300-43.5 300-130.5 304 130.5 296-166.5v-28h-1200z';

    const d3 = invert ? 'M 1200,230 909,44.5 600,194 301,43.5 0,0 h 1200 z'
        : 'm0 208 300-36 300-108 300 108 300-144v-28h-300-300-300-300z';
    return gradient ? <svg fill="none" height="258" className="guten-shape-fill" viewBox="0 0 1200 258" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000">
            <path d={d1} opacity=".25" fill={!isEmpty(gradientColor) ? `url(#${id})` : '#00000044'}/>
            <path d={d2} opacity=".5" fill={!isEmpty(gradientColor2) ? `url(#${id}-2)` : '#00000088'}/>
            <path d={d3} fill={!isEmpty(gradientColor3) ? `url(#${id}-3)` : '#000'}/>
        </g>
        {!isEmpty(gradientColor) && shapeDividerGradient(props)}
        {!isEmpty(gradientColor2) && shapeDividerGradient({id: `${id}-2`, gradientColor: gradientColor2, gradientAngle: gradientAngle2})}
        {!isEmpty(gradientColor3) && shapeDividerGradient({id: `${id}-3`, gradientColor: gradientColor3, gradientAngle: gradientAngle3})}
    </svg> : <svg fill="none" height="258" className="guten-shape-fill" viewBox="0 0 1200 258" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000">
            <path d={d1} opacity=".25"/>
            <path d={d2} opacity=".5"/>
            <path d={d3}/>
        </g>
    </svg>;
};
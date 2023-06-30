import { isEmpty } from 'lodash';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivTiltG = (props) => {
    const {id, gradient, gradientColor, gradientColor2, gradientAngle2, gradientColor3, gradientAngle3 } = props;
    return gradient ? <svg fill="none" height="231" className="guten-shape-fill" preserveAspectRatio="none" viewBox="0 0 1200 231" width="1200" xmlns="http://www.w3.org/2000/svg">
        <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="1200" y1="115.52" y2="115.52">
            <stop offset="0" stopColor="#fff"/><stop offset="1"/>
        </linearGradient>
        <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="0" x2="1200" y1="85.41" y2="85.41"><stop offset="0" stopColor="#ccc"/>
            <stop offset="1" stopColor="#fff"/>
        </linearGradient>
        <clipPath id="c"><path d="m0 0h1200v231h-1200z"/></clipPath>
        <g>
            <path d="m1200 0v126.06l-1200 104.99v-231.05z" fill={!isEmpty(gradientColor) ? `url(#${id})` : 'url(#a)'}/>
            <path d="m1200 0v65.84l-1200 104.98v-170.82z" fill={!isEmpty(gradientColor2) ? `url(#${id}-2)` : 'url(#b)'}/>
            <path d="m1200 0v5.61l-1200 104.98v-110.59z" fill={!isEmpty(gradientColor3) ? `url(#${id}-3)` : '#fff'}/>
        </g>
        {!isEmpty(gradientColor) && shapeDividerGradient(props)}
        {!isEmpty(gradientColor2) && shapeDividerGradient({id: `${id}-2`, gradientColor: gradientColor2, gradientAngle: gradientAngle2})}
        {!isEmpty(gradientColor3) && shapeDividerGradient({id: `${id}-3`, gradientColor: gradientColor3, gradientAngle: gradientAngle3})}
    </svg> : <svg fill="none" height="231" className="guten-shape-fill" preserveAspectRatio="none" viewBox="0 0 1200 231" width="1200" xmlns="http://www.w3.org/2000/svg">
        <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="1200" y1="115.52" y2="115.52">
            <stop offset="0" stopColor="#fff"/><stop offset="1"/>
        </linearGradient>
        <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="0" x2="1200" y1="85.41" y2="85.41"><stop offset="0" stopColor="#ccc"/>
            <stop offset="1" stopColor="#fff"/>
        </linearGradient>
        <clipPath id="c"><path d="m0 0h1200v231h-1200z"/></clipPath>
        <g>
            <path d="m1200 0v126.06l-1200 104.99v-231.05z" fill="url(#a)"/>
            <path d="m1200 0v65.84l-1200 104.98v-170.82z" fill="url(#b)"/>
            <path d="m1200 0v5.61l-1200 104.98v-110.59z" fill="#fff"/>
        </g>
    </svg>;
};
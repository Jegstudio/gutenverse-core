import { isEmpty } from 'lodash';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivWavesO2 = (props) => {
    const {id, gradient, gradientColor, gradientColor2, gradientAngle2, gradientColor3, gradientAngle3 } = props;
    return gradient ? <svg fill="none" height="191" className="guten-shape-fill" viewBox="0 0 1200 191" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="m0 127.22 50 11.275c50 11.274 150 33.824 250 45.099s200 11.275 300-11.275 200-67.649 300-82.6821 200 0 250 7.5166l50 7.5165v-104.67c-400 0-800 0-1200 0z" opacity=".25"  fill={!isEmpty(gradientColor) ? `url(#${id})` : '#00000044'}/>
            <path d="m0 111.885 50 13.986c50 13.986 150 41.957 250 55.942 100 13.986 200 13.986 300-13.985s200-83.9141 300-102.5616c100-18.6476 200 0 250 9.3237l50 9.3238v-83.9139c-400 0-800 0-1200 0z" opacity=".5" fill={!isEmpty(gradientColor2) ? `url(#${id}-2)` : '#00000088'}/>
            <path d="m0 89 50 18c50 18 150 54 250 72s200 18 300-18 200-108 300-132 200 0 250 12l50 12v-53c-400 0-800 0-1200 0z" fill={!isEmpty(gradientColor3) ? `url(#${id}-3)` : '#000'}/>
        </g>
        {!isEmpty(gradientColor) && shapeDividerGradient(props)}
        {!isEmpty(gradientColor2) && shapeDividerGradient({id: `${id}-2`, gradientColor: gradientColor2, gradientAngle: gradientAngle2})}
        {!isEmpty(gradientColor3) && shapeDividerGradient({id: `${id}-3`, gradientColor: gradientColor3, gradientAngle: gradientAngle3})}
    </svg> : <svg fill="none" height="191" className="guten-shape-fill" viewBox="0 0 1200 191" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="m0 127.22 50 11.275c50 11.274 150 33.824 250 45.099s200 11.275 300-11.275 200-67.649 300-82.6821 200 0 250 7.5166l50 7.5165v-104.67c-400 0-800 0-1200 0z" opacity=".25"/>
            <path d="m0 111.885 50 13.986c50 13.986 150 41.957 250 55.942 100 13.986 200 13.986 300-13.985s200-83.9141 300-102.5616c100-18.6476 200 0 250 9.3237l50 9.3238v-83.9139c-400 0-800 0-1200 0z" opacity=".5"/>
            <path d="m0 89 50 18c50 18 150 54 250 72s200 18 300-18 200-108 300-132 200 0 250 12l50 12v-53c-400 0-800 0-1200 0z"/>
        </g>
    </svg>;
};
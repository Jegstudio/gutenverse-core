import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivWavesO2 = (props) => {
    const {id, gradient, gradientColor, gradientColor2, gradientAngle2, gradientColor3, gradientAngle3, invert } = props;
    const d1 = invert ? 'M 992.22461,172.26953 C 962.50049,172.31348 931.25,169.5 900,162 800,138 700,66 600,30 500,-6 400,-6 300,12 200,30 100,66 50,83.999997 L 0,102 V 0 h 1200 v 138 l -50,12 c -34.375,8.25 -92.3823,22.17285 -157.77539,22.26953 z'
        : 'm0 127.22 50 11.275c50 11.274 150 33.824 250 45.099s200 11.275 300-11.275 200-67.649 300-82.6821 200 0 250 7.5166l50 7.5165v-104.67c-400 0-800 0-1200 0z';

    const d2 = invert ? 'M 974.21875,133.45508 C 950,132.72666 925,130.39628 900,125.73438 800,107.08688 700,51.14287 600,23.17188 500,-4.79912 400,-4.7985 300,9.1875 200,23.1725 100,51.14291 50,65.12891 L 0,79.11523 V 0 h 1200 v 107.08594 l -50,9.32422 c -37.5,6.99277 -103.125,19.23019 -175.78125,17.04492 z'
        : 'm0 111.885 50 13.986c50 13.986 150 41.957 250 55.942 100 13.986 200 13.986 300-13.985s200-83.9141 300-102.5616c100-18.6476 200 0 250 9.3237l50 9.3238v-83.9139c-400 0-800 0-1200 0z';

    const d3 = invert ? 'M 974.21875,107.58789 C 950,107.00066 925,105.12156 900,101.36328 800,86.330177 700,41.23164 600,18.68164 500,-3.86836 400,-3.86875 300,7.40625 200,18.68125 100,41.23186 50,52.50586 L 0,63.7793 V 0 h 1200 v 86.330077 l -50,7.51563 c -37.5,5.63745 -103.125,15.503873 -175.78125,13.742183 z'
        : 'm0 89 50 18c50 18 150 54 250 72s200 18 300-18 200-108 300-132 200 0 250 12l50 12v-53c-400 0-800 0-1200 0z';
    return gradient ? <svg fill="none" height="191" className="guten-shape-fill" viewBox="0 0 1200 191" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000">
            <path d={d1} opacity=".25"  fill={!isEmpty(gradientColor) ? `url(#${id})` : '#00000044'}/>
            <path d={d2} opacity=".5" fill={!isEmpty(gradientColor2) ? `url(#${id}-2)` : '#00000088'}/>
            <path d={d3} fill={!isEmpty(gradientColor3) ? `url(#${id}-3)` : '#000'}/>
        </g>
        {!isEmpty(gradientColor) && shapeDividerGradient(props)}
        {!isEmpty(gradientColor2) && shapeDividerGradient({id: `${id}-2`, gradientColor: gradientColor2, gradientAngle: gradientAngle2})}
        {!isEmpty(gradientColor3) && shapeDividerGradient({id: `${id}-3`, gradientColor: gradientColor3, gradientAngle: gradientAngle3})}
    </svg> : <svg fill="none" height="191" className="guten-shape-fill" viewBox="0 0 1200 191" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000">
            <path d={d1} opacity=".25"/>
            <path d={d2} opacity=".5"/>
            <path d={d3}/>
        </g>
    </svg>;
};
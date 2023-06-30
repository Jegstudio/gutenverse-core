import { isEmpty } from 'lodash';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivCurveA1 = (props) => {
    const {id, gradient, gradientColor, gradientColor2, gradientAngle2, gradientColor3, gradientAngle3 } = props;
    return gradient ? <svg fill="none" height="165" className="guten-shape-fill" viewBox="0 0 1200 165" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="m1200 0v16c-163.37 62.074-429.49 110-730 110-172.25 0-333.2-13.229-470-36.2919v-89.7081z" opacity=".25" fill={!isEmpty(gradientColor) ? `url(#${id})` : '#00000044'}/>
            <path d="m1200 0v16c-163.37 52.221-429.49 90-730 90-172.25 0-333.2-11.1293-470-30.5313v-75.4687z" opacity=".5" fill={!isEmpty(gradientColor2) ? `url(#${id}-2)` : '#00000088'}/>
            <path d="m1200 0v16c-163.37 42.23-429.49 69.72-730 69.72-172.25 0-333.2-9-470-24.69v-61.03z" fill={!isEmpty(gradientColor3) ? `url(#${id}-3)` : '#000'}/>
        </g>
        {!isEmpty(gradientColor) && shapeDividerGradient(props)}
        {!isEmpty(gradientColor2) && shapeDividerGradient({id: `${id}-2`, gradientColor: gradientColor2, gradientAngle: gradientAngle2})}
        {!isEmpty(gradientColor3) && shapeDividerGradient({id: `${id}-3`, gradientColor: gradientColor3, gradientAngle: gradientAngle3})}
    </svg> : <svg fill="none" height="165" className="guten-shape-fill" viewBox="0 0 1200 165" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000">
            <path d="m1200 0v16c-163.37 62.074-429.49 110-730 110-172.25 0-333.2-13.229-470-36.2919v-89.7081z" opacity=".25"/>
            <path d="m1200 0v16c-163.37 52.221-429.49 90-730 90-172.25 0-333.2-11.1293-470-30.5313v-75.4687z" opacity=".5"/>
            <path d="m1200 0v16c-163.37 42.23-429.49 69.72-730 69.72-172.25 0-333.2-9-470-24.69v-61.03z"/>
        </g>
    </svg>;
};
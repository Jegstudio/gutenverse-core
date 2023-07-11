import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivCurveN = (props) => {
    const {id, gradient, gradientColor, gradientColor2, gradientAngle2, gradientColor3, gradientAngle3 } = props;
    return gradient ? <svg fill="none" height="188" className="guten-shape-fill" viewBox="0 0 1200 188" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="m1200 0v27.1567c-13.33-.0847-26.7-.1271-40.1-.1271-555.19 0-1022.39 68.2793-1159.9 160.9704v-188z" opacity=".25" fill={!isEmpty(gradientColor) ? `url(#${id})` : '#00000044'}/>
            <path d="m1200 0v24.2677c-13.33-.0757-26.7-.1136-40.1-.1136-555.19 0-1022.39 61.0155-1159.9 143.8459v-168z" opacity=".5" fill={!isEmpty(gradientColor2) ? `url(#${id}-2)` : '#00000088'}/>
            <path d="m1200 0v21.37c-13.33-.0667-26.7-.1-40.1-.1-555.19 0-1022.39 53.73-1159.9 126.67v-147.94z" fill={!isEmpty(gradientColor3) ? `url(#${id}-3)` : '#000'}/>
        </g>
        {!isEmpty(gradientColor) && shapeDividerGradient(props)}
        {!isEmpty(gradientColor2) && shapeDividerGradient({id: `${id}-2`, gradientColor: gradientColor2, gradientAngle: gradientAngle2})}
        {!isEmpty(gradientColor3) && shapeDividerGradient({id: `${id}-3`, gradientColor: gradientColor3, gradientAngle: gradientAngle3})}
    </svg> : <svg fill="none" height="188" className="guten-shape-fill" viewBox="0 0 1200 188" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="m1200 0v27.1567c-13.33-.0847-26.7-.1271-40.1-.1271-555.19 0-1022.39 68.2793-1159.9 160.9704v-188z" opacity=".25"/>
            <path d="m1200 0v24.2677c-13.33-.0757-26.7-.1136-40.1-.1136-555.19 0-1022.39 61.0155-1159.9 143.8459v-168z" opacity=".5"/>
            <path d="m1200 0v21.37c-13.33-.0667-26.7-.1-40.1-.1-555.19 0-1022.39 53.73-1159.9 126.67v-147.94z"/>
        </g>
    </svg>;
};
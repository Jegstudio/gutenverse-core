import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivWavesO3 = (props) => {
    const {id, gradient, gradientColor, gradientColor2, gradientAngle2, gradientColor3, gradientAngle3 } = props;
    return gradient ? <svg fill="none" height="110" className="guten-shape-fill" viewBox="0 0 1200 110" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000">
            <path d="m0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34 92.64-30.79 216.15-70.08 303.15-3.32v-52.47z" opacity=".25" fill={!isEmpty(gradientColor) ? `url(#${id})` : '#00000044'}/>
            <path d="m0 0v15.81c13 21.11 27.64 41.05 47.69 56.24 51.72 39.22 117.31 38.95 176.89 19.53 31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24v-21.44z" opacity=".5" fill={!isEmpty(gradientColor2) ? `url(#${id}-2)` : '#00000088'}/>
            <path d="m0 0v5.63c149.93 53.37 314.09 65.69 475.83 36.94 43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4 58.93 25.71 117 43.73 182.2 38.49 86.53-7 172.46-45.71 248.8-84.81v-5.19z" fill={!isEmpty(gradientColor3) ? `url(#${id}-3)` : '#000'}/>
        </g>
        {!isEmpty(gradientColor) && shapeDividerGradient(props)}
        {!isEmpty(gradientColor2) && shapeDividerGradient({id: `${id}-2`, gradientColor: gradientColor2, gradientAngle: gradientAngle2})}
        {!isEmpty(gradientColor3) && shapeDividerGradient({id: `${id}-3`, gradientColor: gradientColor3, gradientAngle: gradientAngle3})}
    </svg> : <svg fill="none" height="110" className="guten-shape-fill" viewBox="0 0 1200 110" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000">
            <path d="m0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34 92.64-30.79 216.15-70.08 303.15-3.32v-52.47z" opacity=".25"/>
            <path d="m0 0v15.81c13 21.11 27.64 41.05 47.69 56.24 51.72 39.22 117.31 38.95 176.89 19.53 31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24v-21.44z" opacity=".5"/>
            <path d="m0 0v5.63c149.93 53.37 314.09 65.69 475.83 36.94 43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4 58.93 25.71 117 43.73 182.2 38.49 86.53-7 172.46-45.71 248.8-84.81v-5.19z"/>
        </g>
    </svg>;
};
import isEmpty from 'lodash/isEmpty';
import { shapeDividerGradient } from '../shape-divider';

export const ShapeDivSplitN = (props) => {
    const {id, gradient, gradientColor} = props;
    return gradient && !isEmpty(gradientColor) ? <svg fill="none" style={{transform: 'translateX(-50%) rotate(180deg)'}}height="57" className="guten-shape-fill" viewBox="0 0 1200 57" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="m1200 0v57.38h-1200v-57.38h550v.11c13.242-.000032 25.943 5.25271 35.317 14.6057 9.373 9.3531 14.654 22.0425 14.683 35.2843 0-13.2608 5.268-25.9785 14.645-35.3553 9.376-9.37686 22.094-14.6447 35.355-14.6447z" fill={`url(#${id})`}/>
        </g>
        {shapeDividerGradient(props)}
    </svg> : <svg fill="none" style={{transform: 'translateX(-50%) rotate(180deg)'}}height="57" className="guten-shape-fill" viewBox="0 0 1200 57" preserveAspectRatio="none" width="1200" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="m1200 0v57.38h-1200v-57.38h550v.11c13.242-.000032 25.943 5.25271 35.317 14.6057 9.373 9.3531 14.654 22.0425 14.683 35.2843 0-13.2608 5.268-25.9785 14.645-35.3553 9.376-9.37686 22.094-14.6447 35.355-14.6447z" fill="#000"/>
        </g>
    </svg>;
};
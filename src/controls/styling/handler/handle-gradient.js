import { isEmpty } from 'lodash';

export const handleGradient = (props, angle) => {
    let result = '';

    if (!isEmpty(props)) {
        const colors = props.map(gradient => `${gradient.color} ${gradient.offset * 100}%`);

        result = `background: linear-gradient(${angle}deg, ${colors.join(',')});`;
    }

    return result;
};
import { variableColorName } from 'gutenverse-core/helper';

export const handleColor = (props, property) => {
    const { r, g, b, a = 1, type, id } = props;
    let result = '';

    if ((r || r === 0) && (g || g === 0) && (g || g === 0)) {
        result = `${property}: rgba(${r}, ${g}, ${b}, ${a});`;
    }

    if ('variable' === type) {
        const value = variableColorName(id);
        result = `${property}: var(${value});`;
    }

    return result;
};

export const getColor = (props) => {
    const { r, g, b, a, type, id } = props;
    let result = '';

    if ((r || r === 0) && (g || g === 0) && (g || g === 0)) {
        result = `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    if ('variable' === type) {
        const value = variableColorName(id);
        result = `var(${value})`;
    }

    return result;
};
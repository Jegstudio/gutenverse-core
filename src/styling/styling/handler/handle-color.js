import { hexToRgb } from 'gutenverse-core/editor-helper';
import { variableColorName } from 'gutenverse-core/helper';
import { isEmpty } from 'lodash';

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

export const getColorValueFromVariable = (val) => {
    if (val.type !== 'variable') {
        return val;
    }
    const defaultPalette = window['GutenverseConfig']['globalColors']['default'];
    const themeColors = window['GutenverseConfig']['globalColors']['theme'];

    const defaultColor = !isEmpty(defaultPalette) && defaultPalette.map(item => {
        return {
            id: item.slug,
            type: 'default',
            name: item.name,
            color: hexToRgb(item.color)
        };
    });

    const themeColor = !isEmpty(themeColors) && themeColors.map(item => {
        return {
            id: item.slug,
            type: 'theme',
            name: item.name,
            color: hexToRgb(item.color)
        };
    });

    const defaultCheck = Object.keys(defaultColor).filter(key => {
        return defaultColor[key].id === val.id;
    });

    if (!isEmpty(defaultCheck) && !isEmpty(defaultColor[defaultCheck[0]])) {
        return getColor(defaultColor[defaultCheck[0]].color);
    }

    const themeCheck = Object.keys(themeColor).filter(key => {
        return themeColor[key].id === val.id;
    });

    if (!isEmpty(themeCheck) && !isEmpty(themeColor[themeCheck[0]])) {
        return getColor(themeColor[themeCheck[0]].color);
    }

    return val;
};
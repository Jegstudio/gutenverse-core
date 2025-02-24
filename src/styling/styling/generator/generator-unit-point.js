import { isNotEmpty } from 'gutenverse-core/helper';
import { renderPatternValues } from './generator-plain';

export const unitPointCSS = (attribute, name, important = false) => {
    const { point, unit } = attribute;
    if (point && unit) {
        return `${name} : ${point}${unit}${important ? '!important' : ''};`;
    }
    return '';
};

export const unitPointGenerator = (attribute, style, css) => {
    const { selector, responsive = false } = style;
    if (!responsive) {
        let valueCSS = multiProperty(attribute, style);
        if (valueCSS) css.Desktop = `${selector} { ` + valueCSS + ' }';
    } else {
        if (attribute['Desktop']) {
            let valueCSS = multiProperty(attribute['Desktop'], style);
            if (valueCSS) css.Desktop = `${selector} { ` + valueCSS + ' }';
        }
        if (attribute['Tablet']) {
            let valueCSS = multiProperty(attribute['Tablet'], style);
            if (valueCSS) css.Tablet = `${selector} { ` + valueCSS + ' }';
        }
        if (attribute['Mobile']) {
            let valueCSS = multiProperty(attribute['Mobile'], style);
            if (valueCSS) css.Mobile = `${selector} { ` + valueCSS + ' }';
        }
    }
    return css;
};

const multiProperty = (attribute, props) => {
    const { properties } = props;
    let styles = '';
    if (properties && properties.length > 0) {
        properties.forEach(el => {
            styles += `${generateValue(attribute, el)} `;
        });
    }
    return styles;
};

const generateValue = (attribute, props) => {
    let value = null;
    const { valueType, name, important, pattern, patternValues } = props;
    switch (valueType) {
        case 'pattern':
            if (isNotEmpty(attribute['point'])) {
                const valueCSS = renderPatternValues(pattern, patternValues, `${attribute['point']}${attribute['unit']}`);
                value = `${name} : ${valueCSS};`;
            }
            break;
        case 'direct':
        default:
            value = unitPointCSS(attribute, name, important);
            break;
    }
    return value;
};
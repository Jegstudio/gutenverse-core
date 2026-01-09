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
    const { selector, responsive = false, otherAttribute } = style;
    if (!responsive) {
        let valueCSS = multiProperty(attribute, style, otherAttribute);
        if (isNotEmpty(valueCSS)) css.Desktop = ` ${selector} { ${valueCSS} } `;
    } else {
        const selectors = typeof selector === 'object' ? selector : {
            'Desktop': selector,
            'Tablet': selector,
            'Mobile': selector,
        };

        if (attribute['Desktop']) {
            let valueCSS = multiProperty(attribute['Desktop'], style, otherAttribute, 'Desktop');
            if (isNotEmpty(valueCSS)) css.Desktop = `${selectors['Desktop']} { ` + valueCSS + ' }';
        }
        if (attribute['Tablet']) {
            let valueCSS = multiProperty(attribute['Tablet'], style, otherAttribute, 'Tablet');
            if (isNotEmpty(valueCSS)) css.Tablet = `${selectors['Tablet']} { ` + valueCSS + ' }';
        }
        if (attribute['Mobile']) {
            let valueCSS = multiProperty(attribute['Mobile'], style, otherAttribute, 'Mobile');
            if (isNotEmpty(valueCSS)) css.Mobile = `${selectors['Mobile']} { ` + valueCSS + ' }';
        }
    }
    return css;
};

const multiProperty = (attribute, props, otherAttribute, deviceType) => {
    const { properties } = props;
    let styles = '';
    if (properties && properties.length > 0) {
        properties.forEach(el => {
            let property = {
                attribute,
                props: el,
                otherAttribute,
                deviceType
            };
            styles += `${generateValue(property)} `;
        });
    }
    return styles;
};

const generateValue = ({ attribute, props, otherAttribute, deviceType = null }) => {
    let value = null;
    const { valueType, name, important, pattern, patternValues, functionName, functionProps } = props;
    switch (valueType) {
        case 'pattern':
            if (isNotEmpty(attribute['point'])) {
                const valueCSS = renderPatternValues(pattern, patternValues, `${attribute['point']}${attribute['unit']}`);
                value = `${name} : ${valueCSS};`;
            }
            break;
        case 'function':
            if (isNotEmpty(attribute['point'])) {
                const valueCSS = renderFunctionValue(functionName, functionProps, attribute, otherAttribute, deviceType);
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

const renderFunctionValue = (functionName, functionProps, attribute, otherAttribute, deviceType) => {
    let value = '';
    switch (functionName) {
        case 'handleWrapperPosition':
            const { positionType } = otherAttribute;
            if (deviceType && positionType && positionType[deviceType] !== 'default') {
                value = `${attribute['point']}${attribute['unit']}`;
            } else if (!deviceType && positionType && positionType !== 'default') {
                value = `${attribute['point']}${attribute['unit']}`;
            }
            break;
        default:
            break;
    }
    return value;
};
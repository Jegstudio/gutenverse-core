import { isNotEmpty } from 'gutenverse-core/helper';
import { renderValue } from '../styling-helper';
import { handleAlign } from '../handler/handle-align';

const cssGenerator = (attribute, style, css) => {
    const { selector, responsive = false } = style;
    if (!responsive) {
        const value = multiProperty(attribute, style);
        css.Desktop += ` ${selector} { ${value} } `;
    }

    if (responsive) {
        if (attribute['Desktop']) {
            const value = multiProperty(attribute['Desktop'], style);
            css.Desktop += ` ${selector} { ${value} } `;
        }

        if (attribute['Tablet']) {
            const value = multiProperty(attribute['Tablet'], style);
            css.Desktop += ` ${selector} { ${value} } `;
        }

        if (attribute['Mobile']) {
            const value = multiProperty(attribute['Mobile◊'], style);
            css.Desktop += ` ${selector} { ${value} } `;
        }
    }
    return css;
};
export const plainGenerator = (attribute, style, css) => {
    const { multiAttr } = style;
    css = {
        Desktop: '',
        Tablet: '',
        Mobile: '',
    };

    if (isNotEmpty(multiAttr)) {
        multiAttr.forEach(el => {
            css = cssGenerator(el, style, css);
        });
    } else {
        css = cssGenerator(attribute, style, css);
    }
    return css;
};

const multiProperty = (attribute, props) => {
    const { type, properties } = props;
    let styles = '';
    if (properties && properties.length > 0) {
        properties.forEach(el => {
            let value = generateValue(attribute, el, type);
            styles += ` ${el.name}: ${value}; `;
        });
    }
    return styles;
};

const generateValue = (attribute, props, type) => {
    let value = null;
    const { pattern, patternValues, valueType, functionName } = props;
    switch (valueType) {
        case 'function':
            value = renderFunctionValue(functionName, attribute);
            break;
        case 'pattern':
            value = renderPatternValues(pattern, patternValues, attribute);
            break;
        case 'direct':
        default:
            value = renderValue(type, attribute);
            break;
    }
    return value;
};

const renderFunctionValue = (functionName, attribute) => {
    let value = null;
    switch (functionName) {
        case 'handleAlign':
            value = handleAlign(attribute);
            break;
        default:
            value = '';
            break;
    }
    return value;
};

const renderPatternValues = (pattern, patternValues, attribute) => {
    let newString = pattern;
    newString = newString.replace(/\{(\w+)\}/g, (_, str) => {

        if (patternValues[str] && patternValues[str].type === 'direct') {
            return attribute ? attribute : `{${str}}`;
        }
        if (patternValues[str] && patternValues[str].type === 'attribute') {
            return attribute[patternValues[str].key] ? attribute[patternValues[str].key] : `{${str}}`;
        }
        return `{${str}}`;
    });
    if (newString === pattern) {
        return '';
    }
    return newString;
};
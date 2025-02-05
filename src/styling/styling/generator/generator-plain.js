import { renderValue } from '../styling-helper';

export const plainGenerator = (attribute, style, css) => {
    const { type, selector, property, responsive = false, valueCSS, values } = style;
    let value = null;
    if (!responsive) {
        if (valueCSS && values) {
            value = replaceDynamicValues(valueCSS, values, attribute);
        } else {
            value = renderValue(type, attribute);
        }
        if (value) {
            const style = multiProperty(property, value);
            css.Desktop = `${selector} { ${style} }`;
        }
    }

    if (responsive) {
        if (attribute['Desktop']) {
            if (valueCSS && values) {
                value = replaceDynamicValues(valueCSS, values, attribute);
            } else {
                value = renderValue(type, attribute['Desktop']);
            }
            if (value) {
                const style = multiProperty(property, value);
                css.Desktop = `${selector} { ${style} }`;
            }
        }

        if (attribute['Tablet']) {
            if (valueCSS && values) {
                value = replaceDynamicValues(valueCSS, values, attribute);
            } else {
                value = renderValue(type, attribute['Tablet']);
            }
            if (value) {
                const style = multiProperty(property, value);
                css.Tablet = `${selector} { ${style} }`;
            }
        }

        if (attribute['Mobile']) {
            if (valueCSS && values) {
                value = replaceDynamicValues(valueCSS, values, attribute);
            } else {
                value = renderValue(type, attribute['Mobile']);
            }
            if (value) {
                const style = multiProperty(property, value);
                css.Mobile = `${selector} { ${style} }`;
            }
        }
    }
    return css;
};

export const multiProperty = (properties, value) => {
    let styles = '';
    if (properties && properties.length > 0) {
        properties.forEach(el => {
            styles += `${el}: ${value};`;
        });
    }
    return styles;
};

const replaceDynamicValues = (str, values, attribute) => {
    let newString = str;
    newString = newString.replace(/\{(\w+)\}/g, (_, key) => {
        if (values[key] && values[key].type === 'attribute') {
            return attribute[values[key].key]
                ? attribute[values[key].key]
                : `{${key}}`;
        }
        if (values[key] && values[key].type === 'direct') {
            return attribute ? attribute : `{${key}}`;
        }
        return `{${key}}`;
    });
    if (newString === str) {
        return false;
    }
    return newString;
};
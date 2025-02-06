export const unitPointCSS = (attribute, important= false) => {
    const { point, unit } = attribute;
    if (point && unit) {
        return `${point}${unit}${important ? '!important' : ''};`;
    }

    return '';
};

export const unitPointGenerator = (attribute, style, css) => {
    const { selector, responsive = false } = style;
    if (!responsive) {
        css.Desktop = `${selector} { ` + multiProperty(attribute, style) + ' }';
    }

    if (responsive) {
        if (attribute['Desktop']) {
            css.Desktop = `${selector} { ` + multiProperty(attribute['Desktop'], style) + ' }';
        }
        if (attribute['Tablet']) {
            css.Tablet = `${selector} { ` + multiProperty(attribute['Tablet'], style) + ' }';
        }
        if (attribute['Mobile']) {
            css.Mobile = `${selector} { ` + multiProperty(attribute['Mobile'], style) + ' }';
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
    const { valueType, name } = props;
    switch (valueType) {
        case 'direct':
        default:
            value = unitPointCSS(attribute, name);
            break;
    }
    return value;
};
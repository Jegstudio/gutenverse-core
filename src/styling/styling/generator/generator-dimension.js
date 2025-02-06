export const dimensionCSS = (attribute, prefix = '', multi = true, min = 0) => {
    const { dimension, unit } = attribute;
    const positions = ['top', 'right', 'bottom', 'left'];
    const styles = [];
    if (dimension && unit) {
        if (multi) {
            positions.map(position => {
                if (dimension[position]) {
                    if (prefix) {
                        styles.push(`${prefix}-${position}: ${dimension[position]}${unit};`);
                    } else {
                        styles.push(`${position}: ${dimension[position]}${unit};`);
                    }
                }
            });

            return styles.join(' ');
        } else {
            let totallyEmpty = true;
            positions.map(position => {
                if (dimension[position]) {
                    totallyEmpty = false;
                    styles.push(`${dimension[position]}${unit}`);
                } else {
                    totallyEmpty = totallyEmpty && true;
                    styles.push(`${min}${unit}`);
                }
            });

            const finalStyles = styles.join(' ');

            return !totallyEmpty ? `${prefix}: ${finalStyles};` : '';
        }
    }

    return '';
};

export const dimensionGenerator = (attribute, style, css) => {
    const { selector, responsive = false } = style;

    if (!responsive) {
        css.Desktop = `${selector} { ` + multiProperty(attribute, style); + ' }';
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
            value = dimensionCSS(attribute, name);
            break;
    }
    return value;
};
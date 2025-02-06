export const unitPointCSS = (attribute, property, important= false) => {
    const { point, unit } = attribute;
    if (point && unit) {
        return `${point}${unit}${important ? '!important' : ''};`;
    }

    return '';
};

export const unitPointGenerator = (attribute, style, css) => {
    const { selector, property, responsive = false, important } = style;
    if (!responsive) {
        css.Desktop = unitPointCSS(attribute, property[0], important);
    }

    if (responsive) {
        if (attribute['Desktop']) {
            css.Desktop = `${selector} { ` + unitPointCSS(attribute['Desktop'], property[0], important) + ' }';
        }
        if (attribute['Tablet']) {
            css.Tablet = `${selector} { ` + unitPointCSS(attribute['Tablet'], property[0], important) + ' }';
        }
        if (attribute['Mobile']) {
            css.Mobile = `${selector} { ` + unitPointCSS(attribute['Mobile'], property[0], important) + ' }';
        }
    }

    return css;
};
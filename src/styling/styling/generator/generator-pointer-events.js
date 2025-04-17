const pointerEventCSS = (value) => {
    let style = '';

    style += `pointer-events : ${value} !important;`;

    return style;
};

export const pointerEventGenerator = (attribute, style, css) => {
    const { selector, responsive = false } = style;

    if (!responsive) {
        const value = pointerEventCSS(attribute['pointer']);
        css.Desktop = `${selector} { ${value} }`;
    }

    if (responsive) {
        if (attribute['pointer']['Desktop']) {
            const value = pointerEventCSS(attribute['pointer']['Desktop']);
            css.Desktop = `${selector} { ${value} }`;
        }
        if (attribute['pointer']['Tablet']) {
            const value = pointerEventCSS(attribute['pointer']['Tablet']);
            css.Tablet = `${selector} { ${value} }`;
        }

        if (attribute['pointer']['Mobile']) {
            const value = pointerEventCSS(attribute['pointer']['Mobile']);
            css.Mobile = `${selector} { ${value} }`;
        }
    }
    return css;
};
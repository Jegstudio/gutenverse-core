import { renderValue } from '../styling-helper';

export const plainGenerator = (attribute, style, css) => {
    const {type, selector, property, responsive = false} = style
    if ( !responsive ) {
        const value = renderValue(type, attribute);
        const style = multiProperty(property, value);
        css.Desktop = `${selector} { ${style} }`;
    }

    if (responsive) {
        if (attribute['Desktop']) {
            const value = renderValue(type, attribute['Desktop']);
            const style = multiProperty(property, value);
            css.Desktop = `${selector} { ${style} }`;
        }
        if (attribute['Tablet']) {
            const value = renderValue(type, attribute['Tablet']);
            const style = multiProperty(property, value);
            css.Tablet = `${selector} { ${style} }`;
        }

        if (attribute['Mobile']) {
            const value = renderValue(type, attribute['Mobile']);
            const style = multiProperty(property, value);
            css.Mobile = `${selector} { ${style} }`;
        }
    }
    return css;
}

export const multiProperty = (properties, value) => {
    let styles = '';
    if(properties && properties.length > 0){
        properties.forEach(el => {
            styles += `${el}: ${value};`;
        });
    }
    return styles;
}

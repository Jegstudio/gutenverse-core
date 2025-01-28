import { getColor } from '../handler/handle-color';

const textStrokeCSS = (attribute) => {
    let style = '';
    const {
        color,
        width,
    } = attribute;

    if(color){
        let colorStyle = getColor(color);
        style += `-webkit-text-stroke-color : ${colorStyle}; stroke: ${colorStyle};`;
    }

    if(width){
        style += ` -webkit-text-stroke-width: ${width.point}${width.unit}; stroke-width: ${width.point}${width.unit};`;
    }
    
    return style;
};

export const textStrokeGenerator = (attribute, style, css) => {
    const {type, selector, responsive = false} = style
    if ( !responsive ) {
        const value = textStrokeCSS(attribute);
        css.Desktop = `${selector} { ${value} }`;
    }

    if (responsive) {
        if (attribute['Desktop']) {
            const value = textStrokeCSS(type, attribute['Desktop']);
            css.Desktop = `${selector} { ${value} }`;
        }
        if (attribute['Tablet']) {
            const value = textStrokeCSS(type, attribute['Tablet']);
            css.Tablet = `${selector} { ${value} }`;
        }

        if (attribute['Mobile']) {
            const value = textStrokeCSS(type, attribute['Mobile']);
            css.Tablet = `${selector} { ${value} }`;
        }
    }
    return css;
}
import isEmpty from 'lodash/isEmpty';
import { getColor } from '../handler/handle-color';

export const shapeDividerGenerator = (attribute, style, css) => {
    const { selector } = style;
    const {
        type,
        width,
        height,
        color,
        colorMode
    } = attribute;

    let desktop = '';
    let tablet = '';
    let mobile = '';

    if (type && type !== 'none') {
        if (width) {
            if (width['Desktop']) {
                const value = width['Desktop'];
                desktop = `width: calc(${value}% + 1.3px);`;
            }

            if (width['Tablet']) {
                const value = width['Tablet'];
                tablet = `width: calc(${value}% + 1.3px);`;
            }

            if (width['Mobile']) {
                const value = width['Mobile'];
                mobile = `width: calc(${value}% + 1.3px);`;
            }
        }

        if (height) {
            if (height['Desktop']) {
                const value = height['Desktop'];
                desktop = `height: ${value}px;`;
            }

            if (height['Tablet']) {
                const value = height['Tablet'];
                tablet = `height: ${value}px;`;
            }

            if (height['Mobile']) {
                const value = height['Mobile'];
                mobile = `height: ${value}px;`;
            }
        }

        if (!isEmpty(color) & (isEmpty(colorMode) || colorMode === 'default')) {
            const dividerColor = getColor(color);
            desktop = `fill: ${dividerColor};`;
        }

        css.Desktop = `${selector} { ${desktop} }`;
        css.Tablet = `${selector} { ${tablet} }`;
        css.Mobile = `${selector} { ${mobile} }`;
    }

    return css;
};
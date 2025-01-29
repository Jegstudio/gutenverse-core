import isEmpty from 'lodash/isEmpty';
import { handleDimension } from '../handler/handle-dimension';
import { handleColor } from '../handler/handle-color';

export const borderCSS = (value) => {
    const border = {
        'Desktop': [],
        'Tablet': [],
        'Mobile': [],
    };

    const keys = Object.keys(value);
    const sortedKeys = [
        ...keys.filter(key => key === 'all'),
        ...keys.filter(key => key !== 'all'),
    ];

    /**
     * This is an old way of styling border.
     * Styling only applied on Desktop, because in newer version the attribute `borderResponsive` is used for Tablet and Mobile.
     */
    sortedKeys.forEach((pos) => {
        if (pos === 'radius') {
            const radius = value[pos];
            if (radius?.Desktop) {
                border.Desktop.push(`${handleDimension(radius.Desktop, 'border-radius', false)}`);
            }
        } else if (!isEmpty(value[pos]) && value[pos].type && value[pos].type !== 'default') {
            const borderAttr = value[pos];
            const posPrefix = pos === 'all' ? '' : `${pos}-`;

            if (borderAttr.type) {
                border.Desktop.push(`border-${posPrefix}style: ${borderAttr.type};`);
            }

            if (borderAttr.width) {
                border.Desktop.push(`border-${posPrefix}width: ${borderAttr.width}px;`);
            }

            if (borderAttr.color) {
                const colorCSS = handleColor(borderAttr.color, `border-${posPrefix}color`);
                border.Desktop.push(colorCSS);
            }
        }
    });

    return border;
};

export const borderGenerator = (attribute, style, css) => {
    const { selector } = style;

    const border = borderCSS(attribute);

    if (border.Desktop.length) {
        css.Desktop = `${selector} { ` + border.Desktop.join(' ') + ' }';
    }

    if (border.Tablet.length) {
        css.Tablet = `${selector} { ` + border.Tablet.join(' ') + ' }';
    }

    if (border.Mobile.length) {
        css.Mobile = `${selector} { ` + border.Mobile.join(' ') + ' }';
    }

    return css;
};

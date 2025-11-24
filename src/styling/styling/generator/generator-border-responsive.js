import { isEmpty } from 'gutenverse-core/helper';
import { handleColor, handleDimension } from 'gutenverse-core/styling';

export const borderResponsiveCSS = (value) => {
    const border = {
        'Desktop': [],
        'Tablet': [],
        'Mobile': [],
    };

    Object.keys(border).forEach(device => {
        if (isEmpty(value[device])) {
            return;
        }

        const borderData = value[device];
        const keys = Object.keys(borderData);
        const sortedKeys = [
            ...keys.filter(key => key === 'all'),
            ...keys.filter(key => key !== 'all'),
        ];

        sortedKeys.forEach((pos) => {
            if (!isEmpty(borderData[pos]) && borderData[pos].type && borderData[pos].type !== 'default') {
                const borderAttr = borderData[pos];
                const posPrefix = pos === 'all' ? '' : `${pos}-`;

                if (borderAttr.type) {
                    border[device].push(`border-${posPrefix}style: ${borderAttr.type};`);
                }

                if (borderAttr.width) {
                    border[device].push(`border-${posPrefix}width: ${borderAttr.width}px;`);
                }

                if (borderAttr.color) {
                    const colorCSS = handleColor(borderAttr.color, `border-${posPrefix}color`);
                    border[device].push(colorCSS);
                }
            }

            if (pos === 'radius' && !isEmpty(borderData[pos])) {
                const radius = borderData[pos];
                if (radius) {
                    border[device].push(`${handleDimension(radius, 'border-radius', false)}`);
                }
            }
        });
    });

    return border;
};

export const borderResponsiveGenerator = (attribute, style, css) => {
    const { selector } = style;

    const border = borderResponsiveCSS(attribute);

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

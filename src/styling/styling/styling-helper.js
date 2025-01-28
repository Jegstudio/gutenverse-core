import { useMemo } from '@wordpress/element';
import { getColor } from './handler/handle-color';

const cssDeviceString = (elementId, attribute, prefix) => {
    let css = [];

    if (attribute['Desktop']) {
        css.push(`.${elementId} { ${prefix}: ${attribute['Desktop']}; }`);
    } else {
        css.push(null);
    }

    if (attribute['Tablet']) {
        css.push(`.${elementId} { ${prefix}: ${attribute['Tablet']}; }`);
    } else {
        css.push(null);
    }

    if (attribute['Mobile']) {
        css.push(`.${elementId} { ${prefix}: ${attribute['Mobile']}; }`);
    } else {
        css.push(null);
    }

    return css;
};

const mergeCSSDevice = (Desktop, Tablet, Mobile) => {
    let css = [];

    if (Desktop.length) {
        css.push(Desktop.join(' '));
    }

    if (Tablet.length) {
        css.push('@media only screen and (max-width: 781px) {' + Tablet.join(' ') + '}');
    }

    if (Mobile.length) {
        css.push('@media only screen and (max-width: 361px) {' + Mobile.join(' ') + '}');
    }

    return css.join(' ');
};

const renderValue = (type, attribute) => {
    switch (type) {
        case 'color':
            return getColor(attribute);
        case 'plain':
            return attribute;
        default:
            return attribute;
    }
};

const typographyCSS = (attribute) => {
    let typography = {
        'Desktop': [],
        'Tablet': [],
        'Mobile': [],
    };

    const {
        font,
        size,
        weight,
        transform,
        style,
        decoration,
        lineHeight,
        spacing
    } = attribute;

    if (font) {
        typography.Desktop.push(`font-family: "${font.value}";`);
    }

    if (size) {
        if (size.Desktop && size.Desktop.point && size.Desktop.unit) {
            typography.Desktop.push(`font-size: ${size.Desktop.point}${size.Desktop.unit};`);
        }
        if (size.Tablet && size.Tablet.point && size.Tablet.unit) {
            typography.Tablet.push(`font-size: ${size.Tablet.point}${size.Tablet.unit};`);
        }
        if (size.Mobile && size.Mobile.point && size.Mobile.unit) {
            typography.Mobile.push(`font-size: ${size.Mobile.point}${size.Mobile.unit};`);
        }
    }

    if (lineHeight) {
        if (lineHeight.Desktop && lineHeight.Desktop.point && lineHeight.Desktop.unit) {
            typography.Desktop.push(`line-height: ${lineHeight.Desktop.point}${lineHeight.Desktop.unit};`);
        }
        if (lineHeight.Tablet && lineHeight.Tablet.point && lineHeight.Tablet.unit) {
            typography.Tablet.push(`line-height: ${lineHeight.Tablet.point}${lineHeight.Tablet.unit};`);
        }
        if (lineHeight.Mobile && lineHeight.Mobile.point && lineHeight.Mobile.unit) {
            typography.Mobile.push(`line-height: ${lineHeight.Mobile.point}${lineHeight.Mobile.unit};`);
        }
    }

    if (weight) {
        const checkWeight = weight === 'default' ? '400' : weight;
        typography.Desktop.push(`font-weight: ${checkWeight};`);
    }

    if (transform && transform !== 'default') {
        typography.Desktop.push(`text-transform: ${transform};`);
    }

    if (style && style !== 'default') {
        typography.Desktop.push(`font-style: ${style};`);
    }

    if (decoration && decoration !== 'default') {
        typography.Desktop.push(`text-decoration: ${decoration};`);
    }

    if (spacing) {
        if (spacing.Desktop) {
            typography.Desktop.push(`letter-spacing: ${spacing.Desktop}em;`);
        }
        if (spacing.Tablet) {
            typography.Tablet.push(`letter-spacing: ${spacing.Tablet}em;`);
        }
        if (spacing.Mobile) {
            typography.Mobile.push(`letter-spacing: ${spacing.Mobile}em;`);
        }
    }

    return typography;
};

const generateCSSString = (type, attribute, selector, property, responsive = false) => {
    let css = {
        Desktop: null,
        Tablet: null,
        Mobile: null,
    };

    if (type === 'plain' || type === 'color') {
        if (!responsive || attribute['Desktop']) {
            if (responsive) {
                const value = renderValue(type, attribute['Desktop']);
                css.Desktop = `${selector} { ${property}: ${value}; }`;
            } else {
                const value = renderValue(type, attribute);
                css.Desktop = `${selector} { ${property}: ${value}; }`;
            }
        }

        if (responsive) {
            if (attribute['Tablet']) {
                const value = renderValue(type, attribute['Tablet']);
                css.Tablet = `${selector} { ${property}: ${value}; }`;
            }

            if (attribute['Mobile']) {
                const value = renderValue(type, attribute['Mobile']);
                css.Tablet = `${selector} { ${property}: ${value}; }`;
            }
        }
    }

    if (type === 'typography') {
        const typography = typographyCSS(attribute);

        if (typography.Desktop.length) {
            css.Desktop = `${selector} { ` + typography.Desktop.join(' ') + ' }';
        }

        if (typography.Tablet.length) {
            css.Tablet = `${selector} { ` + typography.Tablet.join(' ') + ' }';
        }

        if (typography.Mobile.length) {
            css.Mobile = `${selector} { ` + typography.Mobile.join(' ') + ' }';
        }
    }

    return css;
};

const mergeFontDevice = (fonts) => {
    let googleFont = '';
    let systemFont = '';

    fonts.forEach((font) => {
        const { font: fontName, type, weight } = font;
        if (type === 'google') {
            googleFont = `https://fonts.googleapis.com/css?family=${fontName.replace(/ /g, '+')}:${weight}`;
        }
    });

    return [googleFont, systemFont];
};

export const useDynamicStyle = (elementId, attributes, getBlockStyle) => {
    const { generatedCSS, fontUsed } = useMemo(() => {
        const deviceTypeDesktop = [];
        const deviceTypeTablet = [];
        const deviceTypeMobile = [];
        const gatheredFont = [];

        getBlockStyle(elementId).forEach((style) => {
            const { type, id, selector, property, responsive } = style;
            if (attributes[id]) {
                const value = attributes[id];
                const css = generateCSSString(type, value, selector, property, responsive);

                css.Desktop && deviceTypeDesktop.push(css.Desktop);
                css.Tablet && deviceTypeTablet.push(css.Tablet);
                css.Mobile && deviceTypeMobile.push(css.Mobile);
            }
            if (type === 'typography' && attributes[id]) {
                const { font, weight } = attributes[id];
                if (font) {
                    gatheredFont.push({
                        font: font.value,
                        type: font.type,
                        weight: weight
                    });
                }
            }
        });

        const generatedCSS = mergeCSSDevice(deviceTypeDesktop, deviceTypeTablet, deviceTypeMobile);
        const fontUsed = mergeFontDevice(gatheredFont);

        return { generatedCSS, fontUsed };
    }, [elementId, attributes]);

    return [generatedCSS, fontUsed];
};

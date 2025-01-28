import { variableFontName } from 'gutenverse-core/helper';

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
        spacing,
        type,
        id
    } = attribute;

    if (type === 'variable') {
        typography.Desktop.push(`font-family: var(${variableFontName(id, 'family')});`);
        typography.Desktop.push(`font-size: var(${variableFontName(id, 'size')});`);
        typography.Tablet.push(`font-size: var(${variableFontName(id, 'size')});`);
        typography.Mobile.push(`font-size: var(${variableFontName(id, 'size')});`);
        typography.Desktop.push(`line-height: var(${variableFontName(id, 'lineHeight')});`);
        typography.Tablet.push(`line-height: var(${variableFontName(id, 'lineHeight')});`);
        typography.Mobile.push(`line-height: var(${variableFontName(id, 'lineHeight')});`);
        typography.Desktop.push(`font-weight: var(${variableFontName(id, 'weight')});`);
        typography.Desktop.push(`text-transform: var(${variableFontName(id, 'transform')});`);
        typography.Desktop.push(`font-style: var(${variableFontName(id, 'style')});`);
        typography.Desktop.push(`text-decoration: var(${variableFontName(id, 'decoration')});`);
        typography.Desktop.push(`letter-spacing: var(${variableFontName(id, 'spacing')});`);
        typography.Tablet.push(`letter-spacing: var(${variableFontName(id, 'spacing')});`);
        typography.Mobile.push(`letter-spacing: var(${variableFontName(id, 'spacing')});`);
        return typography;
    }else{
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
    }
};
export const typographyGenerator = (attribute, style, css) => {
    const typography = typographyCSS(attribute);
    const { selector } = style;

    if (typography.Desktop.length) {
        css.Desktop = `${selector} { ` + typography.Desktop.join(' ') + ' }';
    }

    if (typography.Tablet.length) {
        css.Tablet = `${selector} { ` + typography.Tablet.join(' ') + ' }';
    }

    if (typography.Mobile.length) {
        css.Mobile = `${selector} { ` + typography.Mobile.join(' ') + ' }';
    }
    return css;
}
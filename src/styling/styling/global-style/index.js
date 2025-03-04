import { responsiveBreakpoint, variableColorName, getGoogleFontParams, variableFontName } from 'gutenverse-core/helper';
import { DeviceLoop, deviceStyleValue, elementVar, normalAppender, responsiveAppender } from '../styling-utility';
import { isEmpty } from 'lodash';
import { hexToRgb, renderColor } from 'gutenverse-core/editor-helper';
import { applyFilters } from '@wordpress/hooks';

export const buildGlobalStyle = (variable) => {
    let variableStyle = elementVar();
    const { tabletBreakpoint, mobileBreakpoint } = responsiveBreakpoint();
    const { fonts, colors } = variable;
    fonts?.map(item => {
        const { id, font: typography } = item;
        if (typography) {
            const { font, size, weight, transform, style, decoration, lineHeight, spacing } = typography;

            if (font) {
                normalAppender({
                    style: `${variableFontName(id, 'family')} : "${font.value}";`,
                    elementStyle: variableStyle
                });
            }

            if (size) {
                DeviceLoop(device => {
                    const _size = pointCheck(device, size);

                    if (_size && !isEmpty(_size.point)) {
                        const unit = _size.unit ? _size.unit : 'px';
                        responsiveAppender({
                            style: `${variableFontName(id, 'size')} : ${_size.point}${unit};`,
                            device,
                            elementStyle: variableStyle
                        });
                    }
                });
            }

            if (weight) {
                const checkWeight = weight === 'default' ? '400' : weight;
                normalAppender({
                    style: `${variableFontName(id, 'weight')} : ${checkWeight};`,
                    elementStyle: variableStyle
                });
            }

            if (transform && transform !== 'default') {
                normalAppender({
                    style: `${variableFontName(id, 'transform')} : ${transform};`,
                    elementStyle: variableStyle
                });
            }

            if (style && style !== 'default') {
                normalAppender({
                    style: `${variableFontName(id, 'style')} : ${style};`,
                    elementStyle: variableStyle
                });
            }

            if (decoration && decoration !== 'default') {
                normalAppender({
                    style: `${variableFontName(id, 'decoration')} : ${decoration};`,
                    elementStyle: variableStyle
                });
            }

            if (lineHeight) {
                DeviceLoop(device => {
                    const _lineHeight = pointCheck(device, lineHeight);

                    if (_lineHeight && !isEmpty(_lineHeight.point)) {
                        const unit = _lineHeight.unit ? _lineHeight.unit : 'px';
                        responsiveAppender({
                            style: `${variableFontName(id, 'lineHeight')} : ${_lineHeight.point}${unit};`,
                            device,
                            elementStyle: variableStyle
                        });
                    }
                });
            }

            if (spacing) {
                DeviceLoop(device => {
                    const _spacing = deviceStyleValue(device, spacing);

                    if (_spacing) {
                        responsiveAppender({
                            style: `${variableFontName(id, 'spacing')} : ${_spacing}em;`,
                            device,
                            elementStyle: variableStyle
                        });
                    }
                });
            }
        }
    });

    // render non fullsite editor themes colors
    colors?.theme && colors?.theme.map(item => {
        const { slug, color } = item;
        const property = variableColorName(slug);

        normalAppender({
            style: `${property} : ${renderColor(hexToRgb(color))};`,
            elementStyle: variableStyle
        });
    });

    // render custom colors
    colors?.custom && colors?.custom.map(item => {
        const { slug, color } = item;
        const property = variableColorName(slug);

        normalAppender({
            style: `${property} : ${renderColor(hexToRgb(color))};`,
            elementStyle: variableStyle
        });
    });

    return `body { ${variableStyle.adminStyle['Desktop']}; } @media only screen and (max-width: ${tabletBreakpoint}px) { body { ${variableStyle.adminStyle['Tablet']} }; } @media only screen and (max-width: ${mobileBreakpoint}px) { body { ${variableStyle.adminStyle['Mobile']} };}`;
};

const pointCheck = (deviceType, value) => {
    let _value = deviceStyleValue(deviceType, value);

    if (!isEmpty(_value.point)) {
        return _value;
    }

    switch (deviceType) {
        case 'Mobile':
            _value = pointCheck('Tablet', value);
            break;
        case 'Tablet':
            _value = pointCheck('Desktop', value);
            break;
        default:
            break;
    }

    return _value;
};

export const renderFont = (fonts) => {
    const googleFonts = {};
    fonts.forEach(item => {
        if (item?.font?.font?.type === 'google') {
            googleFonts[item.id] = {
                ...item?.font?.font,
                weight: item?.font.weight
            };
        }
    });
    return !isEmpty(googleFonts) && `https://fonts.googleapis.com/css?family=${getGoogleFontParams(googleFonts)}`;
};

export const renderCustomFont = (fonts) => {
    const { uploadPath } = window['GutenverseConfig'];
    const customFonts = {};
    fonts.forEach(item => {
        if (item?.font?.font?.type === 'custom_font_pro') {
            customFonts[item.id] = {
                ...item?.font?.font,
                weight: item?.font.weight
            };
        }
    });
    let customFontData = Object.keys(customFonts).map((value) => {
        return fonts[value].value;
    });
    let uniqueFont = customFontData.filter((value, index, array) => array.indexOf(value) === index);
    return !isEmpty(uniqueFont) && applyFilters(
        'gutenverse.v3.apply-custom-font',
        uniqueFont,
        uploadPath
    );
};

export const injectGlobalStyle = (variable) => {
    const { fonts, theWindow } = variable;
    const globalCSS = buildGlobalStyle(variable);
    let cssGlobal = theWindow.document.getElementById('gutenverse-global-style');
    if (!cssGlobal) {
        cssGlobal = document.createElement('style');
        cssGlobal.id = 'gutenverse-global-style';
        theWindow.document.head.appendChild(cssGlobal);
    }
    console.log(variable.colors);
    cssGlobal.innerHTML = globalCSS;
    if (fonts) {
        const googleFont = renderFont(fonts);
        const customFont = renderCustomFont(fonts);

        if (googleFont) {
            let googleTag = theWindow.document.getElementById('gutenverse-global-google-font');
            if (!theWindow.gutenverseGoogleFontUrl) {
                theWindow.gutenverseGoogleFontUrl = '';
            }
            if (!googleTag) {
                googleTag = document.createElement('link');
                googleTag.rel = 'stylesheet';
                googleTag.type = 'text/css';
                googleTag.id = 'gutenverse-global-google-font';
                googleTag.href = googleFont;
                theWindow.document.head.appendChild(googleTag);
                theWindow.gutenverseGoogleFontUrl = googleFont;
            } else {
                if (googleFont !== theWindow.gutenverseGoogleFontUrl) {
                    googleTag.href = googleFont;
                    theWindow.gutenverseGoogleFontUrl = googleFont;
                }
            }
        }

        if (customFont) {
            let customTag = theWindow.document.getElementsByClassName('gutenverse-pro-global-custom-font');
            if (customTag.length > 0) {
                while (customTag.length > 0) {
                    customTag[0].remove(); // Always remove the first element since the collection updates dynamically
                }
            } else {
                customFont.forEach(el => {
                    customTag = document.createElement('link');
                    customTag.rel = 'stylesheet';
                    customTag.type = 'text/css';
                    customTag.href = el;
                    customTag.classList.add('gutenverse-pro-global-custom-font');
                    theWindow.document.head.appendChild(customTag);
                });
            }
        }
    }
}
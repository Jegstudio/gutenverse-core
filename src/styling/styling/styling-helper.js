import { useMemo, useEffect, useRef } from '@wordpress/element';
import { getColor } from './handler/handle-color';
import { plainGenerator } from './generator/generator-plain';
import { typographyGenerator } from './generator/generator-typography';
import { textShadowCSS } from './generator/generator-text-shadow';
import { textStrokeGenerator } from './generator/generator-text-stroke';
import cryptoRandomString from 'crypto-random-string';
import { Helmet } from 'gutenverse-core/components';
import { backgroundGenerator } from './generator/generator-background';
import { borderGenerator } from './generator/generator-border';
import { borderResponsiveGenerator } from './generator/generator-border-responsive';
import { isOnEditor, recursiveDuplicateCheck, responsiveBreakpoint } from 'gutenverse-core/helper';
import { dispatch, select } from '@wordpress/data';
import { boxShadowCSS } from './generator/generator-box-shadow';
import { maskGenerator } from './generator/generator-mask';
import { dimensionGenerator } from './generator/generator-dimension';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import { debounce } from '@wordpress/compose';
import { positioningGenerator } from './generator/generator-positioning';

const mergeCSSDevice = (Desktop, Tablet, Mobile) => {
    const { tabletBreakpoint, mobileBreakpoint } = responsiveBreakpoint();
    let css = [];

    if (Desktop.length) {
        css.push(Desktop.join(' '));
    }

    if (Tablet.length) {
        css.push('@media only screen and (max-width: ' + tabletBreakpoint + 'px) {' + Tablet.join(' ') + '}');
    }

    if (Mobile.length) {
        css.push('@media only screen and (max-width: ' + mobileBreakpoint + 'px) {' + Mobile.join(' ') + '}');
    }

    return css.join(' ');
};

export const renderValue = (type, attribute) => {
    switch (type) {
        case 'boxShadow':
            return boxShadowCSS(attribute);
        case 'color':
            return getColor(attribute);
        case 'plain':
            return attribute;
        case 'textShadow':
            return textShadowCSS(attribute);
        case 'textStroke':
            return attribute;
        default:
            return attribute;
    }
};

const generateCSSString = (attribute, style) => {
    const { type } = style;
    let css = {
        Desktop: null,
        Tablet: null,
        Mobile: null,
    };
    switch (type) {
        case 'typography':
            css = typographyGenerator(attribute, style, css);
            break;
        case 'textStroke':
            css = textStrokeGenerator(attribute, style, css);
            break;
        case 'background':
            css = backgroundGenerator(attribute, style, css);
            break;
        case 'border':
            css = borderGenerator(attribute, style, css);
            break;
        case 'borderResponsive':
            css = borderResponsiveGenerator(attribute, style, css);
            break;
        case 'dimension':
            css = dimensionGenerator(attribute, style, css);
            break;
        case 'mask':
            css = maskGenerator(attribute, style, css);
            break;
        case 'positioning':
            css = positioningGenerator(attribute, style, css);
            break;
        case 'boxShadow':
        case 'textShadow':
        case 'color':
        default:
            css = plainGenerator(attribute, style, css);
            break;
    }

    return css;
};

export const mergeFontDevice = (fonts) => {
    const googleFamily = {};
    const { uploadPath } = window['GutenverseConfig'];
    const customArr = [];

    fonts.forEach((font) => {
        const { font: fontName, type, weight } = font;
        if (type === 'google') {
            googleFamily[fontName] = googleFamily[fontName] ? [
                ...googleFamily[fontName],
                weight
            ] : [weight];
        }
        if (type === 'custom_font_pro') {
            customArr.push(fontName);
        }
    });
    let googleFont = googleFamily;
    let customFont = !isEmpty(customArr) && applyFilters(
        'gutenverse.v3.apply-custom-font',
        customArr,
        uploadPath
    );

    return [googleFont, customFont];
};

export const getWindow = (elementRef) => {
    if (elementRef.current) {
        return elementRef.current.ownerDocument.defaultView || elementRef.current.ownerDocument.parentWindow;
    }

    return null;
};

export const injectStyleTag = (css, theWindow) => {
    let cssElement = theWindow.document.getElementById('gutenverse-block-css');
    if (!cssElement) {
        cssElement = theWindow.document.createElement('style');
        cssElement.id = 'gutenverse-block-css';
        theWindow.document.head.appendChild(cssElement);
    }
    cssElement.innerHTML = css;
};

const injectStyleToIFrame = (elementId, theWindow, css, isFirstRun, remove = false) => {
    if (theWindow) {
        if (!theWindow.gutenverseCSS) {
            theWindow.gutenverseCSS = {};
        }
        if (remove) {
            delete theWindow.gutenverseCSS[elementId];
        } else {
            theWindow.gutenverseCSS[elementId] = css;
        }
        if (isFirstRun && isOnEditor()) {
            initProcessStyleTag(theWindow);
        } else {
            processStyleTag(theWindow);
        }
    }
};

const generateCSS = (theWindow) => {
    return Object.entries(theWindow.gutenverseCSS)
        .reduce((css, [key, value]) => css + `/* ${key} */ \n${value}\n\n`, '');
};

const processStyleTag = (theWindow) => {
    injectStyleTag(generateCSS(theWindow), theWindow);
};

const initProcessStyleTag = debounce((theWindow) => {
    injectStyleTag(generateCSS(theWindow), theWindow);
}, 500);

const injectFontToIFrame = (elementId, theWindow, font, isFirstRun, remove = false) => {
    if (theWindow) {
        if (!theWindow.gutenverseFont) {
            theWindow.gutenverseFont = {};
        }
        if (remove) {
            delete theWindow.gutenverseFont[elementId];
        } else {
            theWindow.gutenverseFont[elementId] = font;
        }

        if (isFirstRun && isOnEditor()) {
            initProcessFontStyle(theWindow);
        } else {
            processFontStyle(theWindow);
        }
    }
};

const processFontStyle = (theWindow) => {
    injectFontStyle(theWindow);
};

const initProcessFontStyle = debounce((theWindow) => {
    injectFontStyle(theWindow);
}, 500);

const injectFontStyle = (theWindow) => {
    let googleArr = [];
    let customArr = [];

    Object.entries(theWindow.gutenverseFont).forEach(([fontName, value]) => {
        const gFont = value[0];
        if (gFont && typeof gFont === 'object') {
            Object.entries(gFont).forEach(([fontKey, fontWeights]) => {
                if (!fontWeights || fontWeights.length === 0 || fontWeights.includes(undefined)) {
                    fontWeights = ['400', '400italic', '700', '700italic'];
                }
                const uniqueWeights = Array.from(new Set(fontWeights.filter(weight => weight !== undefined)));
                if (!googleArr[fontKey]) {
                    googleArr[fontKey] = uniqueWeights;
                } else {
                    googleArr[fontKey] = Array.from(new Set([...googleArr[fontKey], ...uniqueWeights]));
                }
            });
        }
        if (value[1].length > 0) {
            value[1].forEach(link => {
                let check = customArr.find(el => el === link);
                if (!check) {
                    customArr = [...customArr, link];
                }
            });
        }
    });

    const googleFont = `https://fonts.googleapis.com/css?family=${Object.entries(googleArr)
        .map(([font, weights]) => `${font.replace(' ', '+')}:wght@${weights.join(',')}`)
        .join('|')}`;

    const iframeDoc = theWindow.document;
    const head = iframeDoc.head || iframeDoc.getElementByTagName('head')[0];
    let googleTag = iframeDoc.getElementById('gutenverse-google-font-editor');
    if (!theWindow.gutenverseGoogleFontUrl) {
        theWindow.gutenverseGoogleFontUrl = '';
    }
    if (!googleTag) {
        googleTag = document.createElement('link');
        googleTag.rel = 'stylesheet';
        googleTag.type = 'text/css';
        googleTag.id = 'gutenverse-google-font-editor';
        googleTag.href = googleFont;
        head.appendChild(googleTag);
        theWindow.gutenverseGoogleFontUrl = googleFont;
    } else {
        if (googleFont !== theWindow.gutenverseGoogleFontUrl) {
            googleTag.href = googleFont;
            theWindow.gutenverseGoogleFontUrl = googleFont;
        }
    }

    if (customArr.length > 0) {
        let customTag = iframeDoc.getElementsByClassName('gutenverse-pro-custom-font-editor');
        if (customTag.length > 0) {
            while (customTag.length > 0) {
                customTag[0].remove(); // Always remove the first element since the collection updates dynamically
            }
        } else {
            customArr.forEach(el => {
                customTag = document.createElement('link');
                customTag.rel = 'stylesheet';
                customTag.type = 'text/css';
                customTag.href = el;
                customTag.classList.add('gutenverse-pro-custom-font-editor');
                head.appendChild(customTag);
            });
        }
    }
};

export const useDynamicStyle = (elementId, attributes, getBlockStyle, elementRef) => {
    const { generatedCSS, fontUsed } = useMemo(() => {
        if (elementId) {
            const deviceTypeDesktop = [];
            const deviceTypeTablet = [];
            const deviceTypeMobile = [];
            const gatheredFont = [];

            const blockStyles = getBlockStyle(elementId, attributes);
            for (let index = 0; index < blockStyles.length; index++) {
                const style = blockStyles[index];
                const { type, id } = style;
                const value = attributes[id];
                if ( attributes[id] ) {
                    const css = generateCSSString(value, style);

                    css.Desktop && deviceTypeDesktop.push(css.Desktop);
                    css.Tablet && deviceTypeTablet.push(css.Tablet);
                    css.Mobile && deviceTypeMobile.push(css.Mobile);

                    if (type === 'typography') {
                        const { font, weight } = attributes[id];
                        if (font) {
                            gatheredFont.push({
                                font: font.value,
                                type: font.type,
                                weight: weight
                            });
                        }
                    }
                }
            }

            const generatedCSS = mergeCSSDevice(deviceTypeDesktop, deviceTypeTablet, deviceTypeMobile);
            const fontUsed = mergeFontDevice(gatheredFont);
            return { generatedCSS, fontUsed };
        } else {
            return { generatedCSS: '', fontUsed: [] };
        }
    }, [elementId, attributes]);

    const isFirstRun = useRef(true);
    const iframeWindowRef = useRef(null);

    useEffect(() => {
        if (elementRef) {
            if (!iframeWindowRef.current) {
                iframeWindowRef.current = getWindow(elementRef);
            }
            if (generatedCSS) {
                injectStyleToIFrame(elementId, iframeWindowRef.current, generatedCSS, isFirstRun.current);
            }
            if (fontUsed.some(value => value)) {
                injectFontToIFrame(elementId, iframeWindowRef.current, fontUsed, isFirstRun.current);
            }
        }
        isFirstRun.current = false;
        return () => {
            injectStyleToIFrame(elementId, iframeWindowRef.current, '', 0, 1);
            injectFontToIFrame(elementId, iframeWindowRef.current, '', 0, 1);
            iframeWindowRef.current = null;
        };
    }, [elementId, attributes, elementRef]);

};

export const useGenerateElementId = (clientId, elementId, elementRef) => {
    useEffect(() => {
        if (!elementId) {
            createElementId(clientId);
        } else {
            const { getBlocks } = select('core/block-editor');
            const windowEl = elementRef.current.ownerDocument.defaultView || elementRef.current.ownerDocument.parentWindow;
            if (windowEl?.document) {
                const htmlEl = windowEl.document.documentElement;
                if (!htmlEl.classList.contains('block-editor-block-preview__content-iframe')) {
                    if (recursiveDuplicateCheck(getBlocks(), clientId, elementId)) {
                        createElementId(clientId);
                    }
                }
            }
        }
    }, []);
};

const createElementId = (clientId) => {
    const uniqueId = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
    const { updateBlockAttributes } = dispatch('core/block-editor');
    updateBlockAttributes(clientId, { 'elementId': uniqueId });
};

export const headStyleSheet = (fontUsed, elementRef) => {
    if (elementRef.current) {
        const windowEl = elementRef.current.ownerDocument.defaultView || elementRef.current.ownerDocument.parentWindow;
        if (windowEl?.document) {
            const headEl = windowEl.document.getElementsByTagName('head')[0];
            return (
                <Helmet head={headEl}>
                    <link href={fontUsed[0]} rel="stylesheet" type="text/css" />
                </Helmet>
            );
        }
    }
    return null;
};

export const skipDevice = (attributes, name, callback) => {
    if (attributes[name] === null || attributes[name] === undefined) return;
    if (typeof attributes[name] === 'object') {
        let devices = [];
        ['Desktop', 'Tablet', 'Mobile'].forEach(device => {
            if (!callback(attributes, device)) {
                devices.push(device);
            }else if ((!attributes[name][device] || isEmpty(attributes[name][device]))) {
                devices.push(device);
            }
        });
        return devices;
    } else {
        console.log('make sure the attribute is using device control : ', name);
    }
};
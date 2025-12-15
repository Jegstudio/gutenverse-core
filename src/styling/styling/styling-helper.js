import { useMemo, useEffect, useRef, useState } from '@wordpress/element';
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
import { recursiveDuplicateCheck, responsiveBreakpoint } from 'gutenverse-core/helper';
import { dispatch, select } from '@wordpress/data';
import { boxShadowCSS } from './generator/generator-box-shadow';
import { maskGenerator } from './generator/generator-mask';
import { dimensionGenerator } from './generator/generator-dimension';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import { positioningGenerator } from './generator/generator-positioning';
import { unitPointGenerator } from './generator/generator-unit-point';
import { isEmptyString } from 'gutenverse-core/helper';
import { pointerEventGenerator } from './generator/generator-pointer-events';
import { shapeDividerGenerator } from './generator/generator-shape-divider';
import { signal } from 'gutenverse-core/editor-helper';
import { v4 } from 'uuid';
import { buildGlobalStyle, getGlobalVariable } from './global-style';
import memoize from 'lodash/memoize';
import { slideshowGenerator } from './generator/generator-slideshow';
import { tooltipStyleGenerator } from './generator/generator-tooltip';

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
        case 'textShadow':
            return textShadowCSS(attribute);
        case 'textStroke':
        case 'plain':
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

        case 'unitPoint':
            css = unitPointGenerator(attribute, style, css);
            break;

        case 'pointerEvent':
            css = pointerEventGenerator(attribute, style, css);
            break;

        case 'shapeDivider':
            css = shapeDividerGenerator(attribute, style, css);
            break;

        case 'slideshow':
            css = slideshowGenerator(attribute, style, css);
            break;

        case 'tooltip':
            css = tooltipStyleGenerator(attribute, style, css, generateCSSString);
            break;

        case 'boxShadow':
        case 'textShadow':
        case 'color':
        default:
            css = plainGenerator(attribute, style, css);
            break;
    }

    css = applyFilters(
        'gutenverse.generate.css.string',
        css,
        {
            attribute,
            style
        }
    );

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

export const getWindowId = (elementRef) => {
    const theWindow = getWindow(elementRef);

    if (theWindow) {
        if (!theWindow.gutenverseWindowId) {
            theWindow.gutenverseWindowId = v4();
        }

        return theWindow.gutenverseWindowId;
    }
    return null;
};

export const injectStyleTag = (css, theWindow, cssId = 'gutenverse-block-css', place = 'head') => {
    let cssElement = theWindow?.document?.getElementById(cssId);

    if (!cssElement) {
        cssElement = theWindow?.document?.createElement('style');

        if (cssElement) {
            cssElement.id = cssId;
            switch (place) {
                case 'body':
                    theWindow.document.body.appendChild(cssElement);
                    break;

                default:
                    theWindow.document.head.appendChild(cssElement);
                    break;
            }
        }
    }

    if (cssElement) {
        cssElement.innerHTML = css;
    }
};

const injectStyleToIFrame = (elementId, theWindow, css, remove = false) => {
    if (!theWindow) {
        return;
    }

    if (!theWindow.gutenverseCSS) {
        theWindow.gutenverseCSS = {};
    }

    if (remove) {
        delete theWindow.gutenverseCSS[elementId];
    } else {
        theWindow.gutenverseCSS[elementId] = css;
    }

    injectStyleTag(Object.entries(theWindow.gutenverseCSS).reduce((css, [key, value]) => css + `/* ${key} */ \n${value}\n\n`, ''), theWindow);
};

const injectFontToIFrame = (elementId, theWindow, font, remove = false) => {
    if (!theWindow) {
        return;
    }

    if (!theWindow.gutenverseFont) {
        theWindow.gutenverseFont = {};
    }

    if (remove) {
        delete theWindow.gutenverseFont[elementId];
    } else {
        theWindow.gutenverseFont[elementId] = font;
    }

    let googleArr = [];
    let customArr = [];

    Object.values(theWindow.gutenverseFont).forEach(value => {
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

    injectFontStyle(theWindow, {
        googleArr,
        customArr,
        customFontClass: 'gutenverse-pro-custom-font-editor',
        googleFontId: 'gutenverse-google-font-editor',
        storeName: 'generalGutenverseGoogleFontUrl'
    });
};

const injectFontStyle = (theWindow, props) => {
    let { googleArr, customArr, customFontClass, googleFontId, storeName } = props;
    const iframeDoc = theWindow?.document;
    if (iframeDoc) {
        const head = iframeDoc.head || iframeDoc.getElementByTagName('head')[0];
        const defaultWeight = ['400', '400italic', '700', '700italic'];
        for (const key in googleArr) {
            googleArr[key] = [...new Set([...googleArr[key], ...defaultWeight])];
        }

        const googleFont = `https://fonts.googleapis.com/css?family=${Object.entries(googleArr)
            .map(([font, weights]) => `${font.replace(' ', '+')}:${weights.join(',')}`)
            .join('|')}`;

        let googleTag = iframeDoc.getElementById(googleFontId);

        if (!theWindow[storeName]) {
            theWindow[storeName] = '';
        }

        if (!googleTag) {
            googleTag = document.createElement('link');
            googleTag.rel = 'stylesheet';
            googleTag.type = 'text/css';
            googleTag.id = googleFontId;
            googleTag.href = googleFont;
            head.appendChild(googleTag);
            theWindow[storeName] = googleFont;
        } else {
            if (googleFont !== theWindow[storeName]) {
                googleTag.href = googleFont;
                theWindow[storeName] = googleFont;
            }
        }

        if (customArr.length > 0) {
            let customTag = iframeDoc.getElementsByClassName(customFontClass);
            if (customTag.length > 0) {
                while (customTag.length > 0) {
                    customTag[0].remove(); // Always remove the first element since the collection updates dynamically
                }
            }
            customArr.forEach(el => {
                customTag = document.createElement('link');
                customTag.rel = 'stylesheet';
                customTag.type = 'text/css';
                customTag.href = el;
                customTag.classList.add(customFontClass);
                head.appendChild(customTag);
            });
        }
    }

};

const extractStyleFont = (elementId, attributes, arrStyle) => {
    let deviceTypeDesktop = [];
    let deviceTypeTablet = [];
    let deviceTypeMobile = [];
    let gatheredFont = [];
    let blockStyles = arrStyle;

    if (typeof arrStyle === 'function') {
        blockStyles = arrStyle(elementId, attributes);
    }

    for (let index = 0; index < blockStyles.length; index++) {
        const style = blockStyles[index];
        const { type, id } = style;
        const value = attributes[id];

        if (attributes[id]) {
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

            if (type === 'repeater') {
                let { repeaterOpt } = style;
                value.forEach((el, index) => {
                    const { deviceTypeDesktop: desktop, deviceTypeTablet: tablet, deviceTypeMobile: mobile, gatheredFont: font } = extractStyleFont(elementId, el, repeaterOpt[index]);
                    deviceTypeDesktop = [...deviceTypeDesktop, ...desktop];
                    deviceTypeTablet = [...deviceTypeTablet, ...tablet];
                    deviceTypeMobile = [...deviceTypeMobile, ...mobile];
                    gatheredFont = [...gatheredFont, ...font];
                });
            }
        }
    }
    return { deviceTypeDesktop, deviceTypeMobile, deviceTypeTablet, gatheredFont };
};

const createGlobalKey = ({ uuid, globalKey }) => `${uuid}-${globalKey}`;

const memoizeGlobalStyle = memoize(({ theWindow }) => {
    const globalVariables = getGlobalVariable();
    const globalCSS = buildGlobalStyle(globalVariables);

    injectStyleTag(globalCSS, theWindow, 'gutenverse-global-style-css-v2', 'body');

    injectFontStyle(theWindow, {
        googleArr: globalVariables.googleArr,
        customArr: globalVariables.customArr,
        customFontClass: 'gutenverse-pro-global-custom-font-editor',
        googleFontId: 'gutenverse-global-google-font-editor',
        storeName: 'globalGutenverseGoogleFontUrl'
    });
}, createGlobalKey);

export const useDynamicStyle = (elementId, attributes, getBlockStyle, elementRef) => {
    const [confirmSignal, setConfirmSignal] = useState(false);
    const [globalStyleSignal, setGlobalStyleSignal] = useState(null);
    const [iframeWindowId, setIframeWindowId] = useState('');

    const { generatedCSS, fontUsed } = useMemo(() => {
        if (elementId) {
            const { deviceTypeDesktop, deviceTypeMobile, deviceTypeTablet, gatheredFont } = extractStyleFont(elementId, attributes, getBlockStyle);
            const generatedCSS = mergeCSSDevice(deviceTypeDesktop, deviceTypeTablet, deviceTypeMobile);
            const fontUsed = mergeFontDevice(gatheredFont);
            return { generatedCSS, fontUsed };
        } else {
            return { generatedCSS: '', fontUsed: [] };
        }
    }, [elementId, attributes, confirmSignal]);

    const iframeWindowRef = useRef(null);
    const idHolder = useRef(null);

    useEffect(() => {
        idHolder.current = elementId;
    }, [elementId]);

    useEffect(() => {
        const bindStyling = signal.afterFilterSignal.add(() => setConfirmSignal(true));
        const bindGlobalStyling = signal.globalStyleSignal.add((key) => setGlobalStyleSignal(key));

        return () => {
            injectStyleToIFrame(idHolder.current, iframeWindowRef.current, '', 1);
            injectFontToIFrame(idHolder.current, iframeWindowRef.current, '', 1);
            iframeWindowRef.current = null;
            bindStyling.detach();
            bindGlobalStyling.detach();
        };
    }, []);

    useEffect(() => {
        if (elementRef) {
            if (!iframeWindowRef.current) {
                iframeWindowRef.current = getWindow(elementRef);
                const windowId = getWindowId(elementRef);
                setIframeWindowId(windowId);
            }

            injectStyleToIFrame(idHolder.current, iframeWindowRef.current, generatedCSS);

            if (fontUsed.some(value => value)) {
                injectFontToIFrame(idHolder.current, iframeWindowRef.current, fontUsed);
            }
        }
    }, [elementId, attributes, confirmSignal, elementRef]);

    useEffect(() => {
        if (iframeWindowId !== '') {
            memoizeGlobalStyle({
                uuid: iframeWindowId,
                globalKey: globalStyleSignal,
                theWindow: iframeWindowRef.current
            });
        }
    }, [iframeWindowId, globalStyleSignal]);

    //make sure the generated css element always at the end of iFrame head
    useEffect(() => {
        if (!iframeWindowRef.current) return;

        const head = iframeWindowRef.current.document.head;
        if (!head) return;

        const styleEl = head.querySelector('#gutenverse-block-css');
        if (!styleEl) return;

        const moveToEndIfNeeded = () => {
            const lastEl = head.lastElementChild;
            const liveStyleEl = head.querySelector('[id^="gutenverse-temp-css-"]');
            if (styleEl !== lastEl && lastEl !== liveStyleEl) {
                head.removeChild(styleEl);
                head.appendChild(styleEl);
            }
        };

        const timeout = setTimeout(moveToEndIfNeeded, 1000);
        const observer = new MutationObserver(() => {
            moveToEndIfNeeded();
        });

        observer.observe(head, { childList: true });

        return () => {
            clearTimeout(timeout);
            observer.disconnect();
        };
    }, [iframeWindowRef.current]);
};

const populateStyle = (cssElement, currentStyleId, generatedCSS) => {
    const wrapCurrentStyle = '' === generatedCSS ? '' : `${currentStyleId}\n ${generatedCSS}\n ${currentStyleId} `;

    const escapedId = currentStyleId.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedId + '(.+?)' + escapedId, 's');

    if (regex.test(cssElement.innerHTML)) {
        cssElement.innerHTML = cssElement.innerHTML.replace(regex, wrapCurrentStyle);
    } else {
        cssElement.innerHTML += wrapCurrentStyle;
    }
};

export const updateLiveStyle = (props) => {
    //add styleId to keep the style
    const { elementId, attributes, styles: liveStyles, elementRef, timeout = true, styleId = null } = props;
    if (!elementRef) {
        //eslint-disable-next-line no-console
        console.warn('ElementRef is Missing!');
        return;
    }

    const currentStyleId = styleId === null ? `/* ${elementId} */` : `/* ${styleId}-${elementId} */`;
    let deviceTypeDesktop = [];
    let deviceTypeTablet = [];
    let deviceTypeMobile = [];

    for (let index = 0; index < liveStyles.length; index++) {

        const liveStyle = liveStyles[index];
        const { type, id } = liveStyle;
        const attribute = attributes[id];
        if (attribute) {
            const css = generateCSSString(attribute, liveStyle);
            css.Desktop && deviceTypeDesktop.push(css.Desktop);
            css.Tablet && deviceTypeTablet.push(css.Tablet);
            css.Mobile && deviceTypeMobile.push(css.Mobile);

            if (type === 'repeater') {
                let { repeaterOpt } = liveStyle;

                attribute.forEach((el, index) => {
                    const { deviceTypeDesktop: desktop, deviceTypeTablet: tablet, deviceTypeMobile: mobile } = extractStyleFont(elementId, el, repeaterOpt[index]);

                    deviceTypeDesktop = [...deviceTypeDesktop, ...desktop];
                    deviceTypeTablet = [...deviceTypeTablet, ...tablet];
                    deviceTypeMobile = [...deviceTypeMobile, ...mobile];
                });
            }
        } else {
            if ('injectCSS' === type) {
                const css = generateCSSString(attribute, liveStyle);
                css.Desktop && deviceTypeDesktop.push(css.Desktop);
            }
        }

    }

    const generatedCSS = mergeCSSDevice(deviceTypeDesktop, deviceTypeTablet, deviceTypeMobile);
    let theWindow = getWindow(elementRef);

    if (theWindow) {

        const tagId = styleId === null ? 'gutenverse-temp-css-' + elementId : 'gutenverse-live-style-css';
        let cssElement = theWindow.document.getElementById(tagId);

        if (!cssElement) {
            cssElement = theWindow.document.createElement('style');
            cssElement.id = tagId;
            theWindow.document.body.appendChild(cssElement);
        }

        populateStyle(cssElement, currentStyleId, generatedCSS);

        const timeoutId = timeout && liveStyles.length > 0 && setTimeout(() => {
            if (cssElement.parentNode) {
                populateStyle(cssElement, currentStyleId, '');
                !cssElement.innerHTML.trim() && cssElement.parentNode.removeChild(cssElement);
            }
        }, 1000);

        return timeoutId;
    }
};

// Call this to remove any remaining temporary styles.
export const removeLiveStyle = (styleId, elementRef, elementId) => {
    const currentStyleId = styleId === null ? `/* ${elementId} */` : `/* ${styleId}-${elementId} */`;
    const tagId = styleId === null ? 'gutenverse-temp-css-' + elementId : 'gutenverse-live-style-css';
    let theWindow = getWindow(elementRef);
    let cssElement = theWindow.document.getElementById(tagId);

    if (cssElement && cssElement.parentNode) {
        populateStyle(cssElement, currentStyleId, '');
        !cssElement.innerHTML.trim() && cssElement.parentNode.removeChild(cssElement);
    }
};

export const useGenerateElementId = (clientId, elementId, elementRef) => {
    useEffect(() => {
        if (!elementId) {
            createElementId(clientId);
        } else {
            const { getBlocks } = select('core/block-editor');
            const windowEl = elementRef?.current?.ownerDocument?.defaultView || elementRef?.current?.ownerDocument?.parentWindow;

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
            } else if ((!attributes[name][device] || isEmpty(attributes[name][device]))) {
                devices.push(device);
            }
        });

        return devices;
    } else {
        //eslint-disable-next-line no-console
        console.log('make sure the attribute is using device control : ', name);
    }
};

export const handleFilterImage = (props) => {
    const { brightness, contrast, blur, saturation, hue } = props;

    return `brightness( ${!isEmptyString(brightness) ? brightness : 100}% )
        contrast( ${!isEmptyString(contrast) ? contrast : 100}% )
        saturate( ${!isEmptyString(saturation) ? saturation : 100}% )
        blur( ${!isEmptyString(blur) ? blur : 0}px )
        hue-rotate( ${!isEmptyString(hue) ? hue : 0}deg );`;
};

export const customHandleBackground = (background) => {
    const {
        gradientColor,
        gradientType = 'linear',
        gradientAngle = 180,
        gradientRadial = 'center center'
    } = background;
    let style = '';

    if (gradientColor !== undefined) {
        const colors = gradientColor.map(gradient => `${gradient.color} ${gradient.offset * 100}%`);

        if (gradientType === 'radial') {
            style = `radial-gradient(at ${gradientRadial}, ${colors.join(',')});`;
        } else {
            style = `linear-gradient(${gradientAngle}deg, ${colors.join(',')});`;
        }
    }

    return style;
};

const injectScriptTag = (tagId, theWindow, src) => {
    let scriptTag = theWindow.document.getElementById(tagId);

    if (!scriptTag) {
        scriptTag = theWindow.document.createElement('script');
        scriptTag.id = tagId;
        scriptTag.src = src;
        theWindow.document.head.appendChild(scriptTag);
    }
};

const createScriptKey = ({ windowId, handle }) => `${windowId}-${handle}`;

const memoizeScript = memoize(({ handle, theWindow, url }) => {
    injectScriptTag(handle, theWindow, url);
}, createScriptKey);

export const useDynamicScript = (elementRef) => {
    const scriptList = applyFilters(
        'gutenverse.dynamic.script',
        [],
        null
    );
    const iframeWindowRef = useRef(null);
    const [iframeWindowId, setIframeWindowId] = useState('');

    useEffect(() => {
        if (!iframeWindowRef.current) {
            iframeWindowRef.current = getWindow(elementRef);
            const windowId = getWindowId(elementRef);
            setIframeWindowId(windowId);
        }

        return () => {
            iframeWindowRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (iframeWindowId) {
            scriptList?.map(script => {
                memoizeScript({ windowId: iframeWindowId, handle: script?.id, theWindow: iframeWindowRef.current, url: script?.src });
            });
        }
    }, [iframeWindowId]);
};
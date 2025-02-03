import { useMemo, useEffect } from '@wordpress/element';
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
        case 'boxShadow':
        case 'textShadow':
        case 'color':
        default:
            css = plainGenerator(attribute, style, css);
            break;
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
        if (elementId) {
            const deviceTypeDesktop = [];
            const deviceTypeTablet = [];
            const deviceTypeMobile = [];
            const gatheredFont = [];

            const blockStyles = getBlockStyle(elementId);
            for (let index = 0; index < blockStyles.length; index++) {
                const style = blockStyles[index];
                const { type, id } = style;
                if ( attributes[id] ) {
                    const value = attributes[id];
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

    return [generatedCSS, fontUsed];
};

export const useGenerateElementId = (clientId, elementId, elementRef) => {
    useEffect(() => {
        if (!elementId) {
            createElementId(clientId);
        } else {
            const { getBlocks } = select('core/block-editor');
            const windowEl = elementRef.current.ownerDocument.defaultView || elementRef.current.ownerDocument.parentWindow;
            if (windowEl?.document) {
                const htmlEl = windowEl.document.getElementsByTagName('html')[0];
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

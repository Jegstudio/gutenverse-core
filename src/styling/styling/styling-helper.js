import { useMemo, useEffect } from '@wordpress/element';
import { getColor } from './handler/handle-color';
import { plainGenerator } from './generator/generator-plain';
import { typographyGenerator } from './generator/generator-typography';
import { textShadowCSS } from './generator/generator-text-shadow';
import { textStrokeGenerator } from './generator/generator-text-stroke';
import cryptoRandomString from 'crypto-random-string';
import { Helmet, u } from 'gutenverse-core/components';
import { backgroundGenerator } from './generator/generator-background';
import { borderGenerator } from './generator/generator-border';
import { borderResponsiveGenerator } from './generator/generator-border-responsive';
import { recursiveDuplicateCheck } from 'gutenverse-core/helper';
import { select } from '@wordpress/data';
import { boxShadowCSS } from './generator/generator-box-shadow';
import { maskGenerator } from './generator/generator-mask';
import { getDimension } from './handler/handle-dimension';
import { dimensionGenerator } from './generator/generator-dimension';

// const cssDeviceString = (elementId, attribute, prefix) => {
//     let css = [];

//     if (attribute['Desktop']) {
//         css.push(`.${elementId} { ${prefix}: ${attribute['Desktop']}; }`);
//     } else {
//         css.push(null);
//     }

//     if (attribute['Tablet']) {
//         css.push(`.${elementId} { ${prefix}: ${attribute['Tablet']}; }`);
//     } else {
//         css.push(null);
//     }

//     if (attribute['Mobile']) {
//         css.push(`.${elementId} { ${prefix}: ${attribute['Mobile']}; }`);
//     } else {
//         css.push(null);
//     }

//     return css;
// };

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
    const {type} = style;
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
        if(elementId){
            const deviceTypeDesktop = [];
            const deviceTypeTablet = [];
            const deviceTypeMobile = [];
            const gatheredFont = [];

            getBlockStyle(elementId).forEach((style) => {
                const { type, id } = style;
                if (attributes[id]) {
                    const value = attributes[id];
                    const css = generateCSSString(value, style);

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
        }
    }, [elementId, attributes]);

    return [generatedCSS, fontUsed];
};

export const useGenerateElementId = (clientId, elementId, setAttributes, styleRef) => {
    useEffect(() => {
        if( !elementId ){
            const uniqueId = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
            setAttributes({
                elementId: uniqueId,
            });
        }else{
            const { getBlocks } = select('core/block-editor');
            console.log(getBlocks());
            const flag = recursiveDuplicateCheck(getBlocks(), clientId, elementId);
            const parent = u(styleRef).closest('html');
            console.log(flag);
            if (flag && !parent.hasClass('block-editor-block-preview__content-iframe')) {
                const uniqueId = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
                console.log(uniqueId);
                setAttributes({
                    elementId: uniqueId,
                });
            }
        }
    }, [])
}

export const headElement = (fontUsed, styleRef) => {
    console.log(fontUsed, styleRef)
    if (styleRef.current) {
        const windowEl = styleRef.current.ownerDocument.defaultView || styleRef.current.ownerDocument.parentWindow;
        if (windowEl?.document) {
            const headEl = windowEl.document.getElementsByTagName('head')[0];
            return <Helmet head={headEl}>
                <link href={fontUsed[0]} rel="stylesheet" type="text/css" />
            </Helmet>;
        }
    }
    return null;
};

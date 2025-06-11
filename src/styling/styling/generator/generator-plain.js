import { isNotEmpty } from 'gutenverse-core/helper';
import { renderValue } from '../styling-helper';
import { handleAlign, handleAlignReverse } from '../handler/handle-align';
import { handleFilterImage, customHandleBackground } from '../styling-helper';
import { applyFilters } from '@wordpress/hooks';

const cssGenerator = (attribute, style, css) => {
    const { selector, responsive = false, otherAttribute, responsiveSelector = false, skip_device = [] } = style;
    if (!responsive) {
        const value = multiProperty(attribute, style, otherAttribute);
        if (isNotEmpty(value)) css.Desktop += ` ${selector} { ${value} } `;
    }

    if (responsive) {
        let selectors = responsiveSelector ? { ...selector } : {
            'Desktop': selector,
            'Tablet': selector,
            'Mobile': selector,
        };

        if (isNotEmpty(attribute['Desktop']) && skip_device.includes('Desktop') === false) {
            const value = multiProperty(attribute['Desktop'], style, otherAttribute, 'Desktop');
            if (isNotEmpty(value)) css.Desktop += ` ${selectors['Desktop']} { ${value} } `;
        }

        if (isNotEmpty(attribute['Tablet']) && skip_device.includes('Tablet') === false) {
            const value = multiProperty(attribute['Tablet'], style, otherAttribute, 'Tablet');
            if (isNotEmpty(value)) css.Tablet += ` ${selectors['Tablet']} { ${value} } `;
        }

        if (isNotEmpty(attribute['Mobile']) && skip_device.includes('Mobile') === false) {
            const value = multiProperty(attribute['Mobile'], style, otherAttribute, 'Mobile');
            if (isNotEmpty(value)) css.Mobile += ` ${selectors['Mobile']} { ${value} } `;
        }
    }
    return css;
};
export const plainGenerator = (attribute, style, css) => {
    const { multiAttr } = style;
    css = {
        Desktop: '',
        Tablet: '',
        Mobile: '',
    };

    if (isNotEmpty(multiAttr)) {
        Object.keys(multiAttr).forEach(el => {
            css = cssGenerator(multiAttr[el], style, css);
        });
    } else {
        css = cssGenerator(attribute, style, css);
    }
    return css;
};

const multiProperty = (attribute, props, otherAttribute, device) => {
    const { type, properties } = props;
    let styles = '';
    if (properties && properties.length > 0) {
        properties.forEach(el => {
            if (el.name) {
                let value = generateValue(attribute, el, type, otherAttribute, device);
                if (isNotEmpty(value)) {
                    styles += ` ${el.name}: ${value}; `;
                }
            }
        });
    }
    return styles;
};

const generateValue = (attribute, props, type, otherAttribute, deviceType = null) => {
    let value = null;
    const { pattern, patternValues, valueType, functionName, functionProps, excludeValue = [], staticValue } = props;
    switch (valueType) {
        case 'function':
            value = renderFunctionValue(functionName, attribute, functionProps, otherAttribute, deviceType);
            break;
        case 'pattern':
            value = renderPatternValues(pattern, patternValues, attribute);
            break;
        case 'exclude':
            if (!excludeValue?.includes(attribute)) {
                value = renderValue(type, attribute);
            }
            break;
        case 'static':
            value = staticValue;
            break;
        case 'direct':
        default:
            value = renderValue(type, attribute, otherAttribute);
            break;
    }
    return value;
};

const renderFunctionValue = (functionName, attribute, functionProps = {}, otherAttribute, device) => {
    let value = null;
    switch (functionName) {
        case 'handleAlign':
            value = handleAlign(attribute);
            break;
        case 'handleFilterImage':
            value = handleFilterImage(attribute);
            break;
        case 'handleAlignReverse':
            value = handleAlignReverse(attribute);
            break;
        case 'customHandleBackground':
            value = customHandleBackground(attribute);
            break;
        case 'handleOpacity':
            value = attribute;
            if (1 < value && 100 >= value) {
                value = value / 100;
            }
            break;
        case 'handleContainerPaddingPopup':
            const { dimension, unit = 'px' } = attribute || {};
            const { top = 10, bottom = 10 } = dimension || {};
            value = `calc(100vh - ${parseFloat(top) + parseFloat(bottom)}${unit})`;
            break;
        case 'handleSimpleCondition':
            const { valueTrue, valueFalse } = functionProps;
            value = attribute ? valueTrue : valueFalse;
            break;
        case 'searchButtonContainerWidth':
            if (isNotEmpty(attribute)) {
                const diff = (attribute.unit === 'px') ? 2 : (attribute.unit === '%') ? 0.2 : 0.12;
                value = `calc(100% - ${parseInt(attribute.point) + diff}${attribute.unit})`;
            }
            break;
        case 'handleDefaultValue':
            value = attribute !== 'default' && attribute;
            break;
        case 'handleGradient':
            const { angle } = functionProps;
            if (isNotEmpty(attribute)) {
                const colors = attribute.map(gradient => `${gradient.color} ${gradient.offset * 100}%`);
                value = `linear-gradient(${angle}deg, ${colors.join(',')})`;
            }
            break;
        default:
            value = '';
            break;
    }
    const props = {
        functionName,
        attribute,
        functionProps,
        otherAttribute,
        device
    };
    value = applyFilters('gutenverse-css-generator-plain-function', value, props);
    return value;
};

export const renderPatternValues = (pattern, patternValues, attribute) => {
    let newString = pattern;
    if (patternValues) {
        newString = newString.replace(/\{(\w+)\}/g, (_, str) => {
            if (patternValues[str] && patternValues[str].type === 'direct') {
                return attribute ? attribute : `{${str}}`;
            }
            if (patternValues[str] && patternValues[str].type === 'attribute') {
                return attribute[patternValues[str].key] ? attribute[patternValues[str].key] : `{${str}}`;
            }
            return `{${str}}`;
        });
        if (newString === pattern) {
            return '';
        }
    }
    return newString;
};
import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    isNotEmpty(attributes['width']) && data.push({
        'type': 'plain',
        'id': 'width',
        'responsive': true,
        'property': ['width'],
        'selector': `.${elementId}`,
        'valueCSS' : '{value}%',
        'values' : {
            'value' : {
                'type' : 'direct',
            }
        }
    });

    isNotEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'background',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:not(.background-animated) > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper, .${elementId}.background-animated > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper > .guten-background-animated .animated-layer`,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:not(.background-animated) > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper, .${elementId}.background-animated > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:hover > .guten-background-animated .animated-layer`,
    });

    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': '',
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': '',
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': '',
    });

    isNotEmpty(attributes['borderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveHover',
        'selector': '',
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'property': ['box-shadow'],
        'selector': '',
    });

    isNotEmpty(attributes['boxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadowHover',
        'property': ['box-shadow'],
        'selector': '',
    });

    isNotEmpty(attributes['padding']) && data.push({
        'type': 'dimension',
        'id': 'padding',
        'responsive': true,
        'property': ['padding'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['margin']) && data.push({
        'type': 'dimension',
        'id': 'margin',
        'responsive': true,
        'property': ['margin'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['zIndex']) && data.push({
        'type': 'plain',
        'id': 'zIndex',
        'responsive': true,
        'property': ['z-index'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    return data;
};


export default getBlockStyle;
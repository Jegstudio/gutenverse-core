import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    isNotEmpty(attributes['width']) && data.push({
        'type': 'plain',
        'id': 'width',
        'responsive': true,
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}%',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    });

    isNotEmpty(attributes['verticalAlign']) && data.push({
        'type': 'plain',
        'id': 'verticalAlign',
        'responsive': true,
        'selector': `.guten-section > .guten-container > .${elementId}.guten-column > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper > .block-editor-inner-blocks > .block-editor-block-list__layout`,
        'properties': [
            {
                'name': 'align-content',
                'valueType': 'direct',
            },
            {
                'name': 'align-items',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['horizontalAlign']) && data.push({
        'type': 'plain',
        'id': 'horizontalAlign',
        'responsive': true,
        'selector': `.guten-section > .guten-container > .${elementId}.guten-column > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper > .block-editor-inner-blocks > .block-editor-block-list__layout`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['horizontalAlign']) && data.push({
        'type': 'plain',
        'id': 'horizontalAlign',
        'responsive': true,
        'selector': `.guten-section > .guten-container > .${elementId}.guten-column > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper > .block-editor-inner-blocks`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '100%',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    });

    isNotEmpty(attributes['order']) && data.push({
        'type': 'plain',
        'id': 'order',
        'responsive': true,
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'order',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['blur']) && data.push({
        'type': 'plain',
        'id': 'blur',
        'responsive': true,
        'selector': `.guten-column.${elementId} .sticky-wrapper .guten-column-wrapper:before`,
        'properties': [
            {
                'name': '-webkit-backdrop-filter',
                'valueType': 'pattern',
                'pattern': 'blur({value}px)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
            {
                'name': 'backdrop-filter',
                'valueType': 'pattern',
                'pattern': 'blur({value}px)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    });

    isNotEmpty(attributes['blurHover']) && data.push({
        'type': 'plain',
        'id': 'blurHover',
        'responsive': true,
        'selector': `.guten-column.${elementId} .sticky-wrapper .guten-column-wrapper:hover:before`,
        'properties': [
            {
                'name': '-webkit-backdrop-filter',
                'valueType': 'pattern',
                'pattern': 'blur({value}px)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
            {
                'name': 'backdrop-filter',
                'valueType': 'pattern',
                'pattern': 'blur({value}px)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    });

    isNotEmpty(attributes['pointer']) && data.push({
        'type': 'pointerEvent',
        'id': 'pointer',
        'selector': `.${elementId}`,
        'responsive': true,
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

    isNotEmpty(attributes['backgroundOverlay']) && data.push({
        'type': 'background',
        'id': 'backgroundOverlay',
        'selector': `.${elementId} > .guten-background-overlay`,
    });

    isNotEmpty(attributes['backgroundOverlayHover']) && data.push({
        'type': 'background',
        'id': 'backgroundOverlayHover',
        'selector': `.${elementId}:hover > .guten-background-overlay`,
    });

    isNotEmpty(attributes['opacity']) && data.push({
        'type': 'plain',
        'id': 'opacity',
        'selector': `.${elementId} > .guten-background-overlay`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['opacityHover']) && data.push({
        'type': 'plain',
        'id': 'opacityHover',
        'selector': `.${elementId}:hover > .guten-background-overlay`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct',
            }
        ],
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
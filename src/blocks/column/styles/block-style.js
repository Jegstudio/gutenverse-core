import { isNotEmpty } from 'gutenverse-core/helper';
import { applyFilters } from '@wordpress/hooks';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    isNotEmpty(attributes['width']) && data.push({
        'type': 'plain',
        'id': 'width',
        'responsive': true,
        'responsiveSelector': true,
        'selector': {
            'Desktop': `.${elementId}`,
            'Tablet': `.${elementId}`,
            'Mobile': `.guten-element.${elementId}`,
        },
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

    isNotEmpty(attributes['forceColumnHundred']) && data.push({
        'type': 'plain',
        'id': 'forceColumnHundred',
        'responsive': true,
        'responsiveSelector': true,
        'selector': {
            'Desktop': `.${elementId}`,
            'Tablet': `.${elementId}`,
            'Mobile': `.guten-element.${elementId}`,
        },
        'properties': [
            {
                'name': 'width',
                'valueType': 'static',
                'staticValue': '100%',
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:not(.background-animated) > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:hover, .${elementId}.background-animated > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:hover > .guten-background-animated .animated-layer`,
    });

    isNotEmpty(attributes['backgroundOverlay']) && data.push({
        'type': 'background',
        'id': 'backgroundOverlay',
        'selector': ` .${elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper > .guten-background-overlay, .${elementId}.background-animated > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper > .guten-background-overlay`,
    });

    isNotEmpty(attributes['backgroundOverlayHover']) && data.push({
        'type': 'background',
        'id': 'backgroundOverlayHover',
        'selector': `.${elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:hover > .guten-background-overlay, .${elementId}.background-animated > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:hover > .guten-background-overlay`,
    });

    isNotEmpty(attributes['opacity']) && data.push({
        'type': 'plain',
        'id': 'opacity',
        'selector': ` .${elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper > .guten-background-overlay, .${elementId}.background-animated > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper > .guten-background-overlay`,
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
        'selector': `.${elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:hover > .guten-background-overlay, .${elementId}.background-animated > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:hover > .guten-background-overlay`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:hover`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper`,
    });

    isNotEmpty(attributes['borderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper`,
    });

    isNotEmpty(attributes['boxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:hover`,
    });

    isNotEmpty(attributes['padding']) && data.push({
        'type': 'dimension',
        'id': 'padding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper`,
    });

    isNotEmpty(attributes['margin']) && data.push({
        'type': 'dimension',
        'id': 'margin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper`,
    });

    isNotEmpty(attributes['zIndex']) && data.push({
        'type': 'plain',
        'id': 'zIndex',
        'responsive': true,
        'properties': [
            {
                'name': 'z-index',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper`,
    });

    isNotEmpty(attributes['typographyHeadingColor']) && data.push({
        'type': 'color',
        'id': 'typographyHeadingColor',
        'selector': `.${elementId} .wp-block-gutenverse-heading`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['typographyTextColor']) && data.push({
        'type': 'color',
        'id': 'typographyTextColor',
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['typographyLinkColor']) && data.push({
        'type': 'color',
        'id': 'typographyLinkColor',
        'selector': `.${elementId} a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['typographyLinkHoverColor']) && data.push({
        'type': 'color',
        'id': 'typographyLinkHoverColor',
        'selector': `.${elementId} a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['typographyTextAlign']) && data.push({
        'type': 'color',
        'id': 'typographyTextAlign',
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'pattern',
                'pattern': '{value}',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    });

    return [
        ...data,
        ...applyFilters(
            'gutenverse.column.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};


export default getBlockStyle;
import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    isNotEmpty(attributes['width']) && data.push({
        'type': 'plain',
        'id': 'width',
        'responsive': true,
        'selector': `section.guten-section.${elementId}.layout-boxed > .guten-container`,
        'properties': [
            {
                'name': 'max-width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    });

    isNotEmpty(attributes['wrapColumn']) && data.push({
        'type': 'plain',
        'id': 'wrapColumn',
        'responsive': true,
        'selector': `.${elementId} > .guten-container`,
        'properties': [
            {
                'name': 'flex-wrap',
                'valueType': 'pattern',
                'pattern': 'wrap',
            }
        ],
    });

    isNotEmpty(attributes['wrapColumn']) && data.push({
        'type': 'plain',
        'id': 'wrapColumn',
        'responsive': true,
        'selector': `.${elementId} > .guten-container > .guten-column`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '100%',
            }
        ],
    });

    isNotEmpty(attributes['heightControl']) && attributes['heightControl'] === 'fit' && data.push({
        'type': 'plain',
        'id': 'heightControl',
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '100vh',
            }
        ],
    });

    isNotEmpty(attributes['heightControl']) && attributes['heightControl'] === 'fit' && data.push({
        'type': 'plain',
        'id': 'heightControl',
        'selector': `.${elementId} > .guten-container`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '100%',
            }
        ],
    });

    isNotEmpty(attributes['heightControl']) && attributes['heightControl'] === 'min' && data.push({
        'type': 'unitPoint',
        'id': 'height',
        'responsive': true,
        'selector': `.${elementId} > .guten-container`,
        'properties': [
            {
                'name': 'min-height',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['verticalAlign']) && attributes['verticalAlign'] !== 'default' && data.push({
        'type': 'plain',
        'id': 'verticalAlign',
        'selector': isNotEmpty(attributes['align']) && attributes['align'] === 'stretch' ?
            `section.guten-element.${elementId} > .guten-container > .guten-column > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper > .block-editor-inner-blocks > .block-editor-block-list__layout` :
            `section.guten-element.${elementId} > .guten-container`,
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

    isNotEmpty(attributes['clipMargin']) && isNotEmpty(attributes['overflow']) && 'clip' === attributes['overflow'] && data.push({
        'type': 'unitPoint',
        'id': 'clipMargin',
        'responsive': true,
        'selector': `section.guten-section.${elementId}`,
        'properties': [
            {
                'name': 'overflow-clip-margin',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['blur']) && data.push({
        'type': 'plain',
        'id': 'blur',
        'responsive': true,
        'selector': `section.guten-section.${elementId}:before`,
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
        'selector': `section.guten-section.${elementId}:hover::before`,
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
        'selector': `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`,
        'responsive': true,
    });

    isNotEmpty(attributes['topDivider']) && data.push({
        'type': 'shapeDivider',
        'id': 'topDivider',
        'selector': `section.guten-section.${elementId} .guten-shape-divider.guten-shape-divider-top svg, section.guten-section.${elementId} .guten-shape-divider.guten-shape-divider-top .guten-shape-fill path`,
    });

    isNotEmpty(attributes['bottomDivider']) && data.push({
        'type': 'shapeDivider',
        'id': 'bottomDivider',
        'selector': `section.guten-section.${elementId} .guten-shape-divider.guten-shape-divider-bottom svg, section.guten-section.${elementId} .guten-shape-divider.guten-shape-divider-bottom .guten-shape-fill path`,
    });

    isNotEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'background',
        'selector': `.${elementId}:not(.background-animated), .${elementId}.background-animated > .guten-background-animated .animated-layer`,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': `.${elementId}:not(.background-animated):hover, .${elementId}.background-animated:hover > .guten-background-animated .animated-layer`,
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
        'selector': `.${elementId}`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.${elementId}:hover`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.${elementId}`,
    });

    isNotEmpty(attributes['borderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveHover',
        'selector': `.${elementId}:hover`,
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
        'selector': `.${elementId}`,
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
        'selector': `.${elementId}:hover`,
    });

    isNotEmpty(attributes['mask']) && data.push({
        'type': 'mask',
        'id': 'mask',
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['animation']) && isNotEmpty(attributes['animation']['delay']) && data.push({
        'type': 'plain',
        'id': 'animation',
        'selector': `.editor-styles-wrapper .is-root-container  .${elementId}`,
        'properties': [
            {
                'name': 'animation-delay',
                'valueType': 'pattern',
                'pattern': '{value}ms',
                'patternValues': {
                    'value': {
                        'type': 'attribute',
                        'key': 'delay',
                    },

                }
            }
        ],
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

    //Positioning Panel
    isNotEmpty(attributes['positioningType']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`,
            'skipDeviceType': 'first',
            'attributeType': 'type',
            'multiAttr': {
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        },
    );

    isNotEmpty(attributes['positioningType']) && isNotEmpty(attributes['positioningWidth']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`,
            'skipDeviceType': 'second',
            'attributeType': 'type',
            'multiAttr': {
                'positioningWidth': attributes['positioningWidth'],
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        }
    );

    isNotEmpty(attributes['positioningWidth']) && isNotEmpty(attributes['positioningType']) && data.push({
        'type': 'positioning',
        'id': 'positioningWidth',
        'selector': `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`,
        'skipDeviceType': 'first',
        'attributeType': 'width',
        'multiAttr': {
            'positioningWidth': attributes['positioningWidth'],
            'positioningType': attributes['positioningType'],
            'inBlock': attributes['inBlock']
        }
    });

    isNotEmpty(attributes['positioningAlign']) && data.push({
        'type': 'plain',
        'id': 'positioningAlign',
        'responsive': true,
        'properties': [
            {
                'name': 'align-self',
                'valueType': 'direct'
            }
        ],
        'selector': `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`,
    });

    isNotEmpty(attributes['positioningAlign']) && data.push({
        'type': 'positioning',
        'id': 'positioningAlign',
        'property': ['vertical-align'],
        'attributeType': 'align',
        'selector': `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`,
    });

    isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'plain',
        'id': 'positioningLocation',
        'properties': [
            {
                'name': 'position',
                'valueType': 'direct'
            }
        ],
        'selector': `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`,
    });

    isNotEmpty(attributes['positioningLeft']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningLeft',
        'property': ['left'],
        'responsive': true,
        'selector': `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`,
        'attributeType': 'custom',
    });

    isNotEmpty(attributes['positioningRight']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningRight',
        'property': ['right'],
        'responsive': true,
        'selector': `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`,
        'attributeType': 'custom',
    });

    isNotEmpty(attributes['positioningTop']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningTop',
        'property': ['top'],
        'responsive': true,
        'selector': `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`,
        'attributeType': 'custom',
    });

    isNotEmpty(attributes['positioningBottom']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningBottom',
        'property': ['bottom'],
        'responsive': true,
        'selector': `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`,
        'attributeType': 'custom',
    });

    return data;
};


export default getBlockStyle;
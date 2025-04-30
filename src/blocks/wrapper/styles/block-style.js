import { isNotEmpty } from 'gutenverse-core/helper';
import { applyFilters } from '@wordpress/hooks';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    isNotEmpty(attributes['displayType']) && data.push({
        'type': 'plain',
        'id': 'displayType',
        'selector': `.editor-styles-wrapper .is-root-container .block-editor-inner-blocks .block-editor-block-list__layout .${elementId}.guten-element.guten-wrap-helper`,
        'properties': [
            {
                'name': 'display',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['displayType']) && 'inline' === attributes['displayType'] && data.push({
        'type': 'plain',
        'id': 'displayType',
        'selector': `.${elementId}.guten-element .block-editor-inner-blocks, .${elementId}.guten-element .block-editor-block-list__layout`,
        'properties': [
            {
                'name': 'display',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['displayWidth']) && ['block', 'flex', 'grid'].includes(attributes['displayType']) && data.push({
        'type': 'unitPoint',
        'id': 'displayWidth',
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element.guten-wrap-helper`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct',
                'important': true
            }
        ],
    });

    isNotEmpty(attributes['displayHeight']) && ['block', 'flex', 'inline-block', 'grid'].includes(attributes['displayType']) && data.push({
        'type': 'unitPoint',
        'id': 'displayHeight',
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element.guten-wrap-helper`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['innerWrapWidth']) && data.push({
        'type': 'plain',
        'id': 'innerWrapWidth',
        'responsive': true,
        'selector': `.${elementId}.guten-element .guten-inner-wrap`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['horizontalAlign']) && ['flex', 'grid'].includes(attributes['displayType']) && data.push({
        'type': 'plain',
        'id': 'horizontalAlign',
        'responsive': true,
        'selector': `.${elementId}.guten-element, .${elementId}.guten-element .block-editor-block-list__layout`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'exclude',
                'excludeValue': ['default']
            }
        ],
    });

    isNotEmpty(attributes['verticalAlign']) && ['flex', 'grid'].includes(attributes['displayType']) && data.push({
        'type': 'plain',
        'id': 'verticalAlign',
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'properties': [
            {
                'name': 'align-content',
                'valueType': 'exclude',
                'excludeValue': ['default']
            },
            {
                'name': 'align-items',
                'valueType': 'exclude',
                'excludeValue': ['default']
            }
        ],
    });

    isNotEmpty(attributes['displayOverflow']) && data.push({
        'type': 'plain',
        'id': 'displayOverflow',
        'selector': `.${elementId}.guten-element`,
        'properties': [
            {
                'name': 'overflow',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['blur']) && data.push({
        'type': 'plain',
        'id': 'blur',
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
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
        'selector': `.${elementId}`,
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
        'selector': `.${elementId}:not(.background-animated), .${elementId}.background-animated > .guten-inner-wrap > .guten-background-animated .animated-layer`,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': `.${elementId}:not(.background-animated):hover, .${elementId}.background-animated:hover > .guten-inner-wrap > .guten-background-animated .animated-layer`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
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

    //Positioning Panel

    isNotEmpty(attributes['positionType']) && data.push({
        'type': 'plain',
        'id': 'positionType',
        'responsive': true,
        'properties': [
            {
                'name': 'position',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element`,
    });

    isNotEmpty(attributes['positionLeft']) && data.push({
        'type': 'unitPoint',
        'id': 'positionLeft',
        'responsive': true,
        'properties': [
            {
                'name': 'left',
                'valueType': 'function',
                'functionName': 'handleWrapperPosition'
            }
        ],
        'otherAttribute': {
            'positionType': attributes['positionType']
        },
        'selector': `.${elementId}.guten-element`,
    });

    isNotEmpty(attributes['positionRight']) && data.push({
        'type': 'unitPoint',
        'id': 'positionRight',
        'responsive': true,
        'properties': [
            {
                'name': 'right',
                'valueType': 'function',
                'functionName': 'handleWrapperPosition'
            }
        ],
        'otherAttribute': {
            'positionType': attributes['positionType']
        },
        'selector': `.${elementId}.guten-element`,
    });

    isNotEmpty(attributes['positionTop']) && data.push({
        'type': 'unitPoint',
        'id': 'positionTop',
        'responsive': true,
        'properties': [
            {
                'name': 'top',
                'valueType': 'function',
                'functionName': 'handleWrapperPosition'
            }
        ],
        'otherAttribute': {
            'positionType': attributes['positionType']
        },
        'selector': `.${elementId}.guten-element`,
    });

    isNotEmpty(attributes['positionBottom']) && data.push({
        'type': 'unitPoint',
        'id': 'positionBottom',
        'responsive': true,
        'properties': [
            {
                'name': 'bottom',
                'valueType': 'function',
                'functionName': 'handleWrapperPosition'
            }
        ],
        'otherAttribute': {
            'positionType': attributes['positionType']
        },
        'selector': `.${elementId}.guten-element`,
    });

    return [
        ...data,
        ...applyFilters(
            'gutenverse.wrapper.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};


export default getBlockStyle;
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { isNotEmpty } from 'gutenverse-core/helper';
import { applyFilters } from '@wordpress/hooks';
import { backgroundStyle } from 'gutenverse-core/controls';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    const selector = `.guten-flex-container-editor.${elementId}`;
    const device = getDeviceType();

    data = backgroundStyle({
        attributes,
        data,
        backgroundSelector: `.${elementId}:not(.background-animated), .${elementId}.background-animated > .guten-background-animated .animated-layer, .${elementId}.empty-container`,
        backgroundHoverSelector: `.${elementId}:not(.background-animated):hover, .${elementId}.background-animated:hover > .guten-background-animated .animated-layer, .${elementId}.empty-container:hover`,
    });

    const {
        containerLayout
    } = attributes;

    // Boxed Background
    isNotEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'boxedBackground',
        'selector': `.${elementId}:not(.background-animated) .guten-inner-container-editor, .${elementId}.background-animated > .guten-background-animated .animated-layer .guten-inner-container-editor`,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'boxedBackgroundHover',
        backgroundHoverSelector: `.${elementId}:not(.background-animated):hover .guten-inner-container-editor, .${elementId}.background-animated:hover > .guten-background-animated .animated-layer .guten-inner-container-editor`,
    });

    isNotEmpty(attributes['backgroundTransition']) && data.push({
        'type': 'unitPoint',
        'id': 'boxedBackgroundTransition',
        'selector': `.${elementId}:not(.background-animated) .guten-inner-container-editor, .${elementId}.background-animated > .guten-background-animated .animated-layer .guten-inner-container-editor`,
        'properties': [
            {
                'name': 'transition',
                'valueType': 'pattern',
                'pattern': '{value}',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
        ],
    });

    // Container Width (when full width)
    isNotEmpty(attributes['containerLayout']) && isNotEmpty(attributes['containerWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'containerWidth',
        'responsive': true,
        'selector': {
            'Desktop': containerLayout === 'full-width' ? selector : `${selector} > div > .guten-inner-container-editor`,
            'Tablet': containerLayout === 'full-width' ? selector : `${selector} > div > .guten-inner-container-editor`,
            'Mobile': containerLayout === 'full-width' ? `.guten-flex-container-editor > div > .guten-inner-container-editor > ${selector}` : `${selector} > div > .guten-inner-container-editor`,
        },
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
    });

    // Min Height
    isNotEmpty(attributes['minHeight']) && data.push({
        'type': 'unitPoint',
        'id': 'minHeight',
        'responsive': true,
        'selector': selector,
        'properties': [
            {
                'name': 'min-height',
                'valueType': 'direct'
            }
        ],
    });

    // Flex Direction
    isNotEmpty(attributes['flexDirection']) && data.push({
        'type': 'plain',
        'id': 'flexDirection',
        'responsive': true,
        'selector': `${selector} > div > .guten-inner-container-editor`,
        'properties': [
            {
                'name': 'flex-direction',
                'valueType': 'direct'
            }
        ],
    });

    // Justify Content
    isNotEmpty(attributes['justifyContent']) && data.push({
        'type': 'plain',
        'id': 'justifyContent',
        'responsive': true,
        'selector': `${selector} > div > .guten-inner-container-editor`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct'
            }
        ],
    });

    // Align Items
    isNotEmpty(attributes['alignItems']) && data.push({
        'type': 'plain',
        'id': 'alignItems',
        'responsive': true,
        'selector': `${selector} > div > .guten-inner-container-editor`,
        'properties': [
            {
                'name': 'align-items',
                'valueType': 'direct'
            }
        ],
    });

    // Column Gap
    isNotEmpty(attributes['columnGap']) && data.push({
        'type': 'unitPoint',
        'id': 'columnGap',
        'responsive': true,
        'selector': `${selector} > div > .guten-inner-container-editor`,
        'properties': [
            {
                'name': 'column-gap',
                'valueType': 'direct'
            }
        ],
    });

    // Row Gap
    isNotEmpty(attributes['rowGap']) && data.push({
        'type': 'unitPoint',
        'id': 'rowGap',
        'responsive': true,
        'selector': `${selector} > div > .guten-inner-container-editor`,
        'properties': [
            {
                'name': 'row-gap',
                'valueType': 'direct'
            }
        ],
    });

    // Flex Wrap
    isNotEmpty(attributes['flexWrap']) && data.push({
        'type': 'plain',
        'id': 'flexWrap',
        'responsive': true,
        'selector': `${selector} > div > .guten-inner-container-editor`,
        'properties': [
            {
                'name': 'flex-wrap',
                'valueType': 'direct'
            }
        ],
    });

    // Align Content (only when wrap is enabled)
    isNotEmpty(attributes['alignContent']) && isNotEmpty(attributes['flexWrap']) && attributes['flexWrap'][device] === 'wrap' && data.push({
        'type': 'plain',
        'id': 'alignContent',
        'responsive': true,
        'selector': `${selector} > div > .guten-inner-container-editor`,
        'properties': [
            {
                'name': 'align-content',
                'valueType': 'direct'
            }
        ],
    });

    // Overflow
    isNotEmpty(attributes['overflow']) && data.push({
        'type': 'plain',
        'id': 'overflow',
        'selector': selector,
        'properties': [
            {
                'name': 'overflow',
                'valueType': 'direct'
            }
        ],
    });

    // Flex Align Self
    isNotEmpty(attributes['flexAlignSelf']) && data.push({
        'type': 'plain',
        'id': 'flexAlignSelf',
        'responsive': true,
        'selector': selector,
        'properties': [
            {
                'name': 'align-self',
                'valueType': 'direct'
            }
        ],
    });

    // Flex Order - responsive handling
    const flexOrder = attributes['flexOrder'];
    const flexCustomOrder = attributes['flexCustomOrder'];
    if (isNotEmpty(flexOrder)) {
        data.push({
            'type': 'plain',
            'id': 'flexOrder',
            'responsive': true,
            'selector': selector,
            'properties': [
                {
                    'name': 'order',
                    'valueType': 'function',
                    'valueFunc': (value) => {
                        if (value === 'start') {
                            return '-9999';
                        }
                        if (value === 'end') {
                            return '9999';
                        }
                        return undefined; // Skip 'custom', let flexCustomOrder handle it
                    }
                }
            ],
        });
        if (isNotEmpty(flexCustomOrder)) {
            data.push({
                'type': 'plain',
                'id': 'flexCustomOrder',
                'responsive': true,
                'selector': selector,
                'properties': [
                    {
                        'name': 'order',
                        'valueType': 'function',
                        'valueFunc': (value, deviceType) => {
                            // Only apply custom order if flexOrder is 'custom' for this device
                            if (flexOrder[deviceType] === 'custom') {
                                return value;
                            }
                            return undefined;
                        }
                    }
                ],
            });
        }
    }

    // Flex Size (grow/shrink) - responsive handling
    const flexSize = attributes['flexSize'];
    const flexSizeGrow = attributes['flexSizeGrow'];
    const flexSizeShrink = attributes['flexSizeShrink'];
    if (isNotEmpty(flexSize)) {
        // Handle grow preset
        data.push({
            'type': 'plain',
            'id': 'flexSize',
            'responsive': true,
            'selector': selector,
            'properties': [
                {
                    'name': 'flex-grow',
                    'valueType': 'function',
                    'valueFunc': (value) => value === 'grow' ? '1' : undefined
                }
            ],
        });
        // Handle shrink preset
        data.push({
            'type': 'plain',
            'id': 'flexSize',
            'responsive': true,
            'selector': selector,
            'properties': [
                {
                    'name': 'flex-shrink',
                    'valueType': 'function',
                    'valueFunc': (value) => value === 'shrink' ? '1' : undefined
                }
            ],
        });
        // Handle custom grow
        if (isNotEmpty(flexSizeGrow)) {
            data.push({
                'type': 'plain',
                'id': 'flexSizeGrow',
                'responsive': true,
                'selector': selector,
                'properties': [
                    {
                        'name': 'flex-grow',
                        'valueType': 'direct'
                    }
                ],
            });
        }
        // Handle custom shrink
        if (isNotEmpty(flexSizeShrink)) {
            data.push({
                'type': 'plain',
                'id': 'flexSizeShrink',
                'responsive': true,
                'selector': selector,
                'properties': [
                    {
                        'name': 'flex-shrink',
                        'valueType': 'direct'
                    }
                ],
            });
        }
    }

    /** Border **/
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

    /** Mask */
    isNotEmpty(attributes['mask']) && data.push({
        'type': 'mask',
        'id': 'mask',
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    /** Positioning Panel */
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

    /** spacing */
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

    /** animation */
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

    return [
        ...data,
        ...applyFilters(
            'gutenverse.container.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};

export default getBlockStyle;

import { isNotEmpty } from 'gutenverse-core/helper';
const getBlockStyle = (elementId, attributes) => {
    let data = [];

    /**Panel Focus Title */
    isNotEmpty(attributes['focusColor']) && data.push({
        'type': 'color',
        'id': 'focusColor',
        'selector': `.editor-styles-wrapper .${elementId} .heading-focus`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['focusTypography']) && data.push({
        'type': 'typography',
        'id': 'focusTypography',
        'selector': `.editor-styles-wrapper .${elementId} .heading-focus`,
    });

    isNotEmpty(attributes['focusTextStroke']) && data.push({
        'type': 'textStroke',
        'id': 'focusTextStroke',
        'selector': `.editor-styles-wrapper .${elementId} .heading-focus`,
    });

    isNotEmpty(attributes['focusBackground']) && data.push({
        'type': 'background',
        'id': 'focusBackground',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId} .heading-focus`,
    });

    isNotEmpty(attributes['focusMargin']) && data.push({
        'type': 'dimension',
        'id': 'focusMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .heading-focus`,
    });

    isNotEmpty(attributes['focusPadding']) && data.push({
        'type': 'dimension',
        'id': 'focusPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .heading-focus`,
    });

    /**Panel Line */
    isNotEmpty(attributes['lineColor']) && data.push({
        'type': 'color',
        'id': 'lineColor',
        'selector': `.editor-styles-wrapper .${elementId} .heading-line`,
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['lineWidth']) && isNotEmpty(attributes['showLine']) && attributes['showLine'] !== 'none' && data.push({
        'type': 'plain',
        'id': 'lineWidth',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId} .heading-line`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}%',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['lineHeight']) && isNotEmpty(attributes['showLine']) && attributes['showLine'] !== 'none' && data.push({
        'type': 'plain',
        'id': 'lineHeight',
        'properties': [
            {
                'name': 'border-top-width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .heading-line`,
        'responsive': true,
    });

    isNotEmpty(attributes['lineHeight']) && isNotEmpty(attributes['showLine']) && attributes['showLine'] !== 'none' && data.push({
        'type': 'plain',
        'id': 'lineStyle',
        'properties': [
            {
                'name': 'border-top-style',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .heading-line`,
    });

    isNotEmpty(attributes['lineMargin']) && data.push({
        'type': 'dimension',
        'id': 'lineMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-advanced-heading .heading-line`,
    });

    /**Panel Main Title*/
    isNotEmpty(attributes['mainColor']) && data.push({
        'type': 'color',
        'id': 'mainColor',
        'selector': `.editor-styles-wrapper .${elementId} .heading-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['mainTypography']) && data.push({
        'type': 'typography',
        'id': 'mainTypography',
        'selector': `.editor-styles-wrapper .${elementId} .heading-title`,
    });

    isNotEmpty(attributes['mainTextStroke']) && data.push({
        'type': 'textStroke',
        'id': 'mainTextStroke',
        'selector': `.editor-styles-wrapper .${elementId} .heading-title`,
    });

    isNotEmpty(attributes['mainBackground']) && data.push({
        'type': 'background',
        'id': 'mainBackground',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId} .heading-title`,
    });

    isNotEmpty(attributes['mainMargin']) && data.push({
        'type': 'dimension',
        'id': 'mainMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .heading-title`,
    });

    isNotEmpty(attributes['mainPadding']) && data.push({
        'type': 'dimension',
        'id': 'mainPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .heading-title`,
    });

    /**Panel Setting */
    isNotEmpty(attributes['alignText']) && data.push({
        'type': 'plain',
        'id': 'alignText',
        'selector': `.${elementId}, .${elementId} .heading-section`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            },
            {
                'name': 'text-align',
                'valueType': 'function',
                'functionName': 'handleAlign',
            }
        ],
        'responsive': true,
    });

    /**Panel Sub Title */
    isNotEmpty(attributes['subColor']) && data.push({
        'type': 'color',
        'id': 'subColor',
        'selector': `.editor-styles-wrapper .${elementId} .heading-subtitle`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['subTypography']) && data.push({
        'type': 'typography',
        'id': 'subTypography',
        'selector': `.editor-styles-wrapper .${elementId} .heading-subtitle`,
    });

    isNotEmpty(attributes['subTextStroke']) && data.push({
        'type': 'textStroke',
        'id': 'subTextStroke',
        'selector': `.editor-styles-wrapper .${elementId} .heading-subtitle`,
    });

    isNotEmpty(attributes['subBackground']) && data.push({
        'type': 'background',
        'id': 'subBackground',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId} .heading-subtitle`,
    });

    isNotEmpty(attributes['subMargin']) && data.push({
        'type': 'dimension',
        'id': 'subMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .heading-subtitle`,
    });

    isNotEmpty(attributes['subPadding']) && data.push({
        'type': 'dimension',
        'id': 'subPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .heading-subtitle`,
    });

    /**Panel List */
    isNotEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'background',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
    });

    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['borderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    //Positioning Panel
    isNotEmpty(attributes['positioningType']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
            'skipDeviceType': 'first',
            'attributeType': 'type',
            'requestAttributes': [
                'inBlock'
            ]
        },
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
            'skipDeviceType': 'second',
            'attributeType': 'type',
            'requestAttributes': [
                'positioningWidth',
                'inBlock'
            ]
        }
    );
    isNotEmpty(attributes['positioningWidth']) && data.push({
        'type': 'positioning',
        'id': 'positioningWidth',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'skipDeviceType': 'first',
        'attributeType': 'width',
        'requestAttributes': [
            'positioningType',
            'inBlock'
        ]
    });
    isNotEmpty(attributes['positioningAlign']) && data.push({
        'type': 'plain',
        'id': 'positioningAlign',
        'responsive': true,
        'property': ['align-self'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    },
    {
        'type': 'positioning',
        'id': 'positioningAlign',
        'property': ['vertical-align'],
        'attributeType': 'align',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });
    isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'plain',
        'id': 'positioningLocation',
        'property': ['position'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });
    isNotEmpty(attributes['positioningLeft']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningLeft',
        'property': ['left'],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningRight']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningRight',
        'property': ['right'],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningTop']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningTop',
        'property': ['top'],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningBottom']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningBottom',
        'property': ['bottom'],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'attributeType': 'custom',
    });

    return data;
};

export default getBlockStyle;
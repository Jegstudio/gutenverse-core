import { isNotEmpty } from 'gutenverse-core/helper';
const getBlockStyle = (elementId, attributes) => {
    let data = [];

    /**Panel Connector */
    isNotEmpty(attributes['connectorStyle']) && data.push({
        'type': 'plain',
        'id': 'connectorStyle',
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .connector`,
        'properties': [
            {
                'name': 'border-style',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['connectorColor']) && data.push({
        'type': 'color',
        'id': 'connectorColor',
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .connector`,
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['connectorWidth']) && data.push({
        'type': 'plain',
        'id': 'connectorWidth',
        'responsive': true,
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .connector`,
        'properties': [
            {
                'name': 'border-width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['connectorWidth']) && data.push({
        'type': 'plain',
        'id': 'connectorWidth',
        'selector': `.${elementId}.guten-feature-list`,
        'responsive': true,
        'properties': [
            {
                'name': '--connector-width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    /**Panel Content */
    isNotEmpty(attributes['contentPosition']) && data.push({
        'type': 'plain',
        'id': 'contentPosition',
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item`,
        'properties': [
            {
                'name': 'align-items',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['contentSpace']) && data.push({
        'type': 'unitPoint',
        'id': 'contentSpace',
        'responsive': true,
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-title`,
        'properties': [
            {
                'name': 'margin-bottom',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-title`,
    });

    isNotEmpty(attributes['descTypography']) && data.push({
        'type': 'typography',
        'id': 'descTypography',
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-desc`,
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['descColor']) && data.push({
        'type': 'color',
        'id': 'descColor',
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-desc`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['titleColorHover']) && data.push({
        'type': 'color',
        'id': 'titleColorHover',
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .feature-list-content .feature-list-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['descColorHover']) && data.push({
        'type': 'color',
        'id': 'descColorHover',
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .feature-list-content .feature-list-desc`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    /**Panel Icon */
    isNotEmpty(attributes['iconWrapperSize']) && data.push({
        'type': 'plain',
        'id': 'iconWrapperSize',
        'responsive': true,
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon-wrapper .icon`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            },
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['iconWrapperSize']) && data.push({
        'type': 'plain',
        'id': 'iconWrapperSize',
        'selector': `.${elementId}.guten-feature-list`,
        'responsive': true,
        'properties': [
            {
                'name': '--icon-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['iconContentSpacing']) && data.push({
        'type': 'unitPoint',
        'id': 'iconContentSpacing',
        'responsive': true,
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item`,
        'properties': [
            {
                'name': 'gap',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'iconSize',
        'responsive': true,
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'iconSize',
        'responsive': true,
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon img`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconColorHover']) && data.push({
        'type': 'color',
        'id': 'iconColorHover',
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconBackground']) && data.push({
        'type': 'background',
        'id': 'iconBackground',
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon`,
    });

    isNotEmpty(attributes['iconBackgroundHover']) && data.push({
        'type': 'background',
        'id': 'iconBackgroundHover',
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon`,
    });

    isNotEmpty(attributes['iconBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'iconBorder',
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon`,
    });

    if (isNotEmpty(attributes['featureList'])) {
        let repeaterOption = featureListGetBlockStyle(elementId, attributes['featureList']);
        data.push({
            'type': 'repeater',
            'id': 'featureList',
            'repeaterOpt': repeaterOption
        });
    }

    isNotEmpty(attributes['iconBorderHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'iconBorderHover',
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon`,
    });

    /**Panel Settings */
    if (isNotEmpty(attributes['iconWrapperShape'])) {
        let value1 = '';
        switch (attributes['iconWrapperShape']) {
            case 'rhombus':
                value1 = 'rotate(45deg);';
                break;
            case 'square':
            default:
                value1 = 'rotate(0deg);';
                break;
        }
        data.push({
            'type': 'plain',
            'id': 'iconWrapperShape',
            'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .icon-wrapper .icon`,
            'properties': [
                {
                    'name': 'transform',
                    'valueType': 'pattern',
                    'pattern': value1,
                }
            ],
        });
        let value2 = '';
        switch (attributes['iconWrapperShape']) {
            case 'rhombus':
                value2 = 'rotate(-45deg);';
                break;
            case 'square':
            default:
                value2 = 'rotate(0deg);';
                break;
        }
        data.push({
            'type': 'plain',
            'id': 'iconWrapperShape',
            'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .icon-wrapper .icon > *`,
            'properties': [
                {
                    'name': 'transform',
                    'valueType': 'pattern',
                    'pattern': value2,
                }
            ],
        });
    }

    isNotEmpty(attributes['listSpace']) && data.push({
        'type': 'plain',
        'id': 'listSpace',
        'responsive': true,
        'selector': `.${elementId}.guten-feature-list .feature-list-wrapper`,
        'properties': [
            {
                'name': 'gap',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            },
        ]
    });

    isNotEmpty(attributes['listSpace']) && data.push({
        'type': 'plain',
        'id': 'listSpace',
        'selector': `.${elementId}.guten-feature-list`,
        'responsive': true,
        'properties': [
            {
                'name': '--space-between',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
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
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'skipDeviceType': 'first',
        'attributeType': 'width',
        'multiAttr': {
            'positioningWidth': attributes['positioningWidth'],
            'positioningType': attributes['positioningType'],
            'inBlock': attributes['inBlock']
        }
    });
    isNotEmpty(attributes['positioningAlign']) && data.push(
        {
            'type': 'plain',
            'id': 'positioningAlign',
            'responsive': true,
            'properties': [
                {
                    'name': 'align-self',
                    'valueType': 'direct'
                }
            ],
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        },
        {
            'type': 'positioning',
            'id': 'positioningAlign',
            'property': ['vertical-align'],
            'attributeType': 'align',
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        }
    );
    isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'plain',
        'id': 'positioningLocation',
        'properties': [
            {
                'name': 'position',
                'valueType': 'direct'
            }
        ],
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

export const featureListGetBlockStyle = (elementId, attribute) => {
    return attribute.map((el, index) => {
        let arrOpt = [];
        isNotEmpty(el['iconSize']) && arrOpt.push({
            'type': 'unitPoint',
            'id': 'iconSize',
            'responsive': true,
            'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index + 1}) .icon i`,
            'properties': [
                {
                    'name': 'font-size',
                    'valueType': 'direct'
                }
            ]
        });

        isNotEmpty(el['iconSize']) && arrOpt.push({
            'type': 'unitPoint',
            'id': 'iconSize',
            'responsive': true,
            'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index + 1}) .icon img`,
            'properties': [
                {
                    'name': 'width',
                    'valueType': 'direct'
                }
            ]
        });

        isNotEmpty(el['iconColor']) && arrOpt.push({
            'type': 'color',
            'id': 'iconColor',
            'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index + 1}) .icon i`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ]
        });

        isNotEmpty(el['iconColorHover']) && arrOpt.push({
            'type': 'color',
            'id': 'iconColorHover',
            'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index + 1}):hover .icon i`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ]
        });

        isNotEmpty(el['iconBackground']) && arrOpt.push({
            'type': 'background',
            'id': 'iconBackground',
            'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index + 1}) .icon`,
        });

        isNotEmpty(el['iconBackgroundHover']) && arrOpt.push({
            'type': 'background',
            'id': 'iconBackgroundHover',
            'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index + 1}):hover .icon`,
        });

        isNotEmpty(el['iconBorder']) && arrOpt.push({
            'type': 'borderResponsive',
            'id': 'iconBorder',
            'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index + 1}) .icon`,
        });

        isNotEmpty(el['iconBorderHover']) && arrOpt.push({
            'type': 'borderResponsive',
            'id': 'iconBorderHover',
            'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child(${index + 1}):hover .icon`,
        });
        return arrOpt;
    });
};

export default getBlockStyle;
import { isNotEmpty } from 'gutenverse-core/helper';
/**
 * 
 * @param {Array} attributes Panel attributes.
 * @param {Array} data Block Style data.
 * @param {String} elementId Block unique ID.
 * @param {Array} features Feature lists.
 * @param {String} selector Block selector.
 * @returns Array
 */
export const defaultStyle = (
    attributes,
    data,
    elementId,
    features = [],
    selector = `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`) => {

    /**
    * Panel Spacing
    */
    if (features.includes('spacing')) {
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
            'selector': selector,
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
            'selector': selector,
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
            'selector': selector,
        });
    }

    /**
    * Panel Border
    */
    if (features.includes('border')) {
        isNotEmpty(attributes['border']) && data.push({
            'type': 'border',
            'id': 'border',
            'selector': selector,
        });

        isNotEmpty(attributes['borderResponsive']) && data.push({
            'type': 'borderResponsive',
            'id': 'borderResponsive',
            'selector': selector,
        });

        isNotEmpty(attributes['borderHover']) && data.push({
            'type': 'border',
            'id': 'borderHover',
            'selector': `${selector}:hover`,
        });

        isNotEmpty(attributes['borderHoverResponsive']) && data.push({
            'type': 'borderResponsive',
            'id': 'borderHoverResponsive',
            'selector': `${selector}:hover`,
        });

        isNotEmpty(attributes['boxShadow']) && data.push({
            'type': 'boxShadow',
            'id': 'boxShadow',
            'selector': selector,
            'properties': [
                {
                    'name': 'box-shadow',
                    'valueType': 'direct'
                }
            ],
        });
        isNotEmpty(attributes['boxShadowHover']) && data.push({
            'type': 'boxShadow',
            'id': 'boxShadowHover',
            'selector': `${selector}:hover`,
            'properties': [
                {
                    'name': 'box-shadow',
                    'valueType': 'direct'
                }
            ],
        });
    }

    /**
    * Panel Background
    */
    if (features.includes('background')) {
        isNotEmpty(attributes['background']) && data.push({
            'type': 'background',
            'id': 'background',
            'selector': selector,
        });

        isNotEmpty(attributes['backgroundHover']) && data.push({
            'type': 'background',
            'id': 'backgroundHover',
            'selector': `${selector}:hover`,
        });

        isNotEmpty(attributes['backgroundTransition']) && data.push({
            'type': 'unitPoint',
            'id': 'backgroundTransition',
            'selector': selector,
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
    }

    /**
    * Panel Positioning
    */
    if (features.includes('positioning')) {
        //Positioning Panel
        isNotEmpty(attributes['positioningType']) && data.push({
            'type': 'positioning',
            'id': 'positioningType',
            'selector': selector,
            'skipDeviceType': 'first',
            'attributeType': 'type',
            'multiAttr': {
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        },);

        isNotEmpty(attributes['positioningType']) && isNotEmpty(attributes['positioningWidth']) && data.push({
            'type': 'positioning',
            'id': 'positioningType',
            'selector': selector,
            'skipDeviceType': 'second',
            'attributeType': 'type',
            'multiAttr': {
                'positioningWidth': attributes['positioningWidth'],
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        });

        isNotEmpty(attributes['positioningWidth']) && isNotEmpty(attributes['positioningType']) && data.push({
            'type': 'positioning',
            'id': 'positioningWidth',
            'selector': selector,
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
            'selector': selector,
        },
        {
            'type': 'positioning',
            'id': 'positioningAlign',
            'properties': [
                {
                    'name': 'vertical-align',
                    'valueType': 'direct'
                }
            ],
            'attributeType': 'align',
            'selector': selector,
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
            'selector': selector,
        });

        isNotEmpty(attributes['positioningLeft']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
            'type': 'positioning',
            'id': 'positioningLeft',
            'properties': [
                {
                    'name': 'left',
                    'valueType': 'direct'
                }
            ],
            'responsive': true,
            'selector': selector,
            'attributeType': 'custom',
        });

        isNotEmpty(attributes['positioningRight']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
            'type': 'positioning',
            'id': 'positioningRight',
            'properties': [
                {
                    'name': 'right',
                    'valueType': 'direct'
                }
            ],
            'responsive': true,
            'selector': selector,
            'attributeType': 'custom',
        });

        isNotEmpty(attributes['positioningTop']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
            'type': 'positioning',
            'id': 'positioningTop',
            'properties': [
                {
                    'name': 'top',
                    'valueType': 'direct'
                }
            ],
            'responsive': true,
            'selector': selector,
            'attributeType': 'custom',
        });

        isNotEmpty(attributes['positioningBottom']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
            'type': 'positioning',
            'id': 'positioningBottom',
            'properties': [
                {
                    'name': 'bottom',
                    'valueType': 'direct'
                }
            ],
            'responsive': true,
            'selector': selector,
            'attributeType': 'custom',
        });

        /** Position Flex Item */

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
    }


    return data;
};
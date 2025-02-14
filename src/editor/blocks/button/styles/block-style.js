import { getDeviceType } from 'gutenverse-core/editor-helper';
import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    const device = getDeviceType();

    //panel button
    isNotEmpty(attributes['alignButton']) && data.push({
        'type': 'plain',
        'id': 'alignButton',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
    });
    isNotEmpty(attributes['buttonWidth']) && data.push({
        'type': 'plain',
        'id': 'buttonWidth',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}%',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                        'key': 'buttonWidth',
                    },

                }
            }
        ],
    });
    isNotEmpty(attributes['buttonHeight']) && data.push({
        'type': 'plain',
        'id': 'buttonHeight',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
        'responsive': true,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px!important',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                        'key': 'buttonHeight',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['iconPosition']) && isNotEmpty(attributes['iconSpacing']) && attributes['iconPosition'] === 'before' && isNotEmpty(attributes['showIcon']) && data.push({
        'type': 'plain',
        'id': 'iconPosition',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i`,
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                        'key': 'iconSpacing',
                    },

                }
            }
        ],
        'multiAttr' : {'iconSpacing': attributes['iconSpacing']}
    });

    isNotEmpty(attributes['iconPosition']) && isNotEmpty(attributes['iconSpacing']) && attributes['iconPosition'] === 'after' && isNotEmpty(attributes['showIcon']) && data.push({
        'type': 'plain',
        'id': 'iconPosition',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i`,
        'properties': [
            {
                'name': 'margin-left',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                        'key': 'iconSpacing',
                    },

                }
            }
        ],
        'multiAttr' : {'iconSpacing': attributes['iconSpacing']}
    });

    isNotEmpty(attributes['iconSize']) && isNotEmpty(attributes['showIcon']) && data.push({
        'type': 'unitPoint',
        'id': 'iconSize',
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i`,
        'responsive' : true
    });

    isNotEmpty(attributes['paddingButton']) && data.push({
        'type': 'dimension',
        'id': 'paddingButton',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
    });

    isNotEmpty(attributes['iconLineHeight']) && data.push({
        'type': 'plain',
        'id': 'iconLineHeight',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i`,
        'properties': [
            {
                'name': 'line-height',
                'valueType': 'pattern',
                'pattern': 'normal',
            }
        ],
    });

    //panel style
    isNotEmpty(attributes['color']) && data.push({
        'type': 'color',
        'id': 'color',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button span`,
        'properties': [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ],
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i`,
        'properties': [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ],
    });

    isNotEmpty(attributes['hoverTextColor']) && !attributes['hoverWithParent'] && data.push({
        'type': 'color',
        'id': 'hoverTextColor',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover span`,
        'properties': [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ],
    });

    isNotEmpty(attributes['hoverTextColor']) && attributes['hoverWithParent'] && data.push({
        'type': 'color',
        'id': 'hoverTextColor',
        'selector': attributes['parentSelector'] + ` .${elementId}.guten-button-wrapper .guten-button span`,
        'properties': [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ],
    });

    isNotEmpty(attributes['hoverTextColor']) && !attributes['hoverWithParent'] && data.push({
        'type': 'color',
        'id': 'hoverTextColor',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover i`,
        'properties': [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ],
    });

    isNotEmpty(attributes['hoverTextColor']) && attributes['hoverWithParent'] && data.push({
        'type': 'color',
        'id': 'hoverTextColor',
        'selector': attributes['parentSelector'] + ` .${elementId}.guten-button-wrapper .guten-button i`,
        'properties': [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ],
    });

    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button span`,
    });

    //panel button background
    isNotEmpty(attributes['buttonBackground']) && data.push({
        'type': 'background',
        'id': 'buttonBackground',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
        'responsive' : true
    });

    isNotEmpty(attributes['buttonBackgroundHover']) && attributes['hoverWithParent'] && data.push({
        'type': 'background',
        'id': 'buttonBackgroundHover',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover`,
        'responsive' : true
    });

    isNotEmpty(attributes['buttonBackgroundHover']) && !attributes['hoverWithParent'] && data.push({
        'type': 'background',
        'id': 'buttonBackgroundHover',
        'selector': attributes['parentSelector'] + ` .${elementId}.guten-button-wrapper .guten-button`,
        'responsive' : true
    });

    //panel button border
    isNotEmpty(attributes['buttonBorder']) && data.push({
        'type': 'border',
        'id': 'buttonBorder',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
    });

    isNotEmpty(attributes['buttonBorderResponsive']) && device !== 'Desktop' && data.push({
        'type': 'border',
        'id': 'buttonBorderResponsive',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
    });

    isNotEmpty(attributes['buttonBorderHover']) && !attributes['hoverWithParent'] && data.push({
        'type': 'border',
        'id': 'buttonBorderHover',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover`,
    });

    isNotEmpty(attributes['buttonBorderHover']) && attributes['hoverWithParent'] && data.push({
        'type': 'border',
        'id': 'buttonBorderHover',
        'selector': attributes['parentSelector'] + ` .${elementId}.guten-button-wrapper .guten-button`,
    });

    isNotEmpty(attributes['buttonBorderHover']) && device !== 'Desktop' && !attributes['hoverWithParent'] && data.push({
        'type': 'border',
        'id': 'buttonBorderHover',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover`,
    });

    isNotEmpty(attributes['buttonBorderHover']) && device !== 'Desktop' && attributes['hoverWithParent'] && data.push({
        'type': 'border',
        'id': 'buttonBorderHover',
        'selector': attributes['parentSelector'] + ` .${elementId}.guten-button-wrapper .guten-button`,
    });

    isNotEmpty(attributes['buttonBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'buttonBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
    });

    isNotEmpty(attributes['buttonBoxShadowHover']) && !attributes['hoverWithParent'] && data.push({
        'type': 'boxShadow',
        'id': 'buttonBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover`,
    });

    isNotEmpty(attributes['buttonBoxShadowHover']) && attributes['hoverWithParent'] && data.push({
        'type': 'boxShadow',
        'id': 'buttonBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': attributes['parentSelector'] + ` .${elementId}.guten-button-wrapper .guten-button`,
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
                'name' : 'box-shadow',
                'valueType' : 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['boxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadowHover',
        'properties': [
            {
                'name' : 'box-shadow',
                'valueType' : 'direct'
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
                'name' : 'padding',
                'valueType' : 'direct'
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
                'name' : 'margin',
                'valueType' : 'direct'
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
                'name' : 'z-index',
                'valueType' : 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['animation']) && isNotEmpty(attributes['animation']['delay']) && data.push({
        'type': 'plain',
        'id' : 'animation',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
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
    isNotEmpty(attributes['positioningAlign']) && data.push({
        'type': 'plain',
        'id': 'positioningAlign',
        'responsive': true,
        'properties': [
            {
                'name' : 'align-self',
                'valueType' : 'direct'
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
    });
    isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'plain',
        'id': 'positioningLocation',
        'properties': [
            {
                'name' : 'position',
                'valueType' : 'direct'
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


export default getBlockStyle;
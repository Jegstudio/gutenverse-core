import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    //only if not responsive
    isNotEmpty(attributes['orientation']) && attributes['orientation'] === 'horizontal' && data.push({
        'type': 'plain',
        'id': 'orientation',
        'selector': `.guten-element.${elementId}`,
        'properties': [
            {
                'name' : 'display',
                'valueType' : 'pattern',
                'pattern' : 'block'
            }
        ]
    });

    isNotEmpty(attributes['orientation']) && attributes['orientation'] === 'vertical' && data.push({
        'type': 'plain',
        'id': 'orientation',
        'selector': `.guten-element.${elementId}`,
        'properties': [
            {
                'name' : 'display',
                'valueType' : 'pattern',
                'pattern' : 'flex'
            }
        ]
    });

    isNotEmpty(attributes['orientation']) && attributes['orientation'] === 'horizontal-center' && data.push({
        'type': 'plain',
        'id': 'orientation',
        'selector': `.guten-element.${elementId} .tab-heading-item`,
        'properties': [
            {
                'name' : 'justify-content',
                'valueType' : 'pattern',
                'pattern' : 'center'
            }
        ]
    });

    isNotEmpty(attributes['orientation']) && attributes['orientation'] === 'horizontal-right' && data.push({
        'type': 'plain',
        'id': 'orientation',
        'selector': `.guten-element.${elementId} .tab-heading-item`,
        'properties': [
            {
                'name' : 'justify-content',
                'valueType' : 'pattern',
                'pattern' : 'end'
            }
        ]
    });

    isNotEmpty(attributes['borderWidth']) && data.push({
        'type': 'plain',
        'id': 'borderWidth',
        'selector': `.guten-tabs.${elementId} .tab-heading-item, 
                    .guten-tabs.${elementId} .tab-heading-item:after,
                    .guten-tabs.${elementId} .tab-heading-item:before,
                    .guten-tabs.${elementId} .tab-body,
                    .guten-tabs.${elementId} .tab-heading-mobile,
                    .guten-tabs.${elementId} .tab-heading-mobile .tab-option`,
        'properties': [
            {
                'name' : 'border-width',
                'valueType' : 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['borderColor']) && data.push({
        'type': 'color',
        'id': 'borderColor',
        'selector': `.guten-tabs.${elementId} .tab-heading-item.active,
                    .guten-tabs.${elementId}.vertical .tab-heading-item.active, 
                    .guten-tabs.${elementId} .tab-heading-item.active:after,
                    .guten-tabs.${elementId} .tab-heading-item.active:before,
                    .guten-tabs.${elementId} .tab-body, 
                    .guten-tabs.${elementId} .tab-heading-mobile,
                    .guten-tabs.${elementId} .tab-heading-mobile .tab-option`,
        'properties': [
            {
                'name' : 'border-color',
                'valueType' : 'direct',
            }
        ]
    });

    isNotEmpty(attributes['backgroundColor']) && data.push({
        'type': 'color',
        'id': 'backgroundColor',
        'selector': `.guten-tabs.${elementId} .tab-heading-item.active,
                    .guten-tabs.${elementId} .tab-body, 
                    .guten-tabs.${elementId} .tab-heading-mobile, 
                    .guten-tabs.${elementId} .tab-heading-mobile .tab-option`,
        'properties': [
            {
                'name' : 'background-color',
                'valueType' : 'direct',
            }
        ]
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.guten-tabs.${elementId} .tab-heading-item, 
                    .guten-tabs.${elementId} .tab-heading-item svg`,
        'properties': [
            {
                'name' : 'color',
                'valueType' : 'direct',
            }
        ]
    });

    isNotEmpty(attributes['titleActiveColor']) && data.push({
        'type': 'color',
        'id': 'titleActiveColor',
        'selector': `.guten-tabs.${elementId} .tab-heading-item.active, 
                    .guten-tabs.${elementId} .tab-heading-item.active svg,
                    .guten-tabs.${elementId} .tab-heading-mobile .tab-title,
                    .guten-tabs.${elementId} .tab-heading-mobile .tab-option .tab-option-item`,
        'properties': [
            {
                'name' : 'color',
                'valueType' : 'direct',
            }
        ]
    });

    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.guten-tabs.${elementId} .tab-heading-item, .guten-tabs.${elementId} .tab-heading-mobile`,
    });

    isNotEmpty(attributes['contentColor']) && data.push({
        'type': 'color',
        'id': 'contentColor',
        'selector': `.guten-tabs.${elementId} .tab-body`,
        'properties': [
            {
                'name' : 'color',
                'valueType' : 'direct',
            }
        ]
    });

    isNotEmpty(attributes['contentTypography']) && data.push({
        'type': 'typography',
        'id': 'contentTypography',
        'selector': `.guten-tabs.${elementId} .tab-body, 
                        .guten-tabs.${elementId} .tab-body p, 
                        .guten-tabs.${elementId} .tab-body a`,
    });

    isNotEmpty(attributes['contentPadding']) && data.push({
        'type': 'dimension',
        'id': 'contentPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .tab-body`,
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
            'selector': `.${elementId}.guten-element`,
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
            'selector': `.${elementId}.guten-element`,
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
        'selector': `.${elementId}.guten-element`,
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
        'selector': `.${elementId}.guten-element`,
    },
    {
        'type': 'positioning',
        'id': 'positioningAlign',
        'property': ['vertical-align'],
        'attributeType': 'align',
        'selector': `.${elementId}.guten-element`,
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
        'selector': `.${elementId}.guten-element`,
    });
    isNotEmpty(attributes['positioningLeft']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningLeft',
        'property': ['left'],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningRight']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningRight',
        'property': ['right'],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningTop']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningTop',
        'property': ['top'],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningBottom']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningBottom',
        'property': ['bottom'],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });

    return data;
};

export default getBlockStyle;
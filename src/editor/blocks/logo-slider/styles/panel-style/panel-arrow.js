import { isNotEmpty } from 'gutenverse-core/helper';

const panelArrowStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['arrowFontSize']) && data.push({
        'type': 'plain',
        'id': 'arrowFontSize',
        'responsive': true,
        'selector': `.${elementId} div[class*='swiper-button-']`,
        'properties': [
            {
                'name': 'font-size',
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

    isNotEmpty(attributes['arrowColor']) && data.push({
        'type': 'color',
        'id': 'arrowColor',
        'selector': `.${elementId} div[class*='swiper-button-']`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['arrowBgColor']) && data.push({
        'type': 'color',
        'id': 'arrowBgColor',
        'selector': `.${elementId} div[class*='swiper-button-']`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['arrowMargin']) && data.push({
        'type': 'dimension',
        'id': 'arrowMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowPadding']) && data.push({
        'type': 'dimension',
        'id': 'arrowPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowOpacity']) && data.push({
        'type': 'plain',
        'id': 'arrowOpacity',
        'responsive' : true,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'function',
                'functionName' : 'handleOpacity'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowColorHover']) && data.push({
        'type': 'color',
        'id': 'arrowColorHover',
        'selector': `.${elementId}:hover div[class*='swiper-button-']`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['arrowBgColorHover']) && data.push({
        'type': 'color',
        'id': 'arrowBgColorHover',
        'selector': `.${elementId}:hover div[class*='swiper-button-']`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['arrowMarginHover']) && data.push({
        'type': 'dimension',
        'id': 'arrowMarginHover',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}:hover div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowPaddingHover']) && data.push({
        'type': 'dimension',
        'id': 'arrowPaddingHover',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}:hover div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowOpacityHover']) && data.push({
        'type': 'plain',
        'id': 'arrowOpacityHover',
        'responsive' : true,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'function',
                'functionName' : 'handleOpacity'
            }
        ],
        'selector': `.${elementId}:hover div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowBorder']) && data.push({
        'type': 'border',
        'id': 'arrowBorder',
        'selector': `.${elementId} div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'arrowBorderResponsive',
        'selector': `.${elementId} div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'arrowBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowBorderHover']) && data.push({
        'type': 'border',
        'id': 'arrowBorderHover',
        'selector': `.${elementId}:hover div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowBorderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'arrowBorderResponsiveHover',
        'selector': `.${elementId}:hover div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'arrowBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}:hover div[class*='swiper-button-']`,
    });
    return data;
};

export default panelArrowStyle;
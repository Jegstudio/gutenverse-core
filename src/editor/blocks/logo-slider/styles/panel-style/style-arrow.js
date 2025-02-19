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
        'responsive' : true,
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
        'responsive': true,
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

    isNotEmpty(attributes['arrowHoverColor']) && data.push({
        'type': 'color',
        'id': 'arrowHoverColor',
        'responsive': true,
        'selector': `.${elementId} div[class*='swiper-button-']:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['arrowHoverBgColor']) && data.push({
        'type': 'color',
        'id': 'arrowHoverBgColor',
        'responsive': true,
        'selector': `.${elementId} div[class*='swiper-button-']:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['arrowHoverMargin']) && data.push({
        'type': 'dimension',
        'id': 'arrowHoverMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']:hover`,
    });

    isNotEmpty(attributes['arrowHoverPadding']) && data.push({
        'type': 'dimension',
        'id': 'arrowHoverPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']:hover`,
    });

    isNotEmpty(attributes['arrowHoverOpacity']) && data.push({
        'type': 'plain',
        'id': 'arrowHoverOpacity',
        'responsive' : true,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'function',
                'functionName' : 'handleOpacity'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']:hover`,
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
        'selector': `.${elementId} div[class*='swiper-button-']:hover`,
    });

    isNotEmpty(attributes['arrowBorderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'arrowBorderResponsiveHover',
        'selector': `.${elementId} div[class*='swiper-button-']:hover`,
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
        'selector': `.${elementId} div[class*='swiper-button-']:hover`,
    });
    return data;
};

export default panelArrowStyle;
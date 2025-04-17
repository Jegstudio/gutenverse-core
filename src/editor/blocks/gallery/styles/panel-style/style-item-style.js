import { isNotEmpty } from 'gutenverse-core/helper';

const panelItemStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['itemMargin']) && data.push({
        'type': 'dimension',
        'id': 'itemMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId} .gallery-items .gallery-item-wrap .grid-item`,
    });

    isNotEmpty(attributes['itemPadding']) && data.push({
        'type': 'dimension',
        'id': 'itemPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId} .gallery-items .gallery-item-wrap .grid-item`,
    });

    isNotEmpty(attributes['itemBorder']) && data.push({
        'type': 'border',
        'id': 'itemBorder',
        'selector': `.${elementId} .gallery-items .gallery-item-wrap .grid-item`,
    });

    isNotEmpty(attributes['itemBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'itemBorderResponsive',
        'selector': `.${elementId} .gallery-items .gallery-item-wrap .grid-item`,
    });

    isNotEmpty(attributes['itemBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'itemBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gallery-items .gallery-item-wrap .grid-item`,
    });

    isNotEmpty(attributes['itemBackground']) && data.push({
        'type': 'background',
        'id': 'itemBackground',
        'selector': `.${elementId} .gallery-items .gallery-item-wrap .grid-item`,
    });

    return data;
};

export default panelItemStyle;
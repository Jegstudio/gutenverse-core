import { isNotEmpty } from 'gutenverse-core/helper';

const panelPriceRating = (elementId, attributes, data) => {
    if (attributes['selectionPriceRatingPadding'] === 'all') {
        isNotEmpty(attributes['priceRatingPadding']) && data.push({
            'type': 'dimension',
            'id': 'priceRatingPadding',
            'responsive': true,
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
        });
    } else {
        isNotEmpty(attributes['pricePadding']) && data.push({
            'type': 'dimension',
            'id': 'pricePadding',
            'responsive': true,
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
        });

        isNotEmpty(attributes['ratingPadding']) && data.push({
            'type': 'dimension',
            'id': 'ratingPadding',
            'responsive': true,
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
        });
    }

    isNotEmpty(attributes['priceMargin']) && data.push({
        'type': 'dimension',
        'id': 'priceMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
    });

    isNotEmpty(attributes['ratingMargin']) && data.push({
        'type': 'dimension',
        'id': 'ratingMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
    });

    isNotEmpty(attributes['pricePositioningLeft']) && data.push({
        'type': 'unitPoint',
        'id': 'pricePositioningLeft',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
        'properties': [
            {
                'name': 'left',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['pricePositioningRight']) && data.push({
        'type': 'unitPoint',
        'id': 'pricePositioningRight',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
        'properties': [
            {
                'name': 'right',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['pricePositioningTop']) && data.push({
        'type': 'unitPoint',
        'id': 'pricePositioningTop',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
        'properties': [
            {
                'name': 'top',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['pricePositioningBottom']) && data.push({
        'type': 'unitPoint',
        'id': 'pricePositioningBottom',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
        'properties': [
            {
                'name': 'bottom',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['ratingPositioningLeft']) && data.push({
        'type': 'unitPoint',
        'id': 'ratingPositioningLeft',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
        'properties': [
            {
                'name': 'left',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['ratingPositioningRight']) && data.push({
        'type': 'unitPoint',
        'id': 'ratingPositioningRight',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
        'properties': [
            {
                'name': 'right',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['ratingPositioningTop']) && data.push({
        'type': 'unitPoint',
        'id': 'ratingPositioningTop',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
        'properties': [
            {
                'name': 'top',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['ratingPositioningBottom']) && data.push({
        'type': 'unitPoint',
        'id': 'ratingPositioningBottom',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
        'properties': [
            {
                'name': 'bottom',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['priceColor']) && data.push({
        'type': 'color',
        'id': 'priceColor',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['priceTypography']) && data.push({
        'type': 'typography',
        'id': 'priceTypography',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
    });

    isNotEmpty(attributes['ratingColor']) && data.push({
        'type': 'color',
        'id': 'ratingColor',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['ratingStarColor']) && data.push({
        'type': 'color',
        'id': 'ratingStarColor',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating li`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['ratingTypography']) && data.push({
        'type': 'typography',
        'id': 'ratingTypography',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
    });

    return data;
};

export default panelPriceRating;
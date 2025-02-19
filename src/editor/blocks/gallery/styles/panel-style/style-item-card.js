import { isNotEmpty } from 'gutenverse-core/helper';

const panelItemCardStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['itemCardBackground']) && data.push({
        'type': 'background',
        'id': 'itemCardBackground',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card`,
    });

    isNotEmpty(attributes['itemCardPadding']) && data.push({
        'type': 'dimension',
        'id': 'itemCardPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card`,
    });

    isNotEmpty(attributes['itemCardBorder']) && data.push({
        'type': 'border',
        'id': 'itemCardBorder',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card`,
    });

    isNotEmpty(attributes['itemCardBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'itemCardBorderResponsive',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card`,
    });

    isNotEmpty(attributes['itemCardAlign']) && data.push({
        'type': 'plain',
        'id': 'itemCardAlign',
        'responsive': true,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card`,
    });

    isNotEmpty(attributes['itemCardTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'itemCardTitleTypography',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-title`,
    });

    isNotEmpty(attributes['itemCardTitleColor']) && data.push({
        'type': 'color',
        'id': 'itemCardTitleColor',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['itemCardTitleColorHover']) && data.push({
        'type': 'color',
        'id': 'itemCardTitleColorHover',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card:hover .item-caption-over .item-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['itemCardTitleMargin']) && data.push({
        'type': 'dimension',
        'id': 'itemCardTitleMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-title`,
    });

    isNotEmpty(attributes['itemCardTitlePadding']) && data.push({
        'type': 'dimension',
        'id': 'itemCardTitlePadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-title`,
    });

    isNotEmpty(attributes['itemCardContentTypography']) && data.push({
        'type': 'typography',
        'id': 'itemCardContentTypography',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-content`,
    });

    isNotEmpty(attributes['itemCardContentColor']) && data.push({
        'type': 'color',
        'id': 'itemCardContentColor',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-content`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['itemCardContentColorHover']) && data.push({
        'type': 'color',
        'id': 'itemCardContentColorHover',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card:hover .item-caption-over .item-content`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['itemCardContentMargin']) && data.push({
        'type': 'dimension',
        'id': 'itemCardContentMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-content`,
    });

    isNotEmpty(attributes['itemCardContentPadding']) && data.push({
        'type': 'dimension',
        'id': 'itemCardContentPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-content`,
    });
    return data;
};

export default panelItemCardStyle;
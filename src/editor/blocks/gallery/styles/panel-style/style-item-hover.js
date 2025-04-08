import { isNotEmpty } from 'gutenverse-core/helper';

const panelItemHoverStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['itemHoverBackground']) && data.push({
        'type': 'background',
        'id': 'itemHoverBackground',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .thumbnail-wrap .caption-wrap .item-hover-bg`,
    });
    isNotEmpty(attributes['itemHoverOpacity']) && data.push({
        'type': 'plain',
        'id': 'itemHoverOpacity',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .thumbnail-wrap .caption-wrap .item-hover-bg`,
        'properties' : [
            {
                'name' : 'opacity',
                'valueType' : 'direct'
            }
        ]
    });
    isNotEmpty(attributes['itemHoverPadding']) && data.push({
        'type': 'dimension',
        'id': 'itemHoverPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .thumbnail-wrap .caption-wrap`,
    });

    isNotEmpty(attributes['itemHoverBorder']) && data.push({
        'type': 'border',
        'id': 'itemHoverBorder',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap .item-hover-bg`,
    });

    isNotEmpty(attributes['itemHoverBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'itemHoverBorderResponsive',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap .item-hover-bg`,
    });

    isNotEmpty(attributes['itemHoverAlign']) && data.push({
        'type': 'plain',
        'id': 'itemHoverAlign',
        'responsive': true,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap`,
    });

    isNotEmpty(attributes['itemHoverTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'itemHoverTitleTypography',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-overlay .item-caption-over .item-title`,
    });

    isNotEmpty(attributes['itemHoverTitleColor']) && data.push({
        'type': 'color',
        'id': 'itemHoverTitleColor',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-overlay .item-caption-over .item-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['itemHoverTitleColorHover']) && data.push({
        'type': 'color',
        'id': 'itemHoverTitleColorHover',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-overlay:hover .item-caption-over .item-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['itemHoverTitleMargin']) && data.push({
        'type': 'dimension',
        'id': 'itemHoverTitleMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-overlay .item-caption-over .item-title`,
    });

    isNotEmpty(attributes['itemHoverTitlePadding']) && data.push({
        'type': 'dimension',
        'id': 'itemHoverTitlePadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-overlay .item-caption-over .item-title`,
    });

    isNotEmpty(attributes['itemHoverContentTypography']) && data.push({
        'type': 'typography',
        'id': 'itemHoverContentTypography',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-overlay .item-caption-over .item-content`,
    });

    isNotEmpty(attributes['itemHoverContentColor']) && data.push({
        'type': 'color',
        'id': 'itemHoverContentColor',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-overlay .item-caption-over .item-content`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['itemHoverContentColorHover']) && data.push({
        'type': 'color',
        'id': 'itemHoverContentColorHover',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-overlay:hover .item-caption-over .item-content`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['itemHoverContentMargin']) && data.push({
        'type': 'dimension',
        'id': 'itemHoverContentMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-overlay .item-caption-over .item-content`,
    });

    isNotEmpty(attributes['itemHoverContentPadding']) && data.push({
        'type': 'dimension',
        'id': 'itemHoverContentPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-overlay .item-caption-over .item-content`,
    });
    return data;
};

export default panelItemHoverStyle;
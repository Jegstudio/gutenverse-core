import { isNotEmpty } from 'gutenverse-core/helper';

const panelCategoryStyle = (elementId, attributes, data) => {
    /**Panel Category */
    isNotEmpty(attributes['categoryColor']) && data.push({
        'type': 'color',
        'id': 'categoryColor',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['categoryTypography']) && data.push({
        'type': 'typography',
        'id': 'categoryTypography',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
    });

    isNotEmpty(attributes['categoryBackground']) && data.push({
        'type': 'background',
        'id': 'categoryBackground',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
    });

    isNotEmpty(attributes['categoryPadding']) && data.push({
        'type': 'dimension',
        'id': 'categoryPadding',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['categoryMargin']) && data.push({
        'type': 'dimension',
        'id': 'categoryMargin',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['categoryBorderRadius']) && data.push({
        'type': 'dimension',
        'id': 'categoryBorderRadius',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
        'properties': [
            {
                'name': 'border-radius',
                'valueType': 'direct',
                'multiDimension': false,
            }
        ]
    });

    return data;
};

export default panelCategoryStyle;
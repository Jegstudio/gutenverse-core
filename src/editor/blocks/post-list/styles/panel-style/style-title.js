import { isNotEmpty } from 'gutenverse-core/helper';

const titleStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['titlePadding']) && data.push({
        'type': 'dimension',
        'id': 'titlePadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postlist .guten-post .guten-postlist-title`,
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.${elementId} .guten-postlist .guten-post .guten-postlist-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.${elementId} .guten-postlist .guten-post .guten-postlist-title`,
    });

    isNotEmpty(attributes['titleColorHover']) && data.push({
        'type': 'color',
        'id': 'titleColorHover',
        'selector': `.${elementId} .guten-postlist .guten-post:hover .guten-postlist-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['titleTypographyHover']) && data.push({
        'type': 'typography',
        'id': 'titleTypographyHover',
        'selector': `.${elementId} .guten-postlist .guten-post:hover .guten-postlist-title`,
    });
    return data;
};

export default titleStyle;
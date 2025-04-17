import { isNotEmpty } from 'gutenverse-core/helper';

const titleStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['titleMargin']) && data.push({
        'type': 'dimension',
        'id': 'titleMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-post-title`,
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-post-title a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-post-title a`,
    });

    isNotEmpty(attributes['titleColorHover']) && data.push({
        'type': 'color',
        'id': 'titleColorHover',
        'selector': `.${elementId} .guten-postblock .guten-post:hover .guten-postblock-content .guten-post-title a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['titleTypographyHover']) && data.push({
        'type': 'typography',
        'id': 'titleTypographyHover',
        'selector': `.${elementId} .guten-postblock .guten-post:hover .guten-postblock-content .guten-post-title a`,
    });
    return data;
};

export default titleStyle;
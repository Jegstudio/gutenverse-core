import { isNotEmpty } from 'gutenverse-core/helper';

const panelContentStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['activeBackground']) && data.push({
        'type': 'background',
        'id': 'activeBackground',
        'selector': `.${elementId} .portfolio-gallery-container .row-item.current-item`,
    });

    isNotEmpty(attributes['contentAlignment']) && data.push({
        'type': 'plain',
        'id': 'contentAlignment',
        'selector': `.${elementId} .portfolio-gallery-container .row-item .row-item-info`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct'
            }
        ],
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
        'selector': `.${elementId} .portfolio-gallery-container .row-item .row-item-info`,
    });

    isNotEmpty(attributes['contentBackground']) && data.push({
        'type': 'background',
        'id': 'contentBackground',
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-item-info::after`,
    });

    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.${elementId} .portfolio-gallery-container .row-item .row-item-info .info-title`,
    });

    isNotEmpty(attributes['subTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'subTitleTypography',
        'selector': `.${elementId} .portfolio-gallery-container .row-item .row-item-info .info-subtitle`,
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.${elementId} .portfolio-gallery-container .row-item .row-item-info .info-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['subTitleColor']) && data.push({
        'type': 'color',
        'id': 'subTitleColor',
        'selector': `.${elementId} .portfolio-gallery-container .row-item .row-item-info .info-subtitle`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['titleTextShadow']) && data.push({
        'type': 'textShadow',
        'id': 'titleTextShadow',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .portfolio-gallery-container .row-item .row-item-info .info-title`,
    });

    isNotEmpty(attributes['subTitleTextShadow']) && data.push({
        'type': 'textShadow',
        'id': 'subTitleTextShadow',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .portfolio-gallery-container .row-item .row-item-info .info-subtitle`,
    });

    isNotEmpty(attributes['titleColorHover']) && data.push({
        'type': 'color',
        'id': 'titleColorHover',
        'selector': `.${elementId} .portfolio-gallery-container .row-item:hover .row-item-info .info-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['subTitleColorHover']) && data.push({
        'type': 'color',
        'id': 'subTitleColorHover',
        'selector': `.${elementId} .portfolio-gallery-container .row-item:hover .row-item-info .info-subtitle`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['titleTextShadowHover']) && data.push({
        'type': 'textShadow',
        'id': 'titleTextShadowHover',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .portfolio-gallery-container .row-item:hover .row-item-info .info-title`,
    });

    isNotEmpty(attributes['subTitleTextShadowHover']) && data.push({
        'type': 'textShadow',
        'id': 'subTitleTextShadowHover',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .portfolio-gallery-container .row-item:hover .row-item-info .info-subtitle`,
    });

    return data;
};

export default panelContentStyle;
import { isNotEmpty } from 'gutenverse-core/helper';

export const nameStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.guten-post-author.${elementId} .author-name`,
    });

    isNotEmpty(attributes['color']) && data.push({
        'type': 'color',
        'id': 'color',
        'selector': `.guten-post-author.${elementId} .author-name`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['textShadow']) && data.push({
        'type': 'textShadow',
        'id': 'textShadow',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-post-author.${elementId} .author-name`,
    });

    isNotEmpty(attributes['colorHover']) && data.push({
        'type': 'color',
        'id': 'colorHover',
        'selector': `.guten-post-author.${elementId}:hover .author-name`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['textShadowHover']) && data.push({
        'type': 'textShadow',
        'id': 'textShadowHover',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-post-author.${elementId}:hover .author-name`,
    });

    return data;
};
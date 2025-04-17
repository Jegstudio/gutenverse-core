import { isNotEmpty } from 'gutenverse-core/helper';

const spacingStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['iconPading']) && data.push({
        'type': 'dimension',
        'id': 'iconPading',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-icon`,
    });
    isNotEmpty(attributes['textPading']) && data.push({
        'type': 'dimension',
        'id': 'textPading',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-text`,
    });
    return data;
};

export default spacingStyle;
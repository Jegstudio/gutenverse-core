import { isNotEmpty } from 'gutenverse-core/helper';

const thumbnailContainerStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['thumbnailHeight']) && data.push({
        'type': 'plain',
        'id': 'thumbnailHeight',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-thumb .thumbnail-container`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px; padding-bottom: 0',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['thumbnailContainerBackground']) && data.push({
        'type': 'background',
        'id': 'thumbnailContainerBackground',
        'selector': `.${elementId} .guten-postblock .guten-thumb .thumbnail-container`,
    });

    isNotEmpty(attributes['thumbnailRadius']) && data.push({
        'type': 'dimension',
        'id': 'thumbnailRadius',
        'selector': `.${elementId} .guten-postblock .guten-thumb .thumbnail-container`,
        'responsive': true,
        'properties' : [
            {
                'name' : 'border-radius',
                'valueType' : 'direct',
                'multiDimension' : false,
            }
        ]
    });

    isNotEmpty(attributes['thumbnailContainerShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'thumbnailContainerShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-thumb .thumbnail-container`,
    });
    return data;
};

export default thumbnailContainerStyle;
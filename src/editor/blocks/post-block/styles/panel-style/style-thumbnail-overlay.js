import { isNotEmpty } from 'gutenverse-core/helper';

const thumbnailOverlayStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['thumbnailBackground']) && data.push({
        'type': 'background',
        'id': 'thumbnailBackground',
        'selector': `.${elementId} .guten-postblock .guten-overlay`,
    });

    isNotEmpty(attributes['thumbnailOverlayOpacity']) && data.push({
        'type': 'plain',
        'id': 'thumbnailOverlayOpacity',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-overlay`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct'
            }
        ]
    });
    return data;
};

export default thumbnailOverlayStyle;
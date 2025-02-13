import { isNotEmpty } from 'gutenverse-core/helper';

const panelCaptionStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['captionSpace']) && data.push({
        'type': 'plain',
        'id': 'captionSpace',
        'responsive': true,
        'selector': `.${elementId} .guten-caption`,
        'properties': [
            {
                'name': 'margin-top',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.${elementId} .guten-caption`,
    });

    isNotEmpty(attributes['captionColor']) && data.push({
        'type': 'color',
        'id': 'captionColor',
        'selector': `.${elementId} .guten-caption`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    return data;
};

export default panelCaptionStyle;
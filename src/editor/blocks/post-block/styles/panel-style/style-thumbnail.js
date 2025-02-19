import { isNotEmpty } from 'gutenverse-core/helper';

const thumbnailStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['thumbnailWidth']) && data.push({
        'type': 'plain',
        'id': 'thumbnailWidth',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock:not(.postblock-type-5) .guten-thumb, .${elementId} .guten-postblock.postblock-type-5 .guten-post`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}%; flex-basis: {value}%',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['thumbnailMargin']) && data.push({
        'type': 'dimension',
        'id': 'thumbnailMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-thumb`,
    });

    isNotEmpty(attributes['thumbnailPadding']) && data.push({
        'type': 'dimension',
        'id': 'thumbnailPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-thumb`,
    });

    isNotEmpty(attributes['thumbnailBorder']) && data.push({
        'type': 'border',
        'id': 'thumbnailBorder',
        'selector': `.${elementId} .guten-postblock .guten-thumb`,
    });

    isNotEmpty(attributes['thumbnailBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'thumbnailBorderResponsive',
        'selector': `.${elementId} .guten-postblock .guten-thumb`,
    });

    isNotEmpty(attributes['thumbnailBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'thumbnailBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-thumb`,
    });
    return data;
};

export default thumbnailStyle;
import { isNotEmpty } from 'gutenverse-core/helper';

const imageStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['imageWidth']) && data.push({
        'type': 'plain',
        'id': 'imageWidth',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-post a img`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern' : '{value}%',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['imageHeight']) && data.push({
        'type': 'plain',
        'id': 'imageHeight',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-post a img`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['imageFit']) && data.push({
        'type': 'plain',
        'id': 'imageFit',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-post a img`,
        'properties': [
            {
                'name': 'object-fit',
                'valueType': 'function',
                'functionName': 'handleDefaultValue'
            }
        ],
    });

    isNotEmpty(attributes['imageMargin']) && data.push({
        'type': 'dimension',
        'id': 'imageMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postlist .guten-post a img`,
    });

    isNotEmpty(attributes['imageBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'imageBorder',
        'selector': `.${elementId} .guten-postlist .guten-post a img`,
    });
    return data;
};

export default imageStyle;
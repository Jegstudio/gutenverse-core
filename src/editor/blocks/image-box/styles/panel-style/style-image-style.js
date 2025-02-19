import { isNotEmpty } from 'gutenverse-core/helper';

const panelImageStyle = (elementId, attributes, data) => {
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
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-header`,
    });

    isNotEmpty(attributes['imagePadding']) && data.push({
        'type': 'dimension',
        'id': 'imagePadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-header`,
    });

    isNotEmpty(attributes['imageBorderRadius']) && data.push({
        'type': 'dimension',
        'id': 'imageBorderRadius',
        'properties': [
            {
                'name': 'border-radius',
                'valueType': 'direct',
                'multiDimension' : false
            }
        ],
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-header`,
    });

    isNotEmpty(attributes['imageBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'imageBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-header`,
    });

    isNotEmpty(attributes['imageHeight']) && data.push({
        'type': 'unitPoint',
        'id': 'imageHeight',
        'responsive': true,
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-header img`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['imageFit']) && data.push({
        'type': 'plain',
        'id': 'imageFit',
        'properties': [
            {
                'name': 'object-fit',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-header img`,
    });

    isNotEmpty(attributes['imageOpacity']) && data.push({
        'type': 'plain',
        'id': 'imageOpacity',
        'responsive' : true,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'function',
                'functionName' : 'handleOpacity'
            }
        ],
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-header img`,
    });

    isNotEmpty(attributes['imageHoverOpacity']) && data.push({
        'type': 'plain',
        'id': 'imageHoverOpacity',
        'responsive' : true,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'function',
                'functionName' : 'handleOpacity'
            }
        ],
        'selector': `.${elementId}.gutenverse-image-box:hover .inner-container .image-box-header img`,
    });

    isNotEmpty(attributes['imageHoverScale']) && data.push({
        'type': 'plain',
        'id': 'imageHoverScale',
        'responsive' : true,
        'properties': [
            {
                'name': 'transform',
                'valueType': 'pattern',
                'pattern' : ` scale({value});
                    -webkit-transform: scale({value}); 
                    -o-transform: scale({value}); 
                    -moz-transform: scale({value}); 
                    -ms-transform: scale({value});`,
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId}.gutenverse-image-box:hover .inner-container .image-box-header img`,
    });

    isNotEmpty(attributes['imageFilter']) && data.push({
        'type': 'plain',
        'id': 'imageFilter',
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-header img`,
        'properties': [
            {
                'name': 'filter',
                'valueType': 'function',
                'functionName': 'handleFilterImage',
            }
        ],
    });

    isNotEmpty(attributes['imageFilterHover']) && data.push({
        'type': 'plain',
        'id': 'imageFilterHover',
        'selector': `.${elementId}.gutenverse-image-box:hover .inner-container .image-box-header img`,
        'properties': [
            {
                'name': 'filter',
                'valueType': 'function',
                'functionName': 'handleFilterImage',
            }
        ],
    });

    return data;
};

export default panelImageStyle;
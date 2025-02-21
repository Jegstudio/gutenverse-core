import { isNotEmpty } from 'gutenverse-core/helper';

const panelImageStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['align']) && data.push({
        'type': 'plain',
        'id': 'align',
        'responsive': true,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'function',
                'functionName' : 'handleAlignReverse'
            }
        ],
        'selector': `.${elementId}.guten-image .guten-image-wrapper`,
    });

    isNotEmpty(attributes['width']) && data.push({
        'type': 'unitPoint',
        'id': 'width',
        'responsive' : true,
        'selector': `.${elementId}.guten-image img`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['height']) && data.push({
        'type': 'unitPoint',
        'id': 'height',
        'responsive' : true,
        'selector': `.${elementId}.guten-image img`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['opacity']) && data.push({
        'type': 'plain',
        'id': 'opacity',
        'selector': `.${elementId}.guten-image img`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['imgFilter']) && data.push({
        'type': 'plain',
        'id': 'imgFilter',
        'selector': `.${elementId}.guten-image img`,
        'properties': [
            {
                'name': 'filter',
                'valueType': 'function',
                'functionName': 'handleFilterImage',
            }
        ],
    });

    isNotEmpty(attributes['imageFit']) && data.push({
        'type': 'plain',
        'id': 'imageFit',
        'responsive' : true,
        'selector': `.${elementId}.guten-image img`,
        'properties': [
            {
                'name': 'object-fit',
                'valueType': 'function',
                'functionName': 'handleDefaultValue'
            }
        ]
    });

    isNotEmpty(attributes['imgBorder']) && data.push({
        'type': 'border',
        'id': 'imgBorder',
        'selector': `.${elementId}.guten-image img`,
    });

    isNotEmpty(attributes['imgBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'imgBorderResponsive',
        'selector': `.${elementId}.guten-image img`,
    });

    isNotEmpty(attributes['imgShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'imgShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-image img`,
    });
    return data;
};

export default panelImageStyle;
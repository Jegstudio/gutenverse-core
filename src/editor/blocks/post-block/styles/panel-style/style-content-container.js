import { isNotEmpty } from 'gutenverse-core/helper';

const panelContentContainerStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['contentAlign']) && data.push({
        'type': 'plain',
        'responsive': true,
        'id': 'contentAlign',
        'selector': `.${elementId} .guten-postblock .guten-postblock-content`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['contentAlign']) && data.push({
        'type': 'plain',
        'responsive': true,
        'id': 'contentAlign',
        'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta-bottom`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'function',
                'functionName' : 'handleAlignReverse'
            }
        ],
    });

    isNotEmpty(attributes['contentContainerBackground']) && data.push({
        'type': 'background',
        'id': 'contentContainerBackground',
        'selector': `.${elementId} .guten-postblock .guten-postblock-content`,
    });

    isNotEmpty(attributes['contentMargin']) && data.push({
        'type': 'dimension',
        'id': 'contentMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-postblock-content`,
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
        'selector': `.${elementId} .guten-postblock .guten-postblock-content`,
    });

    isNotEmpty(attributes['contentBorder']) && data.push({
        'type': 'border',
        'id': 'contentBorder',
        'selector': `.${elementId} .guten-postblock .guten-postblock-content`,
    });

    isNotEmpty(attributes['contentBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'contentBorderResponsive',
        'selector': `.${elementId} .guten-postblock .guten-postblock-content`,
    });

    isNotEmpty(attributes['contentContainerShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'contentContainerShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-postblock-content`,
    });
    return data;
};

export default panelContentContainerStyle;
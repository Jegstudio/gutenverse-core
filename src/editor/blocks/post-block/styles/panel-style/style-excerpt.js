import { isNotEmpty } from 'gutenverse-core/helper';

const panelExcerptStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['excerptMargin']) && data.push({
        'type': 'dimension',
        'id': 'excerptMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-post-excerpt`,
    });

    isNotEmpty(attributes['excerptColor']) && data.push({
        'type': 'color',
        'id': 'excerptColor',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-post-excerpt p`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['excerptTypography']) && data.push({
        'type': 'typography',
        'id': 'excerptTypography',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-post-excerpt p`,
    });

    data.push({
        'type': 'plain',
        'id': 'excerptInline',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-post-excerpt`,
        'properties': [
            {
                'name': 'display',
                'valueType': 'function',
                'functionName': 'handleSimpleCondition',
                'functionProps' : {
                    'valueTrue' : 'inline-flex',
                    'valueFalse' : 'flex'
                }
            }
        ],
    });

    return data;
};

export default panelExcerptStyle;
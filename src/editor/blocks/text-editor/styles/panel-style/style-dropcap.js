import { isNotEmpty } from 'gutenverse-core/helper';

const dropcapStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['dropcapTypography']) && data.push({
        'type': 'typography',
        'id': 'dropcapTypography',
        'selector': `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter, .gutenverse-text-editor.${elementId}.dropcap > div > div > p:first-child:first-letter`,
    });

    isNotEmpty(attributes['dropcapColor']) && data.push({
        'type': 'color',
        'id': 'dropcapColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector': `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter, .gutenverse-text-editor.${elementId}.dropcap > div > div > p:first-child:first-letter`,
    });

    isNotEmpty(attributes['dropcapBgColor']) && data.push({
        'type': 'color',
        'id': 'dropcapBgColor',
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
        'selector': `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter, .gutenverse-text-editor.${elementId}.dropcap > div > div > p:first-child:first-letter`,
    });

    isNotEmpty(attributes['dropcapMargin']) && data.push({
        'type': 'dimension',
        'id': 'dropcapMargin',
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter, .gutenverse-text-editor.${elementId}.dropcap > div > div > p:first-child:first-letter`,
    });

    isNotEmpty(attributes['dropcapPadding']) && data.push({
        'type': 'dimension',
        'id': 'dropcapPadding',
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter, .gutenverse-text-editor.${elementId}.dropcap > div > div > p:first-child:first-letter`,
    });

    isNotEmpty(attributes['dropcapBorderType']) && data.push({
        'type': 'plain',
        'id': 'dropcapBorderType',
        'properties': [
            {
                'name': 'border-style',
                'valueType': 'direct'
            }
        ],
        'selector': `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter, .gutenverse-text-editor.${elementId}.dropcap > div > div > p:first-child:first-letter`,
    });

    isNotEmpty(attributes['dropcapBorderColor']) && data.push({
        'type': 'color',
        'id': 'dropcapBorderColor',
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ],
        'selector': `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter, .gutenverse-text-editor.${elementId}.dropcap > div > div > p:first-child:first-letter`,
    });

    isNotEmpty(attributes['dropcapBorderWidth']) && data.push({
        'type': 'dimension',
        'id': 'dropcapBorderWidth',
        'properties': [
            {
                'name': 'border-width',
                'valueType': 'direct',
                'multiDimension': false
            }
        ],
        'selector': `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter, .gutenverse-text-editor.${elementId}.dropcap > div > div > p:first-child:first-letter`,
    });

    isNotEmpty(attributes['dropcapBorderRadius']) && data.push({
        'type': 'dimension',
        'id': 'dropcapBorderRadius',
        'properties': [
            {
                'name': 'border-radius',
                'valueType': 'direct',
                'multiDimension': false
            }
        ],
        'selector': `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter, .gutenverse-text-editor.${elementId}.dropcap > div > div > p:first-child:first-letter`,
    });
    return data;
};

export default dropcapStyle;
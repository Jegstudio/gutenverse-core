import { isNotEmpty } from 'gutenverse-core/helper';

const contentStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['columns']) && data.push({
        'type': 'plain',
        'id': 'columns',
        'responsive': true,
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'columns',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['gap']) && data.push({
        'type': 'unitPoint',
        'id': 'gap',
        'responsive': true,
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'column-gap',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['alignment']) && data.push({
        'type': 'plain',
        'id': 'alignment',
        'responsive': true,
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['textColor']) && data.push({
        'type': 'color',
        'id': 'textColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}`,
    });

    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.${elementId}`,
    });
    return data;
};

export default contentStyle;
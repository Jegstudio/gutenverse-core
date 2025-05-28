import { isNotEmpty } from 'gutenverse-core/helper';

const contentStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['contentAlignment']) && data.push({
        'type': 'plain',
        'id': 'contentAlignment',
        'responsive': true,
        'selector': `.${elementId} .taxonomy-list-item`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['contentSpacing']) && data.push({
        'type': 'unitPoint',
        'id': 'contentSpacing',
        'responsive': true,
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item`,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'pattern',
                'pattern' : attributes['layout'] === 'column' ? 'calc({value}/2) 0' : '0 calc({value}/2)',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['contentTypography']) && data.push({
        'type': 'typography',
        'id': 'contentTypography',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a .taxonomy-list-content`,
    });

    isNotEmpty(attributes['contentColor']) && data.push({
        'type': 'color',
        'id': 'contentColor',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['contentColorHover']) && data.push({
        'type': 'color',
        'id': 'contentColorHover',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a:hover`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });
    return data;
};

export default contentStyle;
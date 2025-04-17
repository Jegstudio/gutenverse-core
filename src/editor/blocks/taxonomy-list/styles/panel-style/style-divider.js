import { isNotEmpty } from 'gutenverse-core/helper';

const dividerStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['colorDivider']) && attributes['showDivider'] && data.push({
        'type': 'color',
        'id': 'colorDivider',
        'selector': `.${elementId} .taxonomy-list-item:not(:first-child)`,
        'properties' : [
            {
                'name' : 'border-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['typeDivider']) && attributes['showDivider'] && data.push({
        'type': 'plain',
        'id': 'typeDivider',
        'selector': `.${elementId} .taxonomy-list-item:not(:first-child)`,
        'properties' : [
            {
                'name' : attributes['layout'] === 'column' ? 'border-top-style' : 'border-left-style',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['widthDivider']) && attributes['showDivider'] && data.push({
        'type': 'unitPoint',
        'id': 'widthDivider',
        'selector': `.${elementId} .taxonomy-list-item`,
        'properties' : [
            {
                'name' : attributes['layout'] === 'column' ? 'width' : 'height',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['sizeDivider']) && attributes['showDivider'] && data.push({
        'type': 'unitPoint',
        'id': 'sizeDivider',
        'selector': `.${elementId} .taxonomy-list-item`,
        'properties' : [
            {
                'name' : 'border-width',
                'valueType' : 'direct'
            }
        ]
    });
    return data;
};

export default dividerStyle;
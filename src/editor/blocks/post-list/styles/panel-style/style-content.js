import { isNotEmpty } from 'gutenverse-core/helper';

const contentStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['column']) && attributes['layout'] === 'horizontal' && data.push({
        'type': 'plain',
        'id': 'column',
        'responsive': true,
        'selector': `.${elementId} .guten-posts`,
        'properties': [
            {
                'name': 'grid-template-columns',
                'valueType': 'pattern',
                'pattern' : 'repeat({value}, minmax(0, 1fr))',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['columnGap']) && attributes['layout'] === 'horizontal' && data.push({
        'type': 'plain',
        'id': 'columnGap',
        'responsive': true,
        'selector': `.${elementId} .guten-posts`,
        'properties': [
            {
                'name': 'grid-column-gap',
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
    return data;
};

export default contentStyle;
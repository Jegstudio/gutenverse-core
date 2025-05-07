import { isNotEmpty } from 'gutenverse-core/helper';

const panelContentStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['column']) && data.push({
        'type': 'plain',
        'id': 'column',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock .guten-posts`,
        'properties' : [
            {
                'name' : 'grid-template-columns',
                'valueType' : 'pattern',
                'pattern' : 'repeat({value}, minmax(0, 1fr))',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });
    return data;
};

export default panelContentStyle;
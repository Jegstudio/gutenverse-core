import { isNotEmpty } from 'gutenverse-core/helper';

const settingStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['layout']) && data.push({
        'type': 'plain',
        'id': 'layout',
        'selector': `.${elementId} .taxonomy-list-wrapper`,
        'properties': [
            {
                'name': 'flex-direction',
                'valueType': 'direct',
            }
        ],
    });
    isNotEmpty(attributes['layout']) && data.push({
        'type': 'plain',
        'id': 'layout',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item`,
        'properties': [
            {
                'name': 'flex-direction',
                'valueType': 'direct',
            }
        ],
    });
    return data;
};

export default settingStyle;
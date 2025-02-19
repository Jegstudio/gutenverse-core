import { isNotEmpty } from 'gutenverse-core/helper';

const panelWrapperStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['imagePosition']) && data.push({
        'type': 'plain',
        'id': 'imagePosition',
        'responsive': true,
        'properties': [
            {
                'name': 'flex-direction',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId}.gutenverse-image-box .inner-container`,
    });
    return data;
};

export default panelWrapperStyle;
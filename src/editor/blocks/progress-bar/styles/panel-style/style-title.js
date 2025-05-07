import { isNotEmpty } from 'gutenverse-core/helper';

const titleStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar-content .skill-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar-content .skill-title`,
    });

    isNotEmpty(attributes['titleTextShadow']) && data.push({
        'type': 'textShadow',
        'id': 'titleTextShadow',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar-content .skill-title`,
    });
    return data;
};

export default titleStyle;
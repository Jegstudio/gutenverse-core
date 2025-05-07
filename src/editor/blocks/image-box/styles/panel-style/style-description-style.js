import { isNotEmpty } from 'gutenverse-core/helper';

const panelDescStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['descriptionMargin']) && data.push({
        'type': 'dimension',
        'id': 'descriptionMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-inner .body-description`,
    });

    isNotEmpty(attributes['descriptionTypography']) && data.push({
        'type': 'typography',
        'id': 'descriptionTypography',
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-inner .body-description`,
    });

    isNotEmpty(attributes['descriptionNormalColor']) && data.push({
        'type': 'color',
        'id': 'descriptionNormalColor',
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-inner .body-description`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['descriptionHoverColor']) && data.push({
        'type': 'color',
        'id': 'descriptionHoverColor',
        'selector': `.${elementId}.gutenverse-image-box:hover .inner-container .image-box-body .body-inner .body-description`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    return data;
};

export default panelDescStyle;
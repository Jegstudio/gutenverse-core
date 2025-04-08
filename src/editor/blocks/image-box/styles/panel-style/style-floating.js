import { isNotEmpty } from 'gutenverse-core/helper';

const panelFloatingStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['floatMarginTop']) && data.push({
        'type': 'plain',
        'id': 'floatMarginTop',
        'responsive': true,
        'selector': `.${elementId}.gutenverse-image-box.style-floating .inner-container .image-box-body .body-inner`,
        'properties': [
            {
                'name': 'margin-top',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['floatWidth']) && data.push({
        'type': 'plain',
        'id': 'floatWidth',
        'responsive': true,
        'selector': `.${elementId}.gutenverse-image-box.style-floating .inner-container .image-box-body`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}%',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['floatHeight']) && data.push({
        'type': 'plain',
        'id': 'floatHeight',
        'responsive': true,
        'selector': `.${elementId}.gutenverse-image-box.style-floating .inner-container .image-box-body .body-inner`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['floatHeightHover']) && data.push({
        'type': 'plain',
        'id': 'floatHeightHover',
        'responsive': true,
        'selector': `.${elementId}.gutenverse-image-box.style-floating:hover .inner-container .image-box-body .body-inner`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });
    return data;
};

export default panelFloatingStyle;
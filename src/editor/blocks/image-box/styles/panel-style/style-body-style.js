import { isNotEmpty } from 'gutenverse-core/helper';

const panelBodyStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['bodyBackground']) && data.push({
        'type': 'background',
        'id': 'bodyBackground',
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-inner`,
    });

    isNotEmpty(attributes['containerBorder']) && data.push({
        'type': 'border',
        'id': 'containerBorder',
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-inner`,
    });

    isNotEmpty(attributes['containerBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'containerBorderResponsive',
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-inner`,
    });

    isNotEmpty(attributes['containerMargin']) && data.push({
        'type': 'dimension',
        'id': 'containerMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-inner`,
    });

    isNotEmpty(attributes['containerPadding']) && data.push({
        'type': 'dimension',
        'id': 'containerPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-inner`,
    });

    isNotEmpty(attributes['containerBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'containerBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-inner`,
    });

    isNotEmpty(attributes['bodyAlignment']) && data.push({
        'type': 'plain',
        'id': 'bodyAlignment',
        'responsive': true,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-inner`,
    });

    isNotEmpty(attributes['hoverBottomColor']) && data.push({
        'type': 'color',
        'id': 'hoverBottomColor',
        'selector': `.${elementId}.gutenverse-image-box .inner-container .border-bottom .animated`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['hoverBottomHeight']) && data.push({
        'type': 'unitPoint',
        'id': 'hoverBottomHeight',
        'responsive': true,
        'selector': `.${elementId}.gutenverse-image-box .border-bottom, .${elementId}.gutenverse-image-box .border-bottom .animated `,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct'
            }
        ]
    });
    return data;
};

export default panelBodyStyle;
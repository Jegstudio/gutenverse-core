import { isNotEmpty } from 'gutenverse-core/helper';

const panelLogosWrapperStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['logoWrapperMargin']) && data.push({
        'type': 'dimension',
        'id': 'logoWrapperMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image`,
    });

    isNotEmpty(attributes['logoWrapperPadding']) && data.push({
        'type': 'dimension',
        'id': 'logoWrapperPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image`,
    });
    return data;
};

export default panelLogosWrapperStyle;
import { isNotEmpty } from 'gutenverse-core/helper';

const contentStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['alignText']) && data.push({
        'type': 'plain',
        'id': 'alignText',
        'responsive': true,
        'selector': `.${elementId} .testimonial-box`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct',
            }
        ]
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
        'selector': `.${elementId} .guten-testimonial-item .testimonial-box`,
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
        'selector': `.${elementId} .guten-testimonial-item .testimonial-box`,
    });

    isNotEmpty(attributes['containerBackground']) && data.push({
        'type': 'background',
        'id': 'containerBackground',
        'selector': `.${elementId} .guten-testimonial-item .testimonial-box`,
    });

    isNotEmpty(attributes['containerBackgroundHover']) && data.push({
        'type': 'background',
        'id': 'containerBackgroundHover',
        'selector': `.${elementId} .guten-testimonial-item .testimonial-box:hover`,
    });

    isNotEmpty(attributes['containerBorder']) && data.push({
        'type': 'border',
        'id': 'containerBorder',
        'selector': `.guten-testimonials.${elementId} .swiper-container .guten-testimonial-item .testimonial-box`,
    });

    isNotEmpty(attributes['containerBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'containerBorderResponsive',
        'selector': `.guten-testimonials.${elementId} .swiper-container .guten-testimonial-item .testimonial-box`,
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
        'selector': `.guten-testimonials.${elementId} .swiper-container .guten-testimonial-item .testimonial-box`,
    });


    isNotEmpty(attributes['containerBorderHover']) && data.push({
        'type': 'border',
        'id': 'containerBorderHover',
        'selector': `.guten-testimonials.${elementId} .swiper-container .guten-testimonial-item .testimonial-box:hover`,
    });

    isNotEmpty(attributes['containerBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'containerBorderHoverResponsive',
        'selector': `.guten-testimonials.${elementId} .swiper-container .guten-testimonial-item .testimonial-box:hover`,
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
        'selector': `.guten-testimonials.${elementId} .swiper-container .guten-testimonial-item .testimonial-box:hover`,
    });
    return data;
};

export default contentStyle;
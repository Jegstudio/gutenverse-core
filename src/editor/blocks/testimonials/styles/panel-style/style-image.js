import { isNotEmpty } from 'gutenverse-core/helper';

const imageStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['imageBackground']) && data.push({
        'type': 'background',
        'id': 'imageBackground',
        'selector': `.${elementId} .guten-testimonial-item .profile-image`,
    });

    isNotEmpty(attributes['imageBorder']) && data.push({
        'type': 'border',
        'id': 'imageBorder',
        'selector': `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-image`,
    });

    isNotEmpty(attributes['imageBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'imageBorderResponsive',
        'selector': `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-image`,
    });

    isNotEmpty(attributes['imageRadius']) && data.push({
        'type': 'dimension',
        'id': 'imageRadius',
        'responsive': true,
        'selector': `.${elementId} .guten-testimonial-item .profile-image img`,
        'properties': [
            {
                'name': 'border-radius',
                'valueType': 'direct',
                'multiDimension' : false
            }
        ]
    });

    isNotEmpty(attributes['imageMargin']) && data.push({
        'type': 'dimension',
        'id': 'imageMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-testimonial-item .profile-image`,
    });

    isNotEmpty(attributes['imagePadding']) && data.push({
        'type': 'dimension',
        'id': 'imagePadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-testimonial-item .profile-image`,
    });

    isNotEmpty(attributes['bottomSpace']) && data.push({
        'type': 'plain',
        'id': 'bottomSpace',
        'responsive': true,
        'selector': `.${elementId}.guten-testimonials.style-1 .swiper-container .guten-testimonial-item .testimonial-box .comment-bio`,
        'properties': [
            {
                'name': 'bottom',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['imageWidth']) && data.push({
        'type': 'plain',
        'id': 'imageWidth',
        'responsive': true,
        'selector': `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-image img`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['imageHeight']) && data.push({
        'type': 'plain',
        'id': 'imageHeight',
        'responsive': true,
        'selector': `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-image img`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern' : '{value}px',
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

export default imageStyle;
import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';
import { handleBackground, handleBorderV2, handleDimension } from 'gutenverse-core/styling';

export const panelImage = ({ elementId, contentType }) => {
    return [
        {
            id: 'imageBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-testimonial-item .profile-image`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'imageBorder_v2',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-image`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'imageMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-testimonial-item .profile-image`,
                    render: value => handleDimension(value, 'margin')
                }
            ],
        },
        {
            id: 'imagePadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-testimonial-item .profile-image`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: 'bottomSpace',
            show: contentType && contentType === 1,
            label: __('Bottom', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: -200,
            max: 200,
            step: 1,
            style: [
                {
                    selector: `.${elementId}.guten-testimonials.style-1 .swiper-container .guten-testimonial-item .testimonial-box .comment-bio`,
                    render: value => `bottom: ${value}px;`
                }
            ]
        },
        {
            id: 'imageWidth',
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-image img`,
                    render: value => `width: ${value}px;`
                }
            ]
        },
        {
            id: 'imageHeight',
            label: __('Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-image img`,
                    render: value => `height: ${value}px;`
                }
            ]
        },
    ];
};
import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BorderResponsiveControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { handleBackground, handleBorder, handleBorderResponsive, handleDimension } from 'gutenverse-core/styling';

export const panelImage = ({ elementId, contentType }) => {
    const device = getDeviceType();

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
            id: 'imageBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-image`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'imageBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-image`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
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
            unit: 'px',
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
            unit: 'px',
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
            unit: 'px',
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
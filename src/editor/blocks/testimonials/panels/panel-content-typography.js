import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, DimensionControl, RangeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const panelContentTypography = props => {
    const {
        elementId,
        quoteOverride,
        __textHover,
    } = props;

    return [
        {
            id: 'nameTypography',
            label: __('Name Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-testimonial-item .testimonial-box .profile-info .profile-name`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'designationTypography',
            label: __('Designation Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-testimonial-item .testimonial-box .profile-info .profile-des`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'designationSpacing',
            label: __('Designation Spacing', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .guten-testimonial-item .testimonial-box .profile-info .profile-des`,
                    render: value => `margin-top: ${value}px;`
                }
            ]
        },
        {
            id: 'descriptionTypography',
            label: __('Comment Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-testimonial-item .testimonial-box .comment-content p`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'descriptionMargin',
            label: __('Comment Margin', 'gutenverse'),
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
                    selector: `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .comment-content p`,
                    render: value => handleDimension(value, 'margin')
                }
            ],
        },
        {
            id: 'quoteSize',
            label: __('Quote Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .guten-testimonial-item .testimonial-box .icon-content i`,
                    render: value => `font-size: ${value}px;`
                }
            ],
        },
        {
            id: 'quoteOverride',
            label: __('Override Quote Position', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'quotePositionTop',
            show: quoteOverride,
            label: __('Top', 'gutenverse'),
            component: RangeControl,
            min: -200,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .icon-content.quote-override`,
                    allowRender: () => quoteOverride,
                    render: value => `top: ${value}px;`
                }
            ],
        },
        {
            id: 'quotePositionLeft',
            show: quoteOverride,
            label: __('Left', 'gutenverse'),
            component: RangeControl,
            min: -200,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .icon-content.quote-override`,
                    allowRender: () => quoteOverride,
                    render: value => `left: ${value}px;`
                }
            ],
        },
        {
            id: '__textHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
        },
        {
            id: 'nameNormalColor',
            show: !__textHover || __textHover === 'normal',
            label: __('Name Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-info .profile-name`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'nameHoverColor',
            show: __textHover === 'hover',
            label: __('Name Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item:hover .testimonial-box .profile-info .profile-name`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'designationNormalColor',
            show: !__textHover || __textHover === 'normal',
            label: __('Designation Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-info .profile-des`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'designationHoverColor',
            show: __textHover === 'hover',
            label: __('Designation Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item:hover .testimonial-box .profile-info .profile-des`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'descriptionNormalColor',
            show: !__textHover || __textHover === 'normal',
            label: __('Comment Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .comment-content p`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'descriptionHoverColor',
            show: __textHover === 'hover',
            label: __('Comment Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item:hover .testimonial-box .comment-content p`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'quoteNormalColor',
            show: !__textHover || __textHover === 'normal',
            label: __('Quote Icon Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-testimonial-item .testimonial-box .icon-content i`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'quoteHoverColor',
            show: __textHover === 'hover',
            label: __('Quote Icon Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-testimonial-item:hover .testimonial-box .icon-content i`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
    ];
};
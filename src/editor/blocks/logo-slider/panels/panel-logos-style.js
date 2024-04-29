import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, CheckboxControl, DimensionControl, RangeControl, SelectControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { allowRenderBoxShadow, handleBackground, handleBorder, handleBorderResponsive, handleDimension } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const logosStylePanel = (props) => {
    const {
        elementId,
        imageFixHeight,
        switcher,
        setSwitcher,
        removeStyle,
        imageHeight,
        imageFit,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'imageFixHeight',
            label: __('Fix Height', 'gutenverse'),
            component: CheckboxControl,
            onChange: values => {
                if (!values.imageFixHeight) {
                    removeStyle('imageHeight-style-0');
                    removeStyle('imageFit-style-0');
                }
            },
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image img`,
                    allowRender: value => value,
                    render: () => {
                        return `height: ${imageHeight[device]}px;`;
                    }
                },
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image img`,
                    allowRender: value => value,
                    render: () => `object-fit: ${imageFit[device]};`
                }
            ]
        },
        {
            id: 'imageHeight',
            show: imageFixHeight,
            label: __('Height', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 400,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image img`,
                    allowRender: () => imageFixHeight,
                    render: value => `height: ${value}px;`
                }
            ]
        },
        {
            id: 'imageFit',
            show: imageFixHeight,
            label: __('Image Fit', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'cover',
                    label: 'Cover'
                },
                {
                    value: 'contain',
                    label: 'Contain'
                },
                {
                    value: 'fill',
                    label: 'Fill'
                },
                {
                    value: 'scale-down',
                    label: 'Scale Down'
                },
                {
                    value: 'none',
                    label: 'None'
                },
            ],
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image img`,
                    allowRender: () => imageFixHeight,
                    render: value => `object-fit: ${value};`
                }
            ]
        },
        {
            id: '__imageHover',
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
            onChange: ({ __imageHover }) => setSwitcher({ ...switcher, imageHover: __imageHover })
        },
        {
            id: 'imagePadding',
            show: !switcher.imageHover || switcher.imageHover === 'normal',
            label: __('Normal Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'imageMargin',
            show: !switcher.imageHover || switcher.imageHover === 'normal',
            label: __('Normal Margin', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'imageHoverPadding',
            show: switcher.imageHover === 'hover',
            label: __('Hover Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'imageHoverMargin',
            show: switcher.imageHover === 'hover',
            label: __('Hover Margin', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'logoBackgroundNormal',
            show: !switcher.imageHover || switcher.imageHover === 'normal',
            label: __('Logo Background Normal', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'logoBackgroundHover',
            show: switcher.imageHover === 'hover',
            label: __('Logo Background Hover', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'imageBorder',
            show: (!switcher.imageHover || switcher.imageHover === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'imageBorderResponsive',
            show: (!switcher.imageHover || switcher.imageHover === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'imageBoxShadow',
            show: !switcher.imageHover || switcher.imageHover === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'opacity',
            show: !switcher.imageHover || switcher.imageHover === 'normal',
            label: __('Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0.1,
            max: 1,
            step: 0.1,
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
                    render: value => `opacity: ${value};`
                },
            ],
        },
        {
            id: 'imageBorderHover',
            show: switcher.imageHover === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'imageBorderHoverResponsive',
            show: switcher.imageHover === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'imageBoxShadowHover',
            show: switcher.imageHover === 'hover',
            label: __('Hover Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'hoverOpacity',
            show: switcher.imageHover === 'hover',
            label: __('Hover Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0.1,
            max: 1,
            step: 0.1,
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
                    render: value => `opacity: ${value};`
                },
            ],
        },
    ];
};
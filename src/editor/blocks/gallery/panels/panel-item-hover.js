import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { BackgroundControl, BorderControl, BorderResponsiveControl, ColorControl, DimensionControl, HeadingControl, IconRadioControl, RangeControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const itemHoverPanel = (props) => {
    const {
        elementId
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'itemHoverBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'itemHoverBackground',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .thumbnail-wrap .caption-wrap .item-hover-bg`,
                }
            ]
        },
        {
            id: 'itemHoverOpacity',
            label: __('Opacity', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 0,
            max: 1,
            step: 0.01,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'itemHoverOpacity',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .thumbnail-wrap .caption-wrap .item-hover-bg`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'itemHoverPadding',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'itemHoverBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'itemHoverBorder',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap .item-hover-bg`,
                }
            ]
        },
        {
            id: 'itemHoverBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'itemHoverBorderResponsive',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap .item-hover-bg`,
                }
            ]
        },
        {
            id: 'itemHoverAlign',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight />,
                },
            ],
        },
        {
            id: 'submenuTitleSplitter',
            component: HeadingControl,
            label: __('Title Style')
        },
        {
            id: 'itemHoverTitleColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'itemHoverTitleColor',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-overlay .item-caption-over .item-title`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'itemHoverTitleColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'itemHoverTitleColorHover',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-overlay:hover .item-caption-over .item-title`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'itemHoverTitleTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'itemHoverTitleMargin',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'itemHoverTitlePadding',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'submenuContentSplitter',
            component: HeadingControl,
            label: __('Content Style')
        },
        {
            id: 'itemHoverContentColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'itemHoverContentColor',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-overlay .item-caption-over .item-content`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'itemHoverContentColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'itemHoverContentColorHover',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-overlay:hover .item-caption-over .item-content`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'itemHoverContentTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'itemHoverContentMargin',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'itemHoverContentPadding',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
    ];
};
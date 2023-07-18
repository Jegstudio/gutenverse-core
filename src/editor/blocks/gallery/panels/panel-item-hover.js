import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { BackgroundControl, BorderControl, ColorControl, DimensionControl, HeadingControl, IconRadioControl, RangeControl, TypographyControl } from 'gutenverse-core/controls';
import { handleBackground, handleBorder, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const itemHoverPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'itemHoverBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .thumbnail-wrap .caption-wrap .item-hover-bg`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'submenuSplitter',
            component: HeadingControl,
        },
        {
            id: 'itemHoverOpacity',
            label: __('Opacity', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 0,
            max: 1,
            step: 0.01,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .thumbnail-wrap .caption-wrap .item-hover-bg`,
                    render: value => `opacity: ${value};`
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
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .thumbnail-wrap .caption-wrap`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'itemHoverBorder',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap .item-hover-bg`,
                    hasChild: true,
                    render: value => handleBorder(value)
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
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight/>,
                },
            ],
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap`,
                    render: value => `text-align: ${value};`
                }
            ]
        },
        {
            id: 'submenuSplitter',
            component: HeadingControl,
            label: __('Title Typography')
        },
        {
            id: 'itemHoverTitleColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over .item-title`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'itemHoverTitleColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over:hover .item-title`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'itemHoverTitleTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over .item-title`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'submenuSplitter',
            component: HeadingControl,
            label: __('Content Typography')
        },
        {
            id: 'itemHoverContentColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over .item-content`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'itemHoverContentColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over:hover .item-content`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'itemHoverContentTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over .item-content`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
    ];
};
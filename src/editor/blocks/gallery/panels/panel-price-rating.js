import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, HeadingControl, TypographyControl } from 'gutenverse-core-editor/controls';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const priceRatingPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'priceRatingPadding',
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
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'submenuSplitter',
            component: HeadingControl,
            label: __('Price')
        },
        {
            id: 'priceColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'priceTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'submenuSplitter',
            component: HeadingControl,
            label: __('Rating')
        },
        {
            id: 'ratingColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'ratingStarColor',
            label: __('Star Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating li`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'ratingTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
    ];
};
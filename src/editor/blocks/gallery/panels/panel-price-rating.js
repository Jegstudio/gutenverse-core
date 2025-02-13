import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, SelectControl, SizeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { handleColor, handleDimension, handleTypography, handleUnitPoint } from 'gutenverse-core/styling';

export const priceRatingPanel = (props) => {
    const {
        elementId,
        selectionPriceRatingPadding,
        setSwitcher,
        switcher
    } = props;

    return [
        {
            id: 'selectionPriceRatingPadding',
            label: __('Select Setting Price Rating Padding', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'all',
                    label: __('All in One')
                },
                {
                    value: 'custom',
                    label: __('Custom')
                },
            ],
        },
        {
            id: 'priceRatingPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            show: selectionPriceRatingPadding === 'all',
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
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price, .${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
                    allowRender: () => selectionPriceRatingPadding === 'all',
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: '__priceRating',
            component: SwitchControl,
            options: [
                {
                    value: 'price',
                    label: 'Price'
                },
                {
                    value: 'rating',
                    label: 'Rating'
                }
            ],
            onChange: ({ __priceRating }) => setSwitcher({ ...switcher, priceRating: __priceRating })
        },
        {
            id: 'pricePadding',
            label: __('Price Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            show: selectionPriceRatingPadding === 'custom' && (!switcher.priceRating || switcher.priceRating === 'price'),
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
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
                    allowRender: () => selectionPriceRatingPadding === 'custom',
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'ratingPadding',
            label: __('Rating Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            show: selectionPriceRatingPadding === 'custom' && switcher.priceRating === 'rating',
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
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
                    allowRender: () => selectionPriceRatingPadding === 'custom',
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'priceMargin',
            label: __('Price Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            show: (!switcher.priceRating || switcher.priceRating === 'price'),
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
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'ratingMargin',
            label: __('Rating Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            show: switcher.priceRating === 'rating',
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
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'pricePositioningLeft',
            label: __('Price Left Orientation', '--gctd--'),
            component: SizeControl,
            allowDeviceControl: true,
            show: (!switcher.priceRating || switcher.priceRating === 'price'),
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
                    render: value => handleUnitPoint(value, 'left')
                },
            ]
        },
        {
            id: 'pricePositioningRight',
            label: __('Price Right Orientation', '--gctd--'),
            component: SizeControl,
            allowDeviceControl: true,
            show: (!switcher.priceRating || switcher.priceRating === 'price'),
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
                    render: value => handleUnitPoint(value, 'right')
                },
            ]
        },
        {
            id: 'pricePositioningTop',
            label: __('Price Top Orientation', '--gctd--'),
            component: SizeControl,
            allowDeviceControl: true,
            show: (!switcher.priceRating || switcher.priceRating === 'price'),
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
                    render: value => handleUnitPoint(value, 'top'),
                },
            ]
        },
        {
            id: 'pricePositioningBottom',
            label: __('Price Bottom Orientation', '--gctd--'),
            component: SizeControl,
            allowDeviceControl: true,
            show: (!switcher.priceRating || switcher.priceRating === 'price'),
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
                    render: value => handleUnitPoint(value, 'bottom'),
                },
            ]
        },
        {
            id: 'ratingPositioningLeft',
            label: __('Rating Left Orientation', '--gctd--'),
            component: SizeControl,
            allowDeviceControl: true,
            show: switcher.priceRating === 'rating',
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
                    render: value => handleUnitPoint(value, 'left')
                },
            ]
        },
        {
            id: 'ratingPositioningRight',
            label: __('Rating Right Orientation', '--gctd--'),
            component: SizeControl,
            allowDeviceControl: true,
            show: switcher.priceRating === 'rating',
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
                    render: value => handleUnitPoint(value, 'right')
                },
            ]
        },
        {
            id: 'ratingPositioningTop',
            label: __('Rating Top Orientation', '--gctd--'),
            component: SizeControl,
            allowDeviceControl: true,
            show: switcher.priceRating === 'rating',
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
                    render: value => handleUnitPoint(value, 'top'),
                },
            ]
        },
        {
            id: 'ratingPositioningBottom',
            label: __('Rating Bottom Orientation', '--gctd--'),
            component: SizeControl,
            allowDeviceControl: true,
            show: switcher.priceRating === 'rating',
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
                    render: value => handleUnitPoint(value, 'bottom'),
                },
            ]
        },
        {
            id: 'priceColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            show: (!switcher.priceRating || switcher.priceRating === 'price'),
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
            show: (!switcher.priceRating || switcher.priceRating === 'price'),
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'ratingColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.priceRating === 'rating',
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
            show: switcher.priceRating === 'rating',
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
            show: switcher.priceRating === 'rating',
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
    ];
};
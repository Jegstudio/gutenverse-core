import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, SelectControl, SizeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';

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
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'pricePositioningLeft',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
                    'properties': [
                        {
                            'name': 'left',
                            'valueType': 'direct'
                        }
                    ]
                }
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
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'pricePositioningRight',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
                    'properties': [
                        {
                            'name': 'right',
                            'valueType': 'direct'
                        }
                    ]
                }
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
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'pricePositioningTop',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
                    'properties': [
                        {
                            'name': 'top',
                            'valueType': 'direct'
                        }
                    ]
                }
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
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'pricePositioningBottom',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
                    'properties': [
                        {
                            'name': 'bottom',
                            'valueType': 'direct'
                        }
                    ]
                }
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
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'ratingPositioningLeft',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
                    'properties': [
                        {
                            'name': 'left',
                            'valueType': 'direct'
                        }
                    ]
                }
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
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'ratingPositioningRight',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
                    'properties': [
                        {
                            'name': 'right',
                            'valueType': 'direct'
                        }
                    ]
                }
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
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'ratingPositioningTop',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
                    'properties': [
                        {
                            'name': 'top',
                            'valueType': 'direct'
                        }
                    ]
                }
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
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'ratingPositioningBottom',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
                    'properties': [
                        {
                            'name': 'bottom',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'priceColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            show: (!switcher.priceRating || switcher.priceRating === 'price'),
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'priceColor',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price`,
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
            id: 'priceTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            show: (!switcher.priceRating || switcher.priceRating === 'price'),
        },
        {
            id: 'ratingColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.priceRating === 'rating',
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'ratingColor',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating`,
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
            id: 'ratingStarColor',
            label: __('Star Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.priceRating === 'rating',
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'ratingStarColor',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating li`,
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
            id: 'ratingTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            show: switcher.priceRating === 'rating',
        },
    ];
};
import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, DimensionControl, HeadingControl, TypographyControl } from 'gutenverse-core/controls';
import { handleBackground, handleColor, handleDimension, handleTypography } from 'gutenverse-core/controls';

export const categoryPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'categoryColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'categoryTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'submenuSplitter',
            component: HeadingControl,
        },
        {
            id: 'categoryBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
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
            id: 'categoryPadding',
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
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'categoryMargin',
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
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'categoryBorderRadius',
            label: __('Border Radius', 'gutenverse'),
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
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
                    render: value => handleDimension(value, 'border-radius', false)
                }
            ]
        },
    ];
};
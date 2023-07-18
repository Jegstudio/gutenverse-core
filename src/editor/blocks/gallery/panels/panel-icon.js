import { __ } from '@wordpress/i18n';
import { BorderControl, ColorControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';
import { handleBorder, handleColor, handleDimension } from 'gutenverse-core/styling';

export const iconPanel = ({elementId}) => {
    return [
        {
            id: 'iconBg',
            label: __('Icon Background', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
                    render: value => handleColor(value, 'background')
                }
            ]
        },
        {
            id: 'iconColor',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 300,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
                    render: value => `font-size: ${value}px`
                }
            ]
        },
        {
            id: 'iconPadding',
            label: __('Icon Padding', 'gutenverse'),
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'iconBorder',
            label: __('Icon Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
    ];
};
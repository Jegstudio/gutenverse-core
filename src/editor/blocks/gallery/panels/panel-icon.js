import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, ColorControl, DimensionControl, RangeControl, SelectControl } from 'gutenverse-core/controls';
import { getDeviceType, isEmptyValue } from 'gutenverse-core/editor-helper';
import { handleBorder, handleBorderResponsive, handleColor, handleDimension } from 'gutenverse-core/styling';

export const iconPanel = (props) => {
    const device = getDeviceType();
    const { elementId, selectionIconPadding } = props;
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
            id: 'selectionIconPadding',
            label: __('Select Setting Icon Padding', 'gutenverse'),
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
            id: 'zoomIconPadding',
            label: __('Zoom Icon Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            show: selectionIconPadding === 'custom',
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
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link.zoom span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link.zoom span`,
                    allowRender: () => selectionIconPadding === 'custom',
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'linkIconPadding',
            label: __('Link Icon Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            show: selectionIconPadding === 'custom',
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
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link.link span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link.link span`,
                    allowRender: () => selectionIconPadding === 'custom',
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'iconPadding',
            label: __('Icon Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            show: selectionIconPadding === 'all',
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
                    allowRender: () => selectionIconPadding === 'all',
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'iconBorder',
            show: device === 'Desktop',
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
        {
            id: 'iconBorderResponsive',
            show: device !== 'Desktop',
            label: __('Icon Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
    ];
};
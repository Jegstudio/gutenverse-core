import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, DimensionControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { allowRenderBoxShadow, handleBackground, handleBorder, handleBorderResponsive, handleDimension } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const itemStylePanel = ({ elementId }) => {
    const device = getDeviceType();

    return [
        {
            id: 'itemPadding',
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
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'itemMargin',
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
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'itemBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'itemBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'itemBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'itemBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        }
    ];
};
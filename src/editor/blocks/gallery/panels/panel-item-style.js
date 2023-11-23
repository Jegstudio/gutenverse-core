import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BoxShadowControl, DimensionControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderV2, handleDimension } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const itemStylePanel = ({ elementId }) => {
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
            id: 'itemBorderResponsive',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item`,
                    render: value => handleBorderV2(value)
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
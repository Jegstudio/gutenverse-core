import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BoxShadowControl, DimensionControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorder, handleBoxShadow, handleDimension } from 'gutenverse-core/controls';

export const containerPanel = (props) => {
    const { elementId } = props;

    return [
        {
            id: 'containerPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px',
                },
                em: {
                    text: 'em',
                    unit: 'em',
                },
                ['%']: {
                    text: '%',
                    unit: '%',
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-popup .guten-popup-content`,
                    render: (value) =>  handleDimension(value, 'padding')
                },
                {
                    selector: `.${elementId} .guten-popup-left .guten-popup-container, .${elementId} .guten-popup-right .guten-popup-container`,
                    render: (value) => {
                        const { dimension, unit = 'px' } = value || {};
                        const { top = 10, bottom = 10 } = dimension || {};

                        return `min-height: calc(100vh - ${parseFloat(top) + parseFloat(bottom)}${unit})`;
                    },
                },
            ],
        },
        {
            id: 'backgroundColor',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-popup .guten-popup-content`,
                    hasChild: true,
                    render: (value) => handleBackground(value),
                },
            ],
        },
        {
            id: 'containerBorder',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .guten-popup .guten-popup-content`,
                    hasChild: true,
                    render: (value) => handleBorder(value),
                },
            ],
        },
        {
            id: 'containerBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .guten-popup .guten-popup-content`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: (value) => handleBoxShadow(value),
                },
            ],
        },
    ];
};

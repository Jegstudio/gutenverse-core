import { __ } from '@wordpress/i18n';
import { DimensionControl } from 'gutenverse-core/controls';
import { handleDimension } from 'gutenverse-core/styling';

export const logosWrapperPanel = (props) => {
    const {
        elementId,
    } = props;


    return [
        {
            id: 'logoWrapperPadding',
            label: __('Logo Wrapper Padding', 'gutenverse'),
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
            },
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'logoWrapperMargin',
            label: __('Logo Wrapper Margin', 'gutenverse'),
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
            },
            style: [
                {
                    selector: `.${elementId}.guten-client-logo .swiper-container .content-image`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        }
    ];
};
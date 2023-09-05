import { __ } from '@wordpress/i18n';
import { handleDimension } from 'gutenverse-core/styling';
import { DimensionControl, NumberControl } from 'gutenverse-core/controls';

export const advancePanel = (props) => {
    const {elementId, selector, frontendSelector} = props;

    return [
        {
            id: 'margin',
            label: __('Margin', '--gctd--'),
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
                    selector: selector ? selector : `.editor-styles-wrapper .is-root-container .${elementId}`,
                    frontendSelector: frontendSelector ? frontendSelector : `.${elementId}`,
                    render: value => {
                        return handleDimension(value, 'margin');
                    }
                }
            ]
        },
        {
            id: 'padding',
            label: __('Padding', '--gctd--'),
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
                    selector: selector ? selector : `.editor-styles-wrapper .is-root-container .${elementId}`,
                    frontendSelector: frontendSelector ? frontendSelector : `.${elementId}`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'zIndex',
            label: __('Z Index', '--gctd--'),
            component: NumberControl,
            allowDeviceControl: true,
            min: 1,
            max: 9999,
            step: 1,
            style: [
                {
                    selector: selector ? selector : `.editor-styles-wrapper .is-root-container .${elementId}`,
                    frontendSelector: frontendSelector ? frontendSelector : `.${elementId}`,
                    render: value => `z-index: ${value};`
                }
            ]
        }
    ];
};
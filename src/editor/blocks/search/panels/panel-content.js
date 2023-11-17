import { __ } from '@wordpress/i18n';
import { CheckboxControl, RangeControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const contentPanel = props => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'inputPlaceholder',
            label: __('Input Placeholder', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'showButton',
            label: __('Show Button', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'inputHeight',
            label: __('Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 1000,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input,.guten-button-wrapper .guten-button `,
                    render: value => `height: ${value}px!important;`
                }
            ]
        },
        {
            id: 'inputWidth',
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 1000,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input`,
                    render: value => `width: ${value}px!important;`
                }
            ]
        },
    ];
};
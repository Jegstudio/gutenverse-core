import { __ } from '@wordpress/i18n';
import { RangeControl, TextControl } from 'gutenverse-core/controls';

export const panelContent = (props) => {
    const {elementId} = props;

    return [
        {
            id: 'location',
            label: __('Location', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'zoom',
            label: __('Map Zoom', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 22,
            allowDeviceControl: false
        },
        {
            id: 'height',
            label: __('Map Height', 'gutenverse'),
            component: RangeControl,
            min: 40,
            max: 1440,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
        },
    ];
};
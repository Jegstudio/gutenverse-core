import { __ } from '@wordpress/i18n';
import { CheckboxControl, NumberControl, RangeControl } from 'gutenverse-core-editor/controls';

export const sliderPanel = (props) => {
    const {
        autoplay
    } = props;

    return [
        {
            id: 'spacing',
            label: __('Spacing Horizontal', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 50,
            step: 1,
            allowDeviceControl: true,
        },
        {
            id: 'itemShowed',
            label: __('Number Showed', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 5,
            step: 1,
            allowDeviceControl: true,
        },
        {
            id: 'loop',
            label: __('Loop', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'showNav',
            label: __('Show Dots', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'showArrow',
            label: __('Show Arrow', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'autoplay',
            label: __('Autoplay', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'autoplayTimeout',
            show: autoplay,
            label: __('Autoplay Speed (ms)', 'gutenverse'),
            component: NumberControl,
        },
    ];
};
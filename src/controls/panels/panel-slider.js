import { __ } from '@wordpress/i18n';
import { CheckboxControl, NumberControl, RangeControl } from 'gutenverse-core/controls';

export const sliderPanel = (props) => {
    const {
        autoplay
    } = props;

    return [
        {
            id: 'spacing',
            label: __('Spacing Horizontal', '--gctd--'),
            component: RangeControl,
            min: 1,
            max: 50,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
        },
        {
            id: 'itemShowed',
            label: __('Number Showed', '--gctd--'),
            component: RangeControl,
            min: 1,
            max: 5,
            step: 1,
            allowDeviceControl: true,
        },
        {
            id: 'loop',
            label: __('Loop', '--gctd--'),
            component: CheckboxControl,
        },
        {
            id: 'showNav',
            label: __('Show Dots', '--gctd--'),
            component: CheckboxControl,
        },
        {
            id: 'showArrow',
            label: __('Show Arrow', '--gctd--'),
            component: CheckboxControl,
        },
        {
            id: 'autoplay',
            label: __('Autoplay', '--gctd--'),
            component: CheckboxControl,
        },
        {
            id: 'autoplayTimeout',
            show: autoplay,
            label: __('Autoplay Speed (ms)', '--gctd--'),
            component: NumberControl,
        },
    ];
};

import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { NumberControl, SelectControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

const animationOption = ({ id, value, onValueChange, onStyleChange }) => {
    return <div id={id}>
        <SelectControl
            label={__('Animation Entrance', '--gctd--')}
            value={value.type}
            allowDeviceControl={true}
            onValueChange={type => onValueChange({ ...value, type })}
            onStyleChange={type => onStyleChange({ ...value, type })}
            options={[
                {
                    label: 'None',
                    value: 'none'
                },
                {
                    label: 'Fade In',
                    value: 'fadeIn'
                },
                {
                    label: 'Fade In Left',
                    value: 'fadeInLeft'
                },
                {
                    label: 'Fade In Down',
                    value: 'fadeInDown'
                },
                {
                    label: 'Fade In Right',
                    value: 'fadeInRight'
                },
                {
                    label: 'Fade In Up',
                    value: 'fadeInUp'
                },
                {
                    label: 'Slide in Left',
                    value: 'slideInLeft'
                },
                {
                    label: 'Slide in Down',
                    value: 'slideInDown'
                },
                {
                    label: 'Slide in Right',
                    value: 'slideInRight'
                },
                {
                    label: 'Slide in Up',
                    value: 'slideInUp'
                },
                // {
                //     label: __('More Options', '--gctd--'),
                //     value: 'more',
                //     pro: true
                // },
            ]}
        />
        <SelectControl
            label={__('Duration', '--gctd--')}
            value={value.duration}
            onValueChange={duration => onValueChange({ ...value, duration })}
            onStyleChange={duration => onStyleChange({ ...value, duration })}
            options={[
                {
                    label: __('Normal', '--gctd--'),
                    value: 'normal'
                },
                {
                    label: __('Slow', '--gctd--'),
                    value: 'slow'
                },
                {
                    label: __('Fast', '--gctd--'),
                    value: 'fast'
                },
            ]}
        />
        <NumberControl
            label={__('Delay (ms)', '--gctd--')}
            description={__('Input in miliseconds (ms). Later will be converted into second (s)', '--gctd--')}
            value={value.delay}
            min={100}
            max={5000}
            step={1}
            onValueChange={delay => onValueChange({ ...value, delay })}
            onStyleChange={delay => onStyleChange({ ...value, delay })}
        />
    </div>;
};

const AnimationControl = (props) => {
    const {
        value = {},
        onValueChange,
        onStyleChange,
    } = props;

    const id = useInstanceId(AnimationControl, 'inspector-animation-control');
    const parameter = {
        id,
        value,
        onValueChange,
        onStyleChange
    };

    return applyFilters(
        'gutenverse.animation.options',
        animationOption(parameter),
        parameter
    );
};

export default AnimationControl;
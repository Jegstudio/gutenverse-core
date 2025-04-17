
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { NumberControl, SelectControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

const animationOption = ({ id, value, onValueChange }) => {
    return <div id={id}>
        <SelectControl
            label={__('Animation Entrance', '--gctd--')}
            value={value.type}
            allowDeviceControl={true}
            onValueChange={type => onValueChange({ ...value, type })}
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
                {
                    label: 'Zoom In',
                    value: '-',
                    pro: true
                },
                {
                    label: 'zoomInLeft',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Zoom In Down',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Zoom In Right',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Zoom In Up',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Bounce In ',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Bounce In Left',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Bounce In Down',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Bounce In Right',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Bounce In Up',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Rotate In ',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Rotate In Down Left',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Rotate In Down Right',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Rotate In Up Left',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Rotate In Up Right',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Bounce',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Flash',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Pulse',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Rubber Band',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Shake',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Head Shake',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Swing',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Tada',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Wobble',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Jello',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Light Speed In',
                    value: '-',
                    pro: true
                },
                {
                    label: 'Roll In',
                    value: '-',
                    pro: true
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
        />
    </div>;
};

const AnimationControl = (props) => {
    const {
        value = {},
        onValueChange,
    } = props;

    const id = useInstanceId(AnimationControl, 'inspector-animation-control');
    const parameter = {
        id,
        value,
        onValueChange,
    };

    return applyFilters(
        'gutenverse.animation.options',
        animationOption(parameter),
        parameter
    );
};

export default AnimationControl;
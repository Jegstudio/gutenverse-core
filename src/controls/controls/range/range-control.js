import { useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';

const RangeControl = ({
    label,
    min,
    max,
    step,
    value = '',
    liveUpdate,
    disabled = false,
    allowDeviceControl,
    onStart = () => {},
    onEnd = () => {},
    onValueChange,
    onStyleChange,
    description = '',
}) => {
    const id = useInstanceId(RangeControl, 'inspector-range-control');

    const [localValue, setLocalValue] = useState(value);
    const [updating, setUpdating] = useState(false);

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-range'}>
        <ControlHeadingSimple
            id={`${id}-range`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'control-slider-range'}>
                <input
                    id={`${id}-range`}
                    type="range"
                    className="control-input-range"
                    min={min}
                    max={max}
                    step={step}
                    value={updating ? localValue : value}
                    disabled={disabled}
                    onMouseDown={onStart}
                    onChange={(e) => {
                        onStyleChange(parseFloat(e.target.value));
                        setLocalValue(parseFloat(e.target.value));
                        setUpdating(true);
                        liveUpdate ? onValueChange(parseFloat(e.target.value)) : null;
                    }}
                    onMouseUp={(e) => {
                        onValueChange(parseFloat(e.target.value));
                        setUpdating(false);
                        onEnd();
                    }}
                />
            </div>
            <div className={'control-slider-input'}>
                <input
                    type="number"
                    className="control-input-number"
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    value={updating ? localValue : value}
                    onFocus={onStart}
                    onBlur={onEnd}
                    onChange={(e) => {
                        onStyleChange(parseFloat(e.target.value));
                        onValueChange(parseFloat(e.target.value));
                    }}
                />
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(RangeControl);
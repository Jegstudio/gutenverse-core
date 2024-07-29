import { useState, useRef } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import isEmpty from 'lodash/isEmpty';

const RangeControl = ({
    label,
    min,
    max,
    step,
    value = '',
    liveUpdate,
    disabled = false,
    allowDeviceControl,
    showDeviceControl = false,
    onStart = () => {},
    onEnd = () => {},
    onValueChange,
    onStyleChange,
    description = '',
    isParseFloat = false,
    unit,
}) => {
    const id = useInstanceId(RangeControl, 'inspector-range-control');
    const [localValue, setLocalValue] = useState(value);
    const [updating, setUpdating] = useState(false);
    const inputRef = useRef(null);
    const theUnit = unit? unit : '';

    const addUnit = () => {
        const input = inputRef.current;
        if (!input.value.endsWith(theUnit)) {
        input.value = input.value.replace(theUnit, '') + theUnit;
        }
    };
    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-range'}>
        <ControlHeadingSimple
            id={`${id}-range`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl ? allowDeviceControl : showDeviceControl}
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
                        if(isParseFloat){
                            onStyleChange(parseFloat(e.target.value));
                            setLocalValue(parseFloat(e.target.value));
                            liveUpdate ? onValueChange(parseFloat(e.target.value)) : null;
                        }else{
                            onStyleChange(e.target.value);
                            setLocalValue(e.target.value);
                            liveUpdate ? onValueChange(e.target.value) : null;
                        }
                        setUpdating(true);
                    }}
                    onMouseUp={(e) => {
                        if(isParseFloat){
                            onValueChange(parseFloat(e.target.value));
                        }else{
                            onValueChange(e.target.value);

                        }
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
                        if(isParseFloat){
                            onStyleChange(parseFloat(e.target.value));
                            onValueChange(parseFloat(e.target.value));
                        }else{
                            onStyleChange(e.target.value);
                            onValueChange(e.target.value);
                        }
                    }}
                    ref={inputRef}
                    onInput={addUnit}
                />
                {!isEmpty(unit) && <span
                    style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    }}
                >
                    {unit}
                </span>}
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(RangeControl);
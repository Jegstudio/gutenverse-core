import { useState, useRef, useDeferredValue, useEffect } from '@wordpress/element';
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
    disabled = false,
    allowDeviceControl,
    showDeviceControl = false,
    onStart = () => { },
    onEnd = () => { },
    onValueChange,
    description = '',
    isParseFloat = false,
    unit,
}) => {
    const id = useInstanceId(RangeControl, 'inspector-range-control');
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef(null);
    const unitRef = useRef(null);
    const deferredValue = useDeferredValue(localValue);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        onValueChange(deferredValue);
    }, [deferredValue]);

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
                    value={value}
                    disabled={disabled}
                    onMouseDown={onStart}
                    onChange={(e) => {
                        if (isParseFloat) {
                            setLocalValue(parseFloat(e.target.value));
                        } else {
                            setLocalValue(e.target.value);
                        }
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
                    value={value}
                    onFocus={onStart}
                    onBlur={onEnd}
                    onChange={(e) => {
                        if (isParseFloat) {
                            onValueChange(parseFloat(e.target.value));
                        } else {
                            onValueChange(e.target.value);
                        }
                    }}
                    ref={inputRef}
                />
                {!isEmpty(unit) && <span
                    className="range-control-unit"
                    ref={unitRef}>
                    {unit}
                </span>}
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(RangeControl);
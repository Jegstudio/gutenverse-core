import { useState, useRef, useEffect } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import isEmpty from 'lodash/isEmpty';

// Note:
// To add multi unit in range control:
// 1. unit prop need to be an array
// 2. create unitAttribute in block.json to save the unit option
// 3. pass the setAttributes function
// 4. see post block (pagination & readmore) for reference

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
    setAttributes = () => {},
    unitAttribute,
    unit,
}) => {
    const id = useInstanceId(RangeControl, 'inspector-range-control');
    const [localValue, setLocalValue] = useState(value);
    const [updating, setUpdating] = useState(false);
    const inputRef = useRef(null);
    const unitArray = Array.isArray(unit)? unit : [];
    const [selectedUnit, setSelectedUnit] = useState(unitArray[0]);
    const [openUnitSelect, setOpenUnitSelect] = useState(false);
    const containerRef = useRef(null);
    const unitRef = useRef(null);

    useEffect(() => {
        if(isParseFloat){
            onStyleChange(parseFloat(value));
            onValueChange(parseFloat(value));
        }else{
            onStyleChange(value);
            onValueChange(value);
        }

        if (unitArray.length > 0){
            const handleClickOutside = (event) => {
                if ((containerRef.current && !containerRef.current.contains(event.target))
                    && (unitRef.current && !unitRef.current.contains(event.target))) {
                    setOpenUnitSelect(false);
                }
            };

            if (openUnitSelect) {
                document.addEventListener('click', handleClickOutside);
            }

            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [openUnitSelect, selectedUnit]);

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
                />
                {!isEmpty(unit) && <span
                    className="range-control-unit"
                    onClick={() => setOpenUnitSelect(!openUnitSelect)}
                    style={{
                        pointerEvents: `${unitArray.length > 0 ? '' : 'none'}`,
                        cursor: `${unitArray.length > 0 ? 'pointer' : ''}`,
                    }}
                    ref={unitRef}>
                    {unitArray.length > 0 ?
                        selectedUnit
                        : unit}
                </span>}
                {openUnitSelect && unitArray.length > 0 && (
                    <div className="range-control unit-select-container" ref={containerRef}>
                        {unitArray.map((unit, index) => (
                            <div
                                className={`range-control unit-${unit} ${
                                    selectedUnit === unit ? 'active' : ''
                                }`}
                                key={index}
                                onClick={() => {
                                    setSelectedUnit(unit);
                                    setAttributes({[unitAttribute]: unit});
                                }}
                                onMouseDown={onStart}
                                onMouseUp={onEnd}>
                                {unit}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(RangeControl);
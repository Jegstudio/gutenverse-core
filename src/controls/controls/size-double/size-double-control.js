import { useEffect, useState, useRef } from '@wordpress/element';
import {useInstanceId} from '@wordpress/compose';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import ControlHeadingSimple from '../part/control-heading-simple';

const UnitControl = ({units, activeUnit, changeUnit}) => {
    const wrapperRef = useRef(null);

    const toggleOpen = () => {
        setOpen(open => !open);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const [open, setOpen] = useState(false);

    return <div className={'control-unit'} ref={wrapperRef}>
        <div className={'active-unit'} onClick={() => toggleOpen()}>
            {Object.keys(units).map(unit => units[unit].text === activeUnit && <span key={unit}>{units[unit].text}</span>)}
        </div>
        {open && <ul>
            {Object.keys(units).map((unit) => <li key={unit} className={units[unit].text === activeUnit ? 'active' : ''} onClick={() => changeUnit(units[unit].text)}>
                <span>{units[unit].text}</span>
            </li>)}
        </ul>}
    </div>;
};

const SizeDoubleControl = (props) => {
    const {
        label,
        labelStart,
        labelEnd,
        units = {
            px: {
                text: 'px',
                min: 1,
                max: 200,
                step: 1,
                unit: 'px',
            },
            em: {
                text: 'em',
                min: 0.1,
                max: 10,
                step: 0.1,
                unit: 'em',
            },
            rem: {
                text: 'rem',
                min: 0.1,
                max: 10,
                step: 0.1,
                unit: 'rem',
            },
            vh: {
                text: 'vh',
                min: 0.1,
                max: 10,
                step: 0.1,
                unit: 'vh',
            },
        },
        value = {
            start: 1,
            end: 100,
            unit: 'px'
        },
        liveUpdate,
        allowDeviceControl,
        onValueChange,
        onStyleChange,
        description = '',
        hideRange = false,
        overlap = false
    } = props;

    const id = useInstanceId(SizeDoubleControl, 'inspector-size-double-control');

    const { start, end, unit } = value;
    const [activeUnit, setActiveUnit] = useState(null);

    const [localValueStart, setLocalValueStart] = useState(start);
    const [localValueEnd, setLocalValueEnd] = useState(end);
    const [updating, setUpdating] = useState(false);

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    useEffect(() => {
        if (unit === '') {
            const firstUnit = Object.keys(units)[0];
            setActiveUnit(firstUnit);
        } else {
            setActiveUnit(unit);
        }
    }, [unit]);

    const changeUnit = (unit) => {
        setActiveUnit(unit);
        onChange({
            ...value,
            unit
        });
    };

    const changePoint = (key, point) => {
        onChange({
            ...value,
            [key]: point
        });
    };

    const exactPoint  = (key, point) => {
        if (!overlap) {
            if (key === 'start') {
                if (Number(point) > Number(end)) {
                    point = end;
                }
            } else if (key === 'end') {
                if (Number(point) < Number(start)) {
                    point = start;
                }
            }
        }

        return point;
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-size-double'}>
        {label && <ControlHeadingSimple
            id={`${id}-range`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />}
        <div className={'control-body'}>
            <div className={'control-slider-label'}>
                <label>{labelStart}</label>
                <label>{labelEnd}</label>
            </div>
            {!hideRange && <div className={'control-slider-range'}>
                <>
                    <input
                        id={`${id}-range-start`}
                        type="range"
                        className="control-input-range"
                        min={activeUnit ? units[activeUnit].min : null}
                        max={activeUnit ? units[activeUnit].max : null}
                        step={activeUnit ? units[activeUnit].step : null}
                        value={updating ? localValueStart : start}
                        onChange={(e) => {
                            const point = exactPoint('start', e.target.value);

                            onStyleChange({
                                ...value,
                                start: point,
                            });
                            setLocalValueStart(point);
                            setUpdating(true);

                            liveUpdate && changePoint('start', point);
                        }}
                        onMouseUp={(e) => {
                            setUpdating(false);
                            changePoint('start', exactPoint('start', e.target.value));
                        }}
                    />
                    <input
                        id={`${id}-range-end`}
                        type="range"
                        className="control-input-range"
                        min={activeUnit ? units[activeUnit].min : null}
                        max={activeUnit ? units[activeUnit].max : null}
                        step={activeUnit ? units[activeUnit].step : null}
                        value={updating ? localValueEnd : end}
                        onChange={(e) => {
                            const point = exactPoint('end', e.target.value);

                            onStyleChange({
                                ...value,
                                end: point,
                            });
                            setLocalValueEnd(point);
                            setUpdating(true);

                            liveUpdate && changePoint('end', point);
                        }}
                        onMouseUp={(e) => {
                            setUpdating(false);
                            changePoint('end', exactPoint('end', e.target.value));
                        }}
                    />
                </>
            </div>}
            <div className={`control-slider-input gutenverse-control-unit ${hideRange ? 'full' : ''}`}>
                <div className="control-unit-start">
                    <input
                        type="number"
                        className="control-input-number"
                        min={activeUnit ? units[activeUnit].min : null}
                        max={activeUnit ? units[activeUnit].max : null}
                        step={activeUnit ? units[activeUnit].step : null}
                        value={updating ? localValueStart : start}
                        onChange={(e) => {
                            const point = exactPoint('start', e.target.value);
                            setLocalValueStart(point);
                            changePoint('start', exactPoint('start', e.target.value));
                        }}
                    />
                    <UnitControl
                        activeUnit={activeUnit}
                        units={units}
                        changeUnit={changeUnit}
                    />
                </div>
                <div className="control-unit-end">
                    <input
                        type="number"
                        className="control-input-number"
                        min={activeUnit ? units[activeUnit].min : null}
                        max={activeUnit ? units[activeUnit].max : null}
                        step={activeUnit ? units[activeUnit].step : null}
                        value={updating ? localValueEnd : end}
                        onChange={(e) => {
                            const point = exactPoint('end', e.target.value);
                            setLocalValueEnd(point);
                            changePoint('end', exactPoint('end', e.target.value));
                        }}
                    />
                    <UnitControl
                        activeUnit={activeUnit}
                        units={units}
                        changeUnit={changeUnit}
                    />
                </div>
            </div>
        </div>
    </div>;
};


export default compose(withParentControl, withDeviceControl)(SizeDoubleControl);
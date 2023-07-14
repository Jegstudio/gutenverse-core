import {useEffect, useState, useRef} from '@wordpress/element';
import {useInstanceId} from '@wordpress/compose';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core-editor/hoc';
import { withDeviceControl } from 'gutenverse-core-editor/hoc';
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

const SizeControl = (props) => {
    const {
        label,
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
            ['%']: {
                text: '%',
                min: 1,
                max: 100,
                step: 1,
                unit: '%',
            },
        },
        value = {},
        liveUpdate,
        allowDeviceControl,
        onValueChange,
        onStyleChange,
        description = '',
        hideRange = false,
    } = props;
    const {unit = '', point = ''} = value;
    const [activeUnit, setActiveUnit] = useState(null);

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    useEffect(() => {
        if(unit === '') {
            const firstUnit = Object.keys(units)[0];
            setActiveUnit(firstUnit);
        } else {
            setActiveUnit(unit);
        }
    }, [unit]);

    const changeUnit = (unit) => {
        setActiveUnit(unit);
        onChange({
            unit: unit,
            point: ''
        });
    };

    const changePoint = (point) => {
        onChange({
            ...value,
            point,
            unit: activeUnit
        });
    };

    const id = useInstanceId(SizeControl, 'inspector-size-control');

    const [localValue, setLocalValue] = useState(point);
    const [updating, setUpdating] = useState(false);

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-size'}>
        <ControlHeadingSimple
            id={`${id}-range`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            {!hideRange && <div className={'control-slider-range'}>
                <input
                    id={`${id}-range`}
                    type="range"
                    className="control-input-range"
                    min={activeUnit ? units[activeUnit].min : null}
                    max={activeUnit ? units[activeUnit].max : null}
                    step={activeUnit ? units[activeUnit].step : null}
                    value={updating ? localValue : point}
                    onChange={(e) => {
                        onStyleChange({
                            ...value,
                            point: e.target.value,
                            unit: activeUnit
                        });
                        setLocalValue(e.target.value);
                        setUpdating(true);

                        liveUpdate ? onValueChange({
                            ...value,
                            point: e.target.value,
                            unit: activeUnit
                        }) : null;
                    }}
                    onMouseUp={(e) => {
                        onValueChange({
                            ...value,
                            point: e.target.value,
                            unit: activeUnit
                        });
                        setUpdating(false);
                    }}
                />
            </div>}
            <div className={`control-slider-input gutenverse-control-unit ${hideRange ? 'full' : ''}`}>
                <input
                    type="number"
                    className="control-input-number"
                    min={activeUnit ? units[activeUnit].min : null}
                    max={activeUnit ? units[activeUnit].max : null}
                    step={activeUnit ? units[activeUnit].step : null}
                    value={updating ? localValue : point}
                    onChange={(e) => changePoint(e.target.value)}
                />
                <UnitControl
                    activeUnit={activeUnit}
                    units={units}
                    changeUnit={changeUnit}
                />
            </div>
        </div>
    </div>;
};


export default compose(withParentControl, withDeviceControl)(SizeControl);
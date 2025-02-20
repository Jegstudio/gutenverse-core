import { useEffect, useState, useRef } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import ControlHeadingSimple from '../part/control-heading-simple';
import { debounce } from 'lodash';
import { getDeviceType } from 'gutenverse-core/editor-helper';

const UnitControl = ({ units, activeUnit, changeUnit }) => {
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
            ['s']: {
                text: 's',
                min: 1,
                max: 100,
                step: 1,
                unit: 's'
            }
        },
        value = {},
        allowDeviceControl,
        onValueChange,
        onLocalChange,
        description = '',
        hideRange = false,
    } = props;

    const [localValue, setLocalValue] = useState(value);
    const id = useInstanceId(SizeControl, 'inspector-size-control');
    const isFirstRender = useRef(true);

    const handleOnChange = (id, value) => {
        setLocalValue({
            ...localValue,
            [id]: value
        });
    };

    const deviceType = getDeviceType();

    useEffect(() => {
        setLocalValue(value);
    }, [deviceType]);

    useEffect(() => {
        if (!localValue.unit || localValue.unit === '') {
            const firstUnit = Object.keys(units)[0];
            setLocalValue({
                ...localValue,
                unit: firstUnit
            });
        }

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        onLocalChange(localValue);

        const debouncedHandler = debounce(() => {
            onValueChange(localValue);
        }, 150);

        debouncedHandler();

        return () => {
            debouncedHandler.cancel();
        };
    }, [localValue]);

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
                    min={localValue.unit ? units[localValue.unit]?.min : null}
                    max={localValue.unit ? units[localValue.unit]?.max : null}
                    step={localValue.unit ? units[localValue.unit]?.step : null}
                    value={localValue.point}
                    onChange={(e) => {
                        handleOnChange('point', e.target.value);
                    }}
                />
            </div>}
            <div className={`control-slider-input gutenverse-control-unit ${hideRange ? 'full' : ''}`}>
                <input
                    type="number"
                    className="control-input-number"
                    min={localValue.unit ? units[localValue.unit]?.min : null}
                    max={localValue.unit ? units[localValue.unit]?.max : null}
                    step={localValue.unit ? units[localValue.unit]?.step : null}
                    value={localValue.point}
                    onChange={(e) => handleOnChange('point', e.target.value)}
                />
                <UnitControl
                    activeUnit={localValue.unit}
                    units={units}
                    changeUnit={(value) => handleOnChange('unit', value)}
                />
            </div>
        </div>
    </div>;
};


export default compose(withParentControl, withDeviceControl)(SizeControl);
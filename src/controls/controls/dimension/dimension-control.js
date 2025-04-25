import { useEffect, useState, useRef } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { Link } from 'react-feather';
import ControlHeadingSimple from '../part/control-heading-simple';
import isEmpty from 'lodash/isEmpty';

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

const DimensionInput = (props) => {
    const { position, changeDimension, changeAllDimension, value, id, proLabel, units, activeUnit, changeUnit } = props;
    const [active, setActive] = useState(!proLabel);

    const inputs = position.map(pos => {
        const val = value[pos] ? value[pos] : '';
        return <li key={pos} className={'dimension-item'}>
            <div className={'gutenverse-control-unit'}>
                <label htmlFor={`${id}-${pos}`}>{pos}</label>
                <input
                    id={`${id}-${pos}`}
                    type={'number'}
                    onChange={e => {
                        active ? changeAllDimension(e.target.value) : changeDimension(pos, e.target.value);
                    }}
                    value={val}
                    disabled={proLabel}
                />
                <UnitControl
                    activeUnit={activeUnit}
                    units={units}
                    changeUnit={changeUnit}
                />
            </div>
        </li>;
    });

    useEffect(() => {
        const sync = position.every(pos => value[pos] === value[position[0]]);
        !proLabel && setActive(sync);
    }, []);

    return <>
        <div>
            <ul className={'dimension-list'}>
                {inputs[0]}
                {inputs[1]}
            </ul>
            <ul className={'dimension-list'}>
                {inputs[2]}
                {inputs[3]}
            </ul>
        </div>
        <div className="dimension-item sync-wrapper">
            <div onClick={() => !proLabel && setActive(!active)} className={`sync-icon ${active ? 'active' : ''}`}><Link size={16} /></div>
        </div>
    </>;
};

const DimensionControl = (props) => {
    const {
        label,
        units,
        value = {},
        allowDeviceControl,
        showDeviceControlOnly,
        onValueChange,
        position,
        description = '',
        proLabel
    } = props;

    const { unit = '', dimension = {} } = value;
    const [activeUnit, setActiveUnit] = useState(null);

    const onChange = value => {
        onValueChange(value);
    };

    const changeUnit = (unit) => {
        setActiveUnit(unit);
        onChange({
            unit: unit,
            dimension
        });
    };

    useEffect(() => {
        if (isEmpty(unit)) {
            const firstUnit = Object.keys(units)[0];
            setActiveUnit(firstUnit);

            onChange({...value, unit: firstUnit});
        } else {
            setActiveUnit(unit);
        }
    }, [unit]);

    const changeDimension = (pos, point) => {
        onChange({
            ...value,
            unit: activeUnit,
            dimension: {
                ...dimension,
                [pos]: point
            }
        });
    };

    const changeAllDimension = (point) => {
        const syncDimension = {};

        position.map(pos => {
            syncDimension[pos] = point;
        });

        onChange({
            ...value,
            unit: activeUnit,
            dimension: {
                ...dimension,
                ...syncDimension
            }
        });
    };

    const id = useInstanceId(DimensionControl, 'inspector-dimension-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-dimension'}>
        <ControlHeadingSimple
            label={label}
            description={description}
            proLabel={proLabel}
            allowDeviceControl={allowDeviceControl ? allowDeviceControl : showDeviceControlOnly}
        />
        <div className={'control-body'}>
            <DimensionInput
                value={dimension}
                position={position}
                changeDimension={changeDimension}
                changeAllDimension={changeAllDimension}
                id={id}
                proLabel={proLabel}
                units={units}
                activeUnit={activeUnit}
                changeUnit={changeUnit}
            />
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(DimensionControl);

import classnames from 'classnames';
import ControlHeadingSimple from './control-heading-simple';

const UnitControl = ({activeUnit, units, onClick}) => {
    const unitsChild = Object.keys(units).map(unit => {
        const unitClass = classnames('control-unit-item', {
            'active': activeUnit === unit
        });

        return <li className={unitClass} key={unit} onClick={() => onClick(unit)}>
            {units[unit].text}
        </li>;
    });

    return <div className={'control-heading-units'}>
        <ul>
            {unitsChild}
        </ul>
    </div>;
};

const ControlHeadingUnit = (props) => {
    const {activeUnit, changeUnit, units, label, id, allowDeviceControl, proLabel} = props;

    const unitControl = <UnitControl
        activeUnit={activeUnit}
        onClick={changeUnit}
        units={units}
    />;

    return <ControlHeadingSimple
        label={label}
        proLabel={proLabel}
        id={id}
        outLabel={unitControl}
        allowDeviceControl={allowDeviceControl}
    />;
};

export default ControlHeadingUnit;
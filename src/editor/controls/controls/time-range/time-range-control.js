import { useEffect, useState } from '@wordpress/element';
import ControlHeadingSimple from '../part/control-heading-simple';
import { useInstanceId } from '@wordpress/compose';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core-editor/hoc';
import { __ } from '@wordpress/i18n';
import { addLeadingZeros } from 'gutenverse-core/helper';

const TimeBar = ({
    onChange,
    value
}) => {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);

    useEffect(() => {
        if (value !== undefined) {
            if (undefined !== value.hour) {
                setHour(value.hour);
            }

            if (undefined !== value.minute) {
                setMinute(value.minute);
            }
        } else {
            setHour(0);
            setMinute(0);
        }
    }, []);

    useEffect(() => {
        onChange({
            hour: hour,
            minute: minute,
        });
    }, [hour, minute]);

    const processHour = theHour => {
        if (theHour >= 24) {
            setHour(0);
        } else if (theHour < 0) {
            setHour(23);
        } else {
            setHour(theHour);
        }
    };

    const changeHour = (operator) => {
        let theHour = operator === '+' ? hour + 1 : hour - 1;
        processHour(theHour);
    };

    const hourBlur = () => {
        if (hour >= 24) {
            setHour(hour % 24);
        }
    };

    const hourChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setHour(value);
        }
    };

    const processMinute = (theMinute) => {
        theMinute = parseInt(theMinute);
        if (theMinute > 59) {
            setMinute(theMinute % 60);
            changeHour('+');
        } else if (theMinute < 0) {
            setMinute(60 + theMinute);
            changeHour('-');
        } else {
            setMinute(theMinute);
        }
    };

    const changeMinute = (operator, additional = 5) => {
        let theMinute = operator === '+' ? minute + additional : minute - additional;
        processMinute(theMinute);
    };

    const minutesChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setMinute(value);
        }
    };

    const minutesBlur = () => {
        if (minute > 59) {
            setMinute(minute % 60);
        }
    };

    const hourKeyDown = (e) => {
        if (e.keyCode === 38) {
            changeHour('+');
        } else if (e.keyCode === 40) {
            changeHour('-');
        }
    };

    const minuteKeyDown = (e) => {
        if (e.keyCode === 38) {
            changeMinute('+', 1);
        } else if (e.keyCode === 40) {
            changeMinute('-', 1);
        }
    };

    return <div className="time-wrapper">
        <div className="time-hour time-content">
            <input type="text" value={addLeadingZeros(hour, 2)} onKeyDown={hourKeyDown} onChange={hourChange} onBlur={hourBlur} />
            <div className="time-control">
                <span className="up" onClick={() => changeHour('+')} />
                <span className="down" onClick={() => changeHour('-')} />
            </div>
        </div>
        <div className="time-separator">{':'}</div>
        <div className="time-minute time-content">
            <input type="text" value={addLeadingZeros(minute, 2)} onKeyDown={minuteKeyDown} onChange={minutesChange} onBlur={minutesBlur} />
            <div className="time-control">
                <span className="up" onClick={() => changeMinute('+')} />
                <span className="down" onClick={() => changeMinute('-')} />
            </div>
        </div>
    </div>;
};

const timeToInt = (value) => {
    if (undefined !== value) {
        let { hour, minute } = value;

        return (hour * 60) + minute;
    }
};

const TimeRangeControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = allowDeviceControl ? {} : '',
        onValueChange,
        onStyleChange,
        description = '',
    } = props;

    const id = useInstanceId(TimeRangeControl, 'inspector-time-range-control');
    const [validTime, setValidTime] = useState(true);

    useEffect(() => {
        const { begin, end } = value;
        const endTime = timeToInt(end);
        const beginTime = timeToInt(begin);
        const validTime = endTime - beginTime;

        setValidTime(validTime >= 0 || isNaN(validTime));
    }, [value]);

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    const setChangeBegin = (data) => {
        onChange({
            ...value,
            begin: data
        });
    };

    const setChangeEnd = (data) => {
        onChange({
            ...value,
            end: data
        });
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-time-range'}>
        <ControlHeadingSimple
            id={`${id}-text`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className="time-container">
                <TimeBar onChange={setChangeBegin} value={value.begin} />
                <TimeBar onChange={setChangeEnd} value={value.end} />
            </div>
            {validTime ? '' : <span className="time-range-invalid">{__('Begin time more than end time, time range is not valid.', 'gutenverse')}</span>}
        </div>
    </div>;
};

export default compose(withParentControl)(TimeRangeControl);
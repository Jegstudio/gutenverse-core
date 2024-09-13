import { useEffect, useState } from '@wordpress/element';
import Flatpickr from 'react-flatpickr';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { __ } from '@wordpress/i18n';

const DatePickerComponent = props => {
    const {
        disabled,
        options,
        value,
        placeholder,
        onChange
    } = props;

    const [beginValue, setBeginValue] = useState(value);

    useEffect(() => {
        setBeginValue(value);
    }, []);

    return <>
        <Flatpickr
            className="form-control clickable"
            disabled={disabled}
            allowInput={true}
            placeholder={placeholder}
            options={{
                ...options,
                time_24hr: true,
                defaultDate: beginValue,
            }}
            onChange={onChange}
        />
    </>;
};

const DateTimeControl = (props) => {
    const {
        label,
        value = '',
        onValueChange,
        onStyleChange,
        enableTime = true,
        minDate,
        description = '',
        dateFormat
    } = props;

    const id = useInstanceId(DateTimeControl, 'inspector-date-time-control');

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-date-time'}>
        <ControlHeadingSimple
            id={`${id}-text`}
            label={label}
            description={description}
        />
        <div className={'control-body'}>
            <div className={'control-date-time-wrapper'}>
                <DatePickerComponent
                    options={{
                        dateFormat: dateFormat,
                        disableMobile: 'true',
                        minDate: minDate,
                        enableTime: enableTime,
                    }}
                    placeholder={__('Pick Date', '--gctd--')}
                    id={id}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    </div>;

};

export default compose(withParentControl)(DateTimeControl);
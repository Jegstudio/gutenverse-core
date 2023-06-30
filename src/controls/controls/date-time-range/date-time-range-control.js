import { useEffect, useState } from '@wordpress/element';
import Flatpickr from 'react-flatpickr';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { __ } from '@wordpress/i18n';

const DatePickerComponent = props => {
    const {
        disabled,
        options,
        value,
        id,
        fromPlaceholder,
        toPlaceholder,
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
            placeholder={fromPlaceholder}
            options={{
                ...options,
                time_24hr: true,
                defaultDate: beginValue,
                plugins: [new rangePlugin({
                    input: `#${id}-range`
                })]
            }}
            onChange={onChange}
        />
        <input
            id={`${id}-range`}
            value={value.end}
            type={'text'}
            placeholder={toPlaceholder}
        />
    </>;
};

const DateTimeRangeControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = allowDeviceControl ? {} : '',
        onValueChange,
        onStyleChange,
        enableTime = true,
        minDate,
        description = '',
        dateFormat
    } = props;

    const id = useInstanceId(DateTimeRangeControl, 'inspector-date-range-control');

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-date-range'}>
        <ControlHeadingSimple
            id={`${id}-text`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'control-range-wrapper'}>
                <DatePickerComponent
                    options={{
                        dateFormat: dateFormat,
                        disableMobile: 'true',
                        minDate: minDate,
                        enableTime: enableTime,
                    }}
                    fromPlaceholder={__('From Date', 'gutenverse')}
                    toPlaceholder={__('To Date', 'gutenverse')}
                    id={id}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    </div>;

};

export default compose(withParentControl)(DateTimeRangeControl);
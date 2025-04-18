import ControlHeadingSimple from '../part/control-heading-simple';
import { useInstanceId } from '@wordpress/compose';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import Flatpickr from 'react-flatpickr';

const DateControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = allowDeviceControl ? {} : '',
        onValueChange,
        enableTime = false,
        description = '',
        dateFormat = 'F j, Y'
    } = props;

    const id = useInstanceId(DateControl, 'inspector-date-control');

    const onChange = value => {
        onValueChange(value);
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-date'}>
        <ControlHeadingSimple
            id={`${id}-date`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <Flatpickr
                value={value ? new Date(value) : ''}
                onChange={date => {
                    onChange(date[0]);
                }}
                options={{
                    enableTime: enableTime,
                    dateFormat: dateFormat,
                }}
            />
        </div>
    </div>;
};

export default compose(withParentControl)(DateControl);
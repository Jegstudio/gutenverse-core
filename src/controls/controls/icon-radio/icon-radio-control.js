
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { Tooltip } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';

const IconRadioControl = ({
    label,
    allowDeviceControl,
    value = '',
    onValueChange,
    onStyleChange,
    options,
    description = '',
}) => {
    const id = useInstanceId(IconRadioControl, 'inspector-icon-radio-control');

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    const onRadioClicked = (itemValue) => {
        if (itemValue === value) {
            onChange(null);
        } else {
            onChange(itemValue);
        }
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-icon-radio'}>
        <ControlHeadingSimple
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            {options.map(item => {
                const checked = value === item.value;
                return <Tooltip text={item.label} key={item.value}>
                    <label>
                        <input
                            onClick={() => onRadioClicked(item.value)}
                            onChange={() => {}}
                            checked={checked}
                            type={'radio'}
                            id={`${id}-${item.value}`}
                            name={`${id}`}
                            value={item.label}
                        />
                        {item.icon}
                    </label>
                </Tooltip>;
            })}
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(IconRadioControl);
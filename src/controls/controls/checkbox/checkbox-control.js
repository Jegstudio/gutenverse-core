
import {useInstanceId} from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { deviceStyleValue } from 'gutenverse-core/styling';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';

const CheckboxControl = (props) => {
    const {
        label,
        allowDeviceControl,
        onValueChange,
        proLabel,
        usePreviousDevice = false,
        usePreviousDeviceValue = false,
        value = false,
        deviceValues = allowDeviceControl ? {} : value,
        description = allowDeviceControl && (usePreviousDevice || usePreviousDeviceValue) ? __('If value has not been set, it will follow the higher resolution\'s value', '--gctd--') : '',
    } = props;

    let checked;
    const id = useInstanceId(CheckboxControl, 'inspector-checkbox-control');
    const device = getDeviceType();
    checked = usePreviousDevice ? deviceStyleValue(device, deviceValues) : value;
    const inputRef = useRef(null);

    const onChange = value => {
        onValueChange(value);
    };

    useEffect(() => {
        if (usePreviousDeviceValue && device !== 'Desktop' && (deviceValues.Desktop || deviceValues.Desktop === undefined)) {
            const shouldClickInput = () => {
                if (
                    device === 'Tablet' &&
                    !checked && deviceValues[device] === undefined &&
                    deviceValues.Desktop !== undefined
                ) {
                    return true;
                }
                if (
                    device === 'Mobile' &&
                    !checked &&
                    deviceValues[device] === undefined &&
                    (deviceValues.Tablet === undefined || deviceValues.Tablet) &&
                    !(deviceValues.Desktop === undefined && deviceValues.Tablet === undefined)
                ) {
                    return true;
                }
                return false;
            };

            if (shouldClickInput()) {
                setTimeout(() => inputRef.current?.click(), 100);
                checked = true;
            }
        }
    }, [device, deviceValues, checked]);

    const checkboxContent = <>
        <input id={`${id}-checkbox`} ref={inputRef} type="checkbox" defaultChecked={checked} onClick={e => onChange(e.target.checked)} hidden disabled={proLabel}/>
        <span className="switch"/>
    </>;

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-checkbox'}>
        <ControlHeadingSimple
            id={`${id}-checkbox`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
            inLabel={checkboxContent}
            proLabel={proLabel}
        />
    </div>;
};

export default compose(withParentControl, withDeviceControl)(CheckboxControl);
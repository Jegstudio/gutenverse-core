
import {useInstanceId} from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { deviceStyleValue } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { __ } from '@wordpress/i18n';

const CheckboxControl = (props) => {
    const {
        label,
        allowDeviceControl,
        onValueChange,
        onStyleChange,
        proLabel,
        usePreviousDevice = false,
        value = false,
        deviceValues = allowDeviceControl ? {} : value,
        description = allowDeviceControl && usePreviousDevice ? __('If value has not been set, it will follow the higher resolution\'s value', 'gutenverse') : '',
    } = props;

    const id = useInstanceId(CheckboxControl, 'inspector-checkbox-control');
    const device = getDeviceType();
    const checked = usePreviousDevice ? deviceStyleValue(device, deviceValues) : value;

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    const checkboxContent = <>
        <input id={`${id}-checkbox`} type="checkbox" checked={checked} onClick={e => onChange(e.target.checked)} hidden disabled={proLabel}/>
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

import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';

const NumberControl = (props) => {
    const {
        label,
        min,
        max,
        step,
        value,
        allowDeviceControl,
        showDeviceControl = false,
        onValueChange,
        description = '',
        proLabel,
    } = props;

    const id = useInstanceId(NumberControl, 'inspector-number-control');

    const onChange = value => {
        onValueChange(parseFloat(value));
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-number'}>
        <ControlHeadingSimple
            id={`${id}-number`}
            label={label}
            description={description}
            proLabel={proLabel}
            allowDeviceControl={allowDeviceControl ? allowDeviceControl : showDeviceControl}
        />
        <div className={'control-body'}>
            <input
                id={`${id}-number`}
                type="number"
                className="control-input-number"
                min={min}
                max={max}
                step={step}
                value={value === undefined ? '' : value}
                onChange={(e) => onChange(e.target.value)}
                disabled={proLabel}
            />
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(NumberControl);
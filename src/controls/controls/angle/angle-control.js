
import { useInstanceId} from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { AnglePicker } from 'react-linear-gradient-picker';

const AngleControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = allowDeviceControl ? {} : false,
        onValueChange,
        onStyleChange,
        description = '',
        proLabel
    } = props;

    const id = useInstanceId(AngleControl, 'inspector-angle-control');

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-angle'}>
        <ControlHeadingSimple
            id={`${id}-angle`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
            /* inLabel={angleContent} */
            proLabel={proLabel}
        />
        <div className={'control-body'}>
            <div className={'control-angle'}>
                <input
                    type="number"
                    className="control-input-number"
                    min={0}
                    max={359}
                    step={1}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
            <div className={'control-angle'}>
                <AnglePicker angle={value} size={38} setAngle={onChange}/>
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(AngleControl);
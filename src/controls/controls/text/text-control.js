
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core-editor/hoc';
import { withDeviceControl } from 'gutenverse-core-editor/hoc';

const TextControl = ({
    label,
    allowDeviceControl,
    placeholder = '',
    value = allowDeviceControl ? {} : '',
    onValueChange,
    onStyleChange,
    description = '',
}) => {
    const id = useInstanceId(TextControl, 'inspector-text-control');

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-text'}>
        <ControlHeadingSimple
            id={`${id}-text`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'control-text'}>
                <input
                    id={`${id}-text`}
                    type="text"
                    className="control-input-text"
                    placeholder={placeholder}
                    value={value === undefined ? '' : value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(TextControl);
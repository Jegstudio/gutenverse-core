
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { useRef, useDeferredValue, useEffect } from '@wordpress/element';

const TextControl = ({
    label,
    allowDeviceControl,
    placeholder = '',
    value = allowDeviceControl ? {} : '',
    onValueChange,
    description = '',
}) => {
    const id = useInstanceId(TextControl, 'inspector-text-control');

    const deferredValue = useDeferredValue(value);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        onValueChange(deferredValue);
    }, [deferredValue]);

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
                    value={value}
                    onChange={(e) => value = e.target.value}
                />
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(TextControl);
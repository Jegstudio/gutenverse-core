
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { useState, useRef, useDeferredValue, useEffect } from '@wordpress/element';

const TextareaControl = ({
    label,
    allowDeviceControl,
    placeholder = '',
    value = '',
    onValueChange,
    description = '',
}) => {
    const id = useInstanceId(TextareaControl, 'inspector-text-control');

    const [localValue, setLocalValue] = useState(value);
    const deferredValue = useDeferredValue(localValue);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        onValueChange(deferredValue);
    }, [deferredValue]);

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-textarea'}>
        <ControlHeadingSimple
            id={`${id}-textarea`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'control-text'}>
                <textarea
                    id={`${id}-textarea`}
                    className="control-input-textarea"
                    placeholder={placeholder}
                    value={value === undefined ? '' : value}
                    onChange={(e) => setLocalValue(e.target.value)}>
                </textarea>
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(TextareaControl);
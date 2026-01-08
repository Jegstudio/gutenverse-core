
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { useState, useRef, useDeferredValue, useEffect } from '@wordpress/element';

const TextControl = ({
    label,
    allowDeviceControl,
    placeholder = '',
    value = '',
    onValueChange,
    description = '',
}) => {
    const id = useInstanceId(TextControl, 'inspector-text-control');

    // Ensure value is always a string for the input
    const stringValue = (value === undefined || value === null) ? '' : String(value);

    const [localValue, setLocalValue] = useState(stringValue);
    const deferredValue = useDeferredValue(localValue);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        onValueChange(deferredValue);
    }, [deferredValue]);

    // Sync localValue when external value changes (e.g., device switch)
    // Only update if the values are actually different to prevent infinite loops
    useEffect(() => {
        if (localValue !== stringValue) {
            setLocalValue(stringValue);
        }
    }, [stringValue]);

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
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                />
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(TextControl);
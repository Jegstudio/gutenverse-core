import { useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';

const ControlSelect = ({
    id,
    title,
    description = '',
    value,
    options = [],
    customLabel,
    defaultValue = '',
    updateValue,
    isRequired = false,
    isMulti = false,
    isClearable = true,
    placeholder = 'Select...'
}) => {

    const uuidRef = useRef(uuidv4());
    const inputId = `${id}-${uuidRef.current}`;
    const normalizedValue = useMemo(() => {
        if (isMulti) {
            const raw = Array.isArray(value)
                ? value
                : Array.isArray(defaultValue)
                    ? defaultValue
                    : [];
            return options.filter(opt => raw.includes(opt.value));
        } else {
            const raw = value ?? defaultValue ?? '';
            return options.find(opt => opt.value === raw) || null;
        }
    }, [isMulti, value, defaultValue, options]);

    const handleChange = (selected) => {
        if (isMulti) {
            const vals = Array.isArray(selected) ? selected.map(o => o.value) : [];
            updateValue(id, vals);
        } else {
            updateValue(id, selected ? selected.value : '');
        }
    };

    return (
        <div className="control-wrapper control-select">
            <label className="control-title" htmlFor={inputId} style={customLabel}>
                {title}
                {isRequired && <span style={{ color: 'red' }}> *</span>}
            </label>

            <Select
                id={inputId}
                isMulti={isMulti}
                value={normalizedValue}
                options={options}
                onChange={handleChange}
                isClearable={isClearable}
                placeholder={placeholder}
                closeMenuOnSelect={!isMulti}
            />

            {description !== '' && (
                <span className="control-description">{description}</span>
            )}
        </div>
    );
};

export default ControlSelect;

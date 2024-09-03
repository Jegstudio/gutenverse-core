
import { v4 as uuidv4 } from 'uuid';
import AsyncSelect from 'react-select/async';
import { __ } from '@wordpress/i18n';
import { useState } from 'react';

const ControlSelectSearch = (props) => {
    const {
        id,
        title,
        description,
        value = {},
        values,
        customLabel,
        updateValue,
        isRequired = false,
        cacheOptions = true,
        defaultOptions = true,
        onSearch,
        components,
        noOptionsText
    } = props;

    const [label, setLabel] = useState(value);
    let uuid = uuidv4();
    const inputChange = (value) => {
        updateValue(id,value);
        setLabel(value);
    };
    const noOptionsMessage = () =>  noOptionsText ? noOptionsText : __('Type to start searching...', '--gctd--');

    return <div className="control-wrapper control-select">
        <label className="control-title" htmlFor={`${id}-${uuid}`} style={customLabel}>{title} {isRequired && <span style={{color:'red'}}> *</span>}</label>
        <AsyncSelect
            id={`${id}-${uuid}`}
            noOptionsMessage={noOptionsMessage}
            cacheOptions={cacheOptions}
            defaultOptions={defaultOptions}
            components={components}
            onChange={inputChange}
            value={label}
            loadOptions={input => onSearch(input, values)}
        />
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>;
};

export default ControlSelectSearch;

import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';

const ControlSelect = (props) => {
    const { id, title, description = '', value, options, customLabel, defaultValue = '', updateValue, isRequired = false, isMulti = false } = props;
    let uuid = uuidv4();
    const inputValue = value === undefined ? defaultValue : value;
    const objValue = isMulti ? options.filter(el => {
        if (!Array.isArray(inputValue)) {
            return false;
        }

        return inputValue.some(value => value == el.value);
    }) : options.find(el => el.value == inputValue) || null;

    const inputChange = (value) => {
        if (isMulti) {
            updateValue(id, value ? value.map(el => el.value) : []);
        } else {
            updateValue(id, value.value);
        }
    };
    if (isMulti) {
        return <div className="control-wrapper control-select multiple">
            <div className="label-wrapper">
                <label className="control-title" htmlFor={`${id}-${uuid}`} style={customLabel}>{title} {isRequired && <span style={{ color: 'red' }}> *</span>}</label>
                {description !== '' && <span className="control-description">
                    {description}
                </span>}
            </div>
            <Select
                id={`${id}-${uuid}`}
                isMulti={isMulti}
                value={objValue}
                options={options}
                onChange={inputChange}
            />
        </div>;
    } else {
        return <div className="control-wrapper control-select">
            <label className="control-title" htmlFor={`${id}-${uuid}`} style={customLabel}>{title} {isRequired && <span style={{ color: 'red' }}> *</span>}</label>
            <Select
                id={`${id}-${uuid}`}
                isMulti={isMulti}
                value={objValue}
                options={options}
                onChange={inputChange}
            />
            {description !== '' && <span className="control-description">
                {description}
            </span>}
        </div>
    }
};

export default ControlSelect;

import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';

const ControlSelect = (props) => {
    const { id, title, description, value, options, defaultValue = '', updateValue } = props;
    let uuid = uuidv4();

    const inputChange = (e) => {
        updateValue(id, e.target.value);
    };

    const inputValue = value === undefined ? defaultValue : value;

    return <div className="control-wrapper control-select">
        <label className="control-title" htmlFor={`${id}-${uuid}`}>{title}</label>
        <Select
            id={`${id}-${uuid}`}
            value={inputValue}
            options={options}
            onChange={inputChange}
        />
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>;
};

export default ControlSelect;

import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';

const ControlSelect = (props) => {
    const { id, title, description, value, options, customLabel, defaultValue = '', updateValue, isRequired = false } = props;
    let uuid = uuidv4();
    let objValue = null;
    options.map( el => {
        if(el.value == value){
            objValue = el
        }
    })
    const inputChange = (value) => {
        updateValue(id,value.value);
    };

    const inputValue = value === undefined ? defaultValue : value;

    return <div className="control-wrapper control-select">
        <label className="control-title" htmlFor={`${id}-${uuid}`} style={customLabel}>{title} {isRequired && <span style={{color:'red'}}> *</span>}</label>
        <Select
            id={`${id}-${uuid}`}
            value={objValue}
            options={options}
            onChange={inputChange}
        />
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>;
};

export default ControlSelect;

import { v4 as uuidv4 } from 'uuid';

const ControlText = (props) => {
    const { id, title, description, value, defaultValue = '', updateValue, errorMessage, customLabel, isRequired } = props;
    let uuid = uuidv4();

    const inputChange = (e) => {
        updateValue(id, e.target.value);
    };

    const inputValue = value === undefined ? defaultValue : value;

    return <div className="control-wrapper control-text">
        <label className="control-title" htmlFor={`${id}-${uuid}`} style={customLabel}>{title} {isRequired && <span style={{color:'red'}}> *</span>}</label>
        <input id={`${id}-${uuid}`} type="text" value={inputValue} onChange={inputChange} />
        {description !== '' && <span className="control-description">
            {description}
        </span>}
        {errorMessage !== null && <span className="control-error">
            {errorMessage}
        </span>}
    </div>;
};

export default ControlText;
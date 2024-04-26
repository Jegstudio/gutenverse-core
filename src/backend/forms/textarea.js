
import { v4 as uuidv4 } from 'uuid';

const ControlTextarea = (props) => {
    const { id, title, description, value, defaultValue = '', updateValue, isRequired } = props;
    let uuid = uuidv4();

    const inputChange = (e) => {
        updateValue(id, e.target.value);
    };

    const inputValue = value === undefined ? defaultValue : value;

    return <div className="control-wrapper control-textarea">
        <label className="control-title" htmlFor={`${id}-${uuid}`}>{title}{isRequired && <span style={{color:'red'}}> *</span>}</label>
        <textarea id={`${id}-${uuid}`} onChange={inputChange} value={inputValue} />
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>;
};

export default ControlTextarea;
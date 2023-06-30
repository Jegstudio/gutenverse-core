
import { v4 as uuidv4 } from 'uuid';

const ControlText = (props) => {
    const { id, title, description, value, defaultValue = '', updateValue } = props;
    let uuid = uuidv4();

    const inputChange = (e) => {
        updateValue(id, e.target.value);
    };

    const inputValue = value === undefined ? defaultValue : value;

    return <div className="control-wrapper control-text">
        <label className="control-title" htmlFor={`${id}-${uuid}`}>{title}</label>
        <input id={`${id}-${uuid}`} type="text" value={inputValue} onChange={inputChange} />
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>;
};

export default ControlText;
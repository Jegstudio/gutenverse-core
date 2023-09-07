
import { v4 as uuidv4 } from 'uuid';

const ControlFile = (props) => {
    const { id, title, description, value, defaultValue = '',customLabel, updateValue, isRequired = false } = props;
    let uuid = uuidv4();

    const inputChange = (e) => {
        updateValue(id, e.target.value);
    };

    const inputValue = value === undefined ? defaultValue : value;

    return <div className="control-wrapper control-text">
        <label className="control-title" htmlFor={`${id}-${uuid}`} style={customLabel}>{title} {isRequired && <span style={{color:'red'}}> *</span>}</label>
        <input id={`${id}-${uuid}`} type="file" value={inputValue} accept=".woff, .woff2, .ttf, .svg"  onChange={inputChange} />
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>;
};

export default ControlFile;
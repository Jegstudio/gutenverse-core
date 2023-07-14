import { v4 as uuidv4 } from 'uuid';

const ControlCheckbox = (props) => {
    const { id, title, description, value, updateValue } = props;
    let uuid = uuidv4();

    const inputChange = (val) => {
        updateValue(id, val);
    };

    return <div className="control-wrapper control-checkbox">
        <label className="control-title" htmlFor={`${id}-checkbox-${uuid}`}>
            {title}
            <input id={`${id}-checkbox-${uuid}`} type="checkbox" checked={value} onChange={e => inputChange(e.target.checked)} hidden />
            <span className="switch" />
        </label>
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>;
};

export default ControlCheckbox;
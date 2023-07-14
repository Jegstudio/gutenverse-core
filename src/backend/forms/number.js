
import { v4 as uuidv4 } from 'uuid';

const ControlNumber = (props) => {
    let uuid = uuidv4();

    const {
        id,
        title,
        description,
        min,
        max,
        step,
        value,
        updateValue
    } = props;

    const inputChange = (e) => {
        updateValue(id, e.target.value);
    };

    return <div className="control-wrapper control-number">
        <label className="control-title" htmlFor={`${id}-number-${uuid}`}>
            {title}
            <input
                id={`${id}-number`}
                type="number"
                className="control-input-number"
                min={min}
                max={max}
                step={step}
                value={value === undefined ? '' : value}
                onChange={inputChange}
            />
        </label>
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>;
};

export default ControlNumber;
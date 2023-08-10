import { v4 as uuidv4 } from 'uuid';

const ControlCheckboxPro = (props) => {
    const { id, title, description } = props;
    let uuid = uuidv4();

    // const inputChange = (val) => {
    //     updateValue(id, val);
    // };

    return <div className="control-wrapper control-checkbox pro">
        <label className="control-title" htmlFor={`${id}-checkbox-${uuid}`}>
            {title}
            <input id={`${id}-checkbox-${uuid}`} type="checkbox" checked={false} hidden />
            <span className="switch" />
        </label>
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>;
};

export default ControlCheckboxPro;
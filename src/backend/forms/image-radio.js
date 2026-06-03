
import { v4 as uuidv4 } from 'uuid';

const ControlImageRadio = (props) => {
    const {
        id,
        title,
        description,
        value,
        options,
        customLabel,
        defaultValue = '',
        updateValue,
        isRequired = false,
        perRow = false
    } = props;

    let uuid = uuidv4();
    let objValue = null;
    options.map(el => {
        if (el.value == value) {
            objValue = el;
        }
    });
    const inputChange = (value) => {
        updateValue(id, value);
    };

    const inputValue = value === undefined ? defaultValue : value;

    return <div className="control-wrapper control-image-radio" style={(perRow ? { '--gvnews-dashboard-img-radio-row': `calc(100% / ${perRow} - 10px)`, '--gvnews-dashboard-img-radio-image-width': '100%' } : {})}>
        <label className="control-title" htmlFor={`${id}-${uuid}`} style={customLabel}>{title} {isRequired && <span style={{ color: 'red' }}> *</span>}</label>
        <div className={'control-body'}>
            {options.map(item => {
                return (
                    <label key={item.value} className={`${value === item.value ? 'active' : ''}`}>
                        <input
                            id={`${id}-radio-image`}
                            onClick={() => inputChange(item.value)}
                            type={'radio'}
                            value={item.value}
                        />
                        {item.image}
                    </label>
                );
            })}
        </div>
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>;
};

export default ControlImageRadio;
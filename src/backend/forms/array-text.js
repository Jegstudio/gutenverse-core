import { v4 as uuidv4 } from 'uuid';

const ControlArrayText = (props) => {
    const { id, title, description, value, defaultValue = [], updateValue, customLabel, isRequired } = props;
    let uuid = uuidv4();
    const inputValue = value === undefined ? defaultValue : value;
    const addClicked = () => {
        inputValue.push('');
    };
    const inputChange = (e) => {
        updateValue(id, e);
    };


    return <div className="control-wrapper control-array-text">
        <label className="control-title" htmlFor={`${id}-${uuid}`} style={customLabel}>{title} {isRequired && <span style={{color:'red'}}> *</span>}</label>
        {
            value.map((el,index) => {
                index !== (value.length - 1) ? <input id={`${id}-${uuid}`} type="text" value={val}  placeholder='https://www.example.com'/> : <div className="input-array-field">
                    <input id={`${id}-${uuid}`} type="text" value={val} placeholder='https://www.example.com'/>
                    <button onClick={addClicked}>+</button>
                </div>
            })
        }
        
        
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>
};

export default ControlArrayText;
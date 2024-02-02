import { v4 as uuidv4 } from 'uuid';

const ControlArrayText = (props) => {
    const { id, title, description, value, defaultValue = [], updateValue, updateArrayValue, customLabel, isRequired } = props;
    console.log(value);
    let uuid = uuidv4();
    const inputValue = value === undefined ? defaultValue : value;
    const addClicked = () => {
        const newArr = inputValue
        newArr.push('');
        updateValue(id,newArr);
    };
    const inputChange = (e,index) => {
        const target = e.target.value;
        updateArrayValue(id, index, target);
    };


    return <div className="control-wrapper control-array-text">
        <label className="control-title" htmlFor={`${id}-${uuid}`} style={customLabel}>{title} {isRequired && <span style={{color:'red'}}> *</span>}</label>
        {
            value && value.map((el,index) => {

                return <div className="input-array-field" key={uuid}>
                    <input
                        id={`${id}-${uuid}`}
                        type="text"
                        value={el}
                        onChange={(e) => inputChange(e,index)}
                        placeholder='https://www.example.com'
                    />
                    {index === value.length - 1 && <div onClick={addClicked}>+</div>}
                </div>;
                // return index !== (value.length - 1) ? <input id={`${id}-${uuid}`} key={uuid} type="text" value={el}  placeholder='https://www.example.com' onChange={(e) => inputChange(e,index)}/> : <div className="input-array-field" key={uuid}>
                //     <input id={`${id}-${uuid}`} type="text" value={el} onChange={(e) => inputChange(e,index)}placeholder='https://www.example.com'/>
                // </div>
            })
        }
        
        
        
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>
};

export default ControlArrayText;
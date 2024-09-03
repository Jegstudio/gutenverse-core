import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { IconPlusSVG, IconMinusSVG } from 'gutenverse-core/icons';

const ControlArrayText = (props) => {
    const { id, title, description, value, defaultValue = [], updateValue,  customLabel, isRequired, isDisabled= false } = props;
    let uuid = uuidv4();
    const componentValue = value === undefined ? defaultValue : value;
    const [inputValue,setInputValue] = useState(componentValue);
    
    const addClicked = () => {
        setInputValue([...inputValue, '']);
    };

    const removeClicked = (toBeRemoved) => {
        setInputValue([...inputValue.slice(0, toBeRemoved), ...inputValue.slice(toBeRemoved + 1)])
    };

    const inputChange = (e,index) => {
        const target = e.target.value;
        let newArr = [...inputValue];
        newArr[index] = target;
        setInputValue(newArr);
    };
    useEffect(() => {
        updateValue(id,inputValue);
    }, [inputValue]);
    return <div className="control-wrapper control-array-text">
        <label className="control-title" htmlFor={`${id}-${uuid}`} style={customLabel}>{title} {isRequired && <span style={{color:'red'}}> *</span>}</label>
        {
            inputValue && inputValue.map((el, index) => {
                const lastChild = inputValue.length-1 === index ? 'last' : '';  
                return <div className={`input-array-field ${lastChild}`} >
                    <input
                        id={`${id}-${uuid}`}
                        type="text"
                        value={el}
                        onChange={(e) => inputChange(e,index)}
                        placeholder='https://www.example.com'
                        disabled = {isDisabled}
                    />
                    {!isDisabled && (
                        index === inputValue.length - 1 ? 
                        <button onClick={() => addClicked()}><IconPlusSVG/></button> : 
                        <button onClick={() => removeClicked(index)}><IconMinusSVG /></button>
                    )}
                </div>;
            })
        }
        {description !== '' && <span className="control-description">
            {description}
        </span>}
    </div>
};

export default ControlArrayText;
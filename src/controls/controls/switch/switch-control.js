
import { useInstanceId } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';

const SwitchControl = ({
    id,
    options,
    onChange,
    description = '',
    values,
}) => {
    const idElement = useInstanceId(SwitchControl, 'inspector-hover-control');
    const [active, setActive] = useState(null);

    useEffect(() => {
        onChange ? onChange({ [id]: active }) : null;
    }, []);

    const onClick = value => {
        setActive(value);

        onChange ? onChange({ [id]: value }) : null;
        values?.setSwitcher ? values.setSwitcher(prevValue => ({ ...prevValue, [id]: value })) : null;
    };

    return <div id={idElement} className={'gutenverse-control-wrapper gutenverse-control-hover'}>
        <div className={'control-body'}>
            {options.map((item, index) => {
                const checked = active ? active === item.value : (values?.switcher?.[id] ? values.switcher[id] === item.value : index === 0);

                return <label key={index} htmlFor={`${idElement}-${item.value}`}>
                    <input
                        onClick={() => onClick(options[index]['value'])}
                        onChange={() => { }}
                        checked={checked}
                        type={'radio'}
                        id={`${idElement}-${item.value}`}
                        name={`${idElement}`}
                        value={item.label}
                    />
                    <span>{item.label}</span>
                </label>;
            })}
        </div>
        {description !== '' && <div className={'control-description'}>{description}</div>}
    </div>;
};

export default SwitchControl;
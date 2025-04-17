
import { useInstanceId } from '@wordpress/compose';

const SwitchControl = ({
    value,
    options,
    onValueChange,
    description = '',
}) => {
    const id = useInstanceId(SwitchControl, 'inspector-hover-control');

    const onChange = value => {
        onValueChange(value);
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-hover'}>
        <div className={'control-body'}>
            {options.map((item, index) => {
                const checked = value ? value === item.value : index === 0;

                return <label key={index} htmlFor={`${id}-${item.value}`}>
                    <input
                        onClick={() => onChange(options[index]['value'])}
                        onChange={() => {}}
                        checked={checked}
                        type={'radio'}
                        id={`${id}-${item.value}`}
                        name={`${id}`}
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
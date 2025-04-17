
import {useInstanceId} from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';

const ImageRadioControl = props => {
    const {
        label,
        onValueChange,
        options,
        value,
        description
    } = props;

    const id = useInstanceId(ImageRadioControl, 'inspector-radio-image-control');

    const onChange = value => {
        onValueChange(value);
    };

    return (
        <div id={id} className={'gutenverse-control-wrapper gutenverse-control-image-radio'}>
            <ControlHeadingSimple
                id={`${id}-radio-image`}
                label={label}
                description={description}
            />
            <div className={'control-body'}>
                {options.map(item => {
                    return (
                        <label key={item.value} className={`${value === item.value ? 'active':''}`}>
                            <input
                                id={`${id}-radio-image`}
                                onClick={() => onChange(item.value)}
                                type={'radio'}
                                value={item.value}
                            />
                            {item.image}
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default compose(withParentControl, withDeviceControl)(ImageRadioControl);

import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { IconWarningDeprecatedSVG } from 'gutenverse-core/icons';

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

    const handleLearnMoreClick = () => {
        document.body.classList.add('gvnews-deprecated-popup', 'gvnews-deprecated-options');
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
                    if (item.deprecated) {
                        return (
                            <label key={item.value} className={`${value === item.value ? 'active deprecated' : 'deprecated'}`}>
                                <input
                                    id={`${id}-radio-image`}
                                    onClick={() => handleLearnMoreClick()}
                                    type={'radio'}
                                    value={item.value}
                                />
                                {item.image}
                                <div className="deprecated-overlay">
                                    <div className='deprecated-warning'>
                                        <IconWarningDeprecatedSVG />
                                    </div>
                                </div>
                            </label>
                        );
                    }
                    return (
                        <label key={item.value} className={`${value === item.value ? 'active' : ''}`}>
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
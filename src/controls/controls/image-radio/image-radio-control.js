
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { IconWarningDeprecatedSVG } from 'gutenverse-core/icons';
import { applyFilters } from "@wordpress/hooks";

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

    const {
        upgradeProUrl,
    } = window['GutenverseConfig'];

    const openUpgradeLink = () => {
        window.open(upgradeProUrl);
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
                            <label key={item.value} className={`${value === item.value ? 'active locked' : 'locked'}`}>
                                <input
                                    id={`${id}-radio-image`}
                                    onClick={() => handleLearnMoreClick()}
                                    type={'radio'}
                                    value={item.value}
                                />
                                {item.image}
                                <div className="locked-overlay">
                                    <div className="deprecated-warning">
                                        <IconWarningDeprecatedSVG />
                                    </div>
                                </div>
                            </label>
                        );
                    }
                    if (item.pro) {
                        return (
                            applyFilters('gutenverse.radio-control', <label key={item.value} className={`${value === item.value ? 'active locked' : 'locked'}`}>
                                <input
                                    id={`${id}-radio-image`}
                                    onClick={() => openUpgradeLink()}
                                    type={'radio'}
                                    value={item.value}
                                />
                                {item.image}
                                <div className="locked-overlay">
                                    <div className="pro-warning">
                                        PRO
                                    </div>
                                </div>
                            </label>, { id: id, item: item, onChange: onChange, value: value })
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
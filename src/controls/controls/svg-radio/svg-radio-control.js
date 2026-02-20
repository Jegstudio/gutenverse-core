
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { Tooltip } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { IconWarningDeprecatedSVG } from 'gutenverse-core/icons';
import { applyFilters } from '@wordpress/hooks';

const SVGRadioControl = props => {
    const {
        label,
        onValueChange,
        options,
        value,
        allowDeviceControl,
        showDeviceControl,
        description
    } = props;

    const id = useInstanceId(SVGRadioControl, 'inspector-svg-radio-control');

    const onChange = value => {
        onValueChange(value);
    };

    const handleLearnMoreClick = () => {
        document.body.classList.add('gvnews-deprecated-popup', 'gvnews-deprecated-options');
    };

    const {
        upgradeProUrl,
    } = window['GutenverseConfig'] || {};

    const openUpgradeLink = () => {
        if (upgradeProUrl) {
            window.open(upgradeProUrl);
        }
    };


    const activeIndex = options.findIndex(opt => opt.value === value);
    const highlightWidth = 100 / options.length;
    const highlightStyle = {
        width: `calc(${highlightWidth}% - 2px )`,
        transform: `translateX(${activeIndex * 100}%)`,
        transition: 'transform 0.3s ease',
    };

    return (
        <div id={id} className={'gutenverse-control-wrapper gutenverse-control-image-radio gutenverse-control-svg-radio'}>
            <ControlHeadingSimple
                id={`${id}-radio-svg`}
                label={label}
                description={description}
                allowDeviceControl={allowDeviceControl ? allowDeviceControl : showDeviceControl}
            />
            <div className={'control-body'}>
                {value && <div className="svg-radio-highlight" style={highlightStyle} />}
                {options.map(item => {
                    const isActive = value === item.value;

                    if (item.deprecated) {
                        return (
                            <Tooltip text={item.tooltips || item.value} key={item.value}>
                                <label className={`${isActive ? 'active locked' : 'locked'}`}>
                                    <input
                                        id={`${id}-radio-svg`}
                                        onClick={() => handleLearnMoreClick()}
                                        type={'radio'}
                                        value={item.value}
                                    />
                                    {item.svg}
                                    <div className="locked-overlay">
                                        <div className="deprecated-warning">
                                            <IconWarningDeprecatedSVG />
                                        </div>
                                    </div>
                                </label>
                            </Tooltip>
                        );
                    }

                    if (item.pro) {
                        return (
                            <Tooltip text={item.tooltips || item.value} key={item.value}>
                                {applyFilters('gutenverse.radio-control', <label className={`${isActive ? 'active locked' : 'locked'}`}>
                                    <input
                                        id={`${id}-radio-svg`}
                                        onClick={() => openUpgradeLink()}
                                        type={'radio'}
                                        value={item.value}
                                    />
                                    {item.svg}
                                    <div className="locked-overlay">
                                        <div className="pro-warning">
                                            PRO
                                        </div>
                                    </div>
                                </label>, { id: id, item: item, onChange: onChange, value: value })}
                            </Tooltip>
                        );
                    }

                    return (
                        <Tooltip text={item.tooltips || item.value} key={item.value}>
                            <label className={`${isActive ? 'active' : ''}`}>
                                <input
                                    id={`${id}-radio-svg`}
                                    onClick={() => onChange(item.value)}
                                    type={'radio'}
                                    value={item.value}
                                />
                                {item.svg}
                            </label>
                        </Tooltip>
                    );
                })}
            </div>
        </div>
    );
};
export default compose(withParentControl, withDeviceControl)(SVGRadioControl);

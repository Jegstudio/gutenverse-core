import isEmpty from 'lodash/isEmpty';
import { IconInfoSVG } from 'gutenverse-core/icons';
import ControlDevices from './control-devices';

const ControlHeadingSimple = ({ id, label, description = '', allowDeviceControl, showDeviceControlOnly, inLabel = null, outLabel = null }) => {
    return label && <div className={'control-title'}>
        {(allowDeviceControl || showDeviceControlOnly) && <ControlDevices />}
        <label htmlFor={id}>
            {label}
            {!isEmpty(description) && <div className="tooltip-description">
                <div className="tooltip-wrapper">
                    <IconInfoSVG />
                </div>
                <span className="tooltip-description-text">{description}</span>
            </div>}
            {inLabel}
        </label>
        {outLabel}
    </div>;
};

export default ControlHeadingSimple;
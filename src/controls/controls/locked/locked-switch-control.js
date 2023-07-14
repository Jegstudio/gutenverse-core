
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core-editor/hoc';
import { withDeviceControl } from 'gutenverse-core-editor/hoc';

const LockedSwitchControl = (props) => {
    const {
        label,
        allowDeviceControl,
        description = '',
        proLabel = true
    } = props;

    const id = useInstanceId(LockedSwitchControl, 'inspector-checkbox-control');

    const checkboxContent = <>
        <div className="empty-switch"></div>
        <span className="switch" />
    </>;

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-checkbox'}>
        <ControlHeadingSimple
            id={`${id}-checkbox`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
            inLabel={checkboxContent}
            proLabel={proLabel}
        />
    </div>;
};

export default compose(withParentControl, withDeviceControl)(LockedSwitchControl);
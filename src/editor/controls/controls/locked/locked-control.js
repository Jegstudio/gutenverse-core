
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core-editor/hoc';
import { withDeviceControl } from 'gutenverse-core-editor/hoc';

const LockedControl = ({
    label,
    description = '',
}) => {
    const id = useInstanceId(LockedControl, 'inspector-locked-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked'}>
        <ControlHeadingSimple
            id={`${id}-locked`}
            label={label}
            description={description}
            allowDeviceControl={false}
            proLabel={true}
        />
        <div className={'control-body'}>
            <div className={'control-locked'}>
                <input
                    id={`${id}-locked`}
                    type="text"
                    className="control-input-locked"
                    value={''}
                    disabled={true}
                    onChange={() => {}}
                />
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(LockedControl);
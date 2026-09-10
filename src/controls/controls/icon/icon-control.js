import { useState } from '@wordpress/element';
import { createPortal } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { __ } from '@wordpress/i18n';
import { Trash, } from 'react-feather';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { gutenverseRoot } from 'gutenverse-core/helper';
import IconLibrary from './icon-library';

const IconControl = ({
    label,
    allowDeviceControl,
    value = '',
    onValueChange,
    description = ''
}) => {
    const [openIconLibrary, setOpenIconLibrary] = useState(false);
    const instanceId = useInstanceId(IconControl, 'inspector-icon-control');

    const onChange = value => {
        onValueChange(value);
    };

    const removeIcon = (e) => {
        e.stopPropagation();
        onChange('');
    };

    return <div id={instanceId} className={'gutenverse-control-wrapper gutenverse-control-icon'}>
        <ControlHeadingSimple
            id={`${instanceId}-icon`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'icon-wrapper'}>
                {value !== '' && <div className={'icon-remove'} onClick={e => removeIcon(e)}>
                    <Trash />
                </div>}
                <div className={'icon-preview'} onClick={() => setOpenIconLibrary(true)}>
                    <i className={value} />
                </div>
                <div className={'icon-change'} onClick={() => setOpenIconLibrary(true)}>
                    {__('Choose Icon', '--gctd--')}
                </div>
            </div>
        </div>
        {openIconLibrary && createPortal(<IconLibrary
            closeLibrary={() => setOpenIconLibrary(false)}
            value={value}
            onChange={onChange}
        />, gutenverseRoot)}
    </div>;
};

export default compose(withParentControl, withDeviceControl)(IconControl);


import { useInstanceId } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { IconInfoSVG } from 'gutenverse-core/icons';

const PreviewControl = ({
    label,
    onValueChange,
    value = false,
    children = <p>{__('Enable preview mode to simulate this styling options', '--gctd--')}</p>
}) => {

    const id = useInstanceId(PreviewControl, 'inspector-preview-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-preview'}>
        <div className={'control-body'}>
            <div className="control-icon">
                <IconInfoSVG />
            </div>
            <div className="control-preview">
                {children}
                <button className="preview-button" onClick={() => onValueChange(!value)}> {value ? __('Exit Preview', '--gctd---') : label}</button>
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(PreviewControl);
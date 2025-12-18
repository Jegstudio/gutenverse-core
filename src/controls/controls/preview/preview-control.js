import { useInstanceId } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { IconInfoSVG } from 'gutenverse-core/icons';

/**
 * PreviewControl component for toggling a preview mode.
 *
 * @param {string} props.id - The attributes of block that will cahnged, you must add `gutenversePreviewBlock` as the id.
 * @param {object} props - The component props.
 * @param {string} props.label - The text displayed on the button when not in preview mode.
 * @param {string} props.value - The current value of the preview, used to determine if the preview is active.
 * @param {React.ReactNode} props.children - The description on this preview control.
 * @param {number} props.panelIndex - The index of the panel associated with this preview control, used for setting the active preview panel.
 * @param {string} props.previewName - The name of this specific preview, used to compare with `gutenversePreviewBlock` attribute value on your block.
 * @param {boolean} props.onlyTabOpened - A flag indicating if the preview only showing when the panel tab is open.
 * @returns {JSX.Element} The rendered PreviewControl component.
 */
const PreviewControl = (props) => {

    const {
        label,
        onValueChange,
        value = '',
        children = <p>{__('Enable preview mode to simulate this styling options', '--gctd--')}</p>,
        panelIndex,
        setPreviewOpen,
        previewName = '',
        onlyTabOpened = true,
    } = props;

    const onPreviewChange = () => {
        setPreviewOpen((value === previewName || !onlyTabOpened) ? -1 : panelIndex)
        onValueChange(value === previewName ? '' : previewName);
    }

    const id = useInstanceId(PreviewControl, 'inspector-preview-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-preview'}>
        <div className={'control-body'}>
            <div className="control-icon">
                <IconInfoSVG />
            </div>
            <div className="control-preview">
                {children}
                <button className="preview-button" onClick={() => onPreviewChange()}> {value === previewName ? __('Exit Preview', '--gctd--') : label}</button>
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(PreviewControl);
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { __ } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';
import { SelectControl } from 'gutenverse-core/controls';

const pointerEventControl = (props) =>{
    const {
        value = {},
        onValueChange,
    } = props;

    const id = useInstanceId(pointerEventControl, 'inspector-pointer-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-pointer'}>
        <SelectControl
            label={__('Pointer Type', '--gctd--')}
            value={value.pointer}
            onValueChange={pointer => onValueChange({ ...value, pointer })}
            allowDeviceControl={true}
            options={[
                {
                    label: __('Default', '--gctd--'),
                    value: 'auto'
                },
                {
                    label: __('None', '--gctd--'),
                    value: 'none'
                },
            ]}
        />
    </div>;
};

export default compose(withParentControl)(pointerEventControl);

import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedDividerControl = () => {
    const id = useInstanceId(LockedDividerControl, 'inspector-locked-divider-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-divider gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Shape Divider Animated', '--gctd--' )}
            description={__( 'Shape divider is a website design element that divides sections with a customized shape and animation for appealing layouts.', '--gctd--' )}
            img={'pro/mockup-shape-divider.png'}
        />
    </div>;
};

export default LockedDividerControl;
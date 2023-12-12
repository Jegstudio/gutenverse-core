
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedCursorEffectControl = ({isOpen}) => {
    const id = useInstanceId(LockedCursorEffectControl, 'inspector-locked-cursor-effect-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-cursor-effect gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Cursor Effects', '--gctd--' )}
            description={__( 'Add fancy cursor effect to your element', '--gctd--' )}
            img={'/advance-animation.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedCursorEffectControl;
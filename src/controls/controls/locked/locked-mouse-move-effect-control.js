
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedMouseMoveEffectControl = ({isOpen}) => {
    const id = useInstanceId(LockedMouseMoveEffectControl, 'inspector-locked-mouse-move-effect-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-mouse-move-effect gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Mouse Move Effect', '--gctd--' )}
            description={__( 'An engaging 3D movement effect to your element that dynamically responds to your mouse movements.', '--gctd--' )}
            img={'/mouse-effect.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedMouseMoveEffectControl;
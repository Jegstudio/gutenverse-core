
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedCursorEffectControl = ({isOpen}) => {
    const id = useInstanceId(LockedCursorEffectControl, 'inspector-locked-cursor-effect-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-cursor-effect gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Cursor Effect', '--gctd--' )}
            description={__( 'Transform your mouse cursor with a diverse array of stylish effects to tailor and elevate your user experience.', '--gctd--' )}
            img={'/cursor-effect.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedCursorEffectControl;
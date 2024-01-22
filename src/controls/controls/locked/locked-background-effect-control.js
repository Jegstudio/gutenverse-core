
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedBackgroundEffectControl = ({isOpen}) => {
    const id = useInstanceId(LockedBackgroundEffectControl, 'inspector-locked-background-effect-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-background-effect gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Background Effects', '--gctd--' )}
            description={__( 'Add fancy background effect to your element', '--gctd--' )}
            img={'/background-effect.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedBackgroundEffectControl;
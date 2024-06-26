
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedBackgroundEffectControl = ({isOpen}) => {
    const id = useInstanceId(LockedBackgroundEffectControl, 'inspector-locked-background-effect-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-background-effect gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Background Effects', '--gctd--' )}
            description={__( 'Enhance your element\'s background with captivating special effects like a dynamic, attention-grabbing wavy backdrop designed to captivate your users.', '--gctd--' )}
            img={'/background-effect.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedBackgroundEffectControl;
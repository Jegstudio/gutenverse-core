
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedBackgroundControl = ({isOpen}) => {
    const id = useInstanceId(LockedBackgroundControl, 'inspector-locked-background-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-background gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Background Animated', '--gctd--' )}
            description={__( 'Elevate your website design with dynamic backgrounds that bring animations and movements to life, ensuring an engaging and memorable user experience.', '--gctd--' )}
            img={'/background-animated.mp4'}
            isOpen={isOpen}
            permaLink={__('animation-effects/')}
        />
    </div>;
};

export default LockedBackgroundControl;
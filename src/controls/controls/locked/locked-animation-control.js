
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedAnimationControl = ({isOpen}) => {
    const id = useInstanceId(LockedAnimationControl, 'inspector-locked-animation-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-animation gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Advance Animation', '--gctd--' )}
            description={__( 'Discover our advanced animation framework, designed to craft visually stunning and interactive elements that captivate and engage your audience.', '--gctd--' )}
            img={'/advance-animation.mp4'}
            isOpen={isOpen}
            permaLink={__('animation-effects/')}
        />
    </div>;
};

export default LockedAnimationControl;
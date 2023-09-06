
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedBackgroundControl = ({isOpen}) => {
    const id = useInstanceId(LockedBackgroundControl, 'inspector-locked-background-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-background gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Background Animated', '--gctd--' )}
            description={__( 'Background animated is a website design feature that involves adding animations or movements to the background of a webpage.', '--gctd--' )}
            img={'pro/video/background-animated.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedBackgroundControl;

import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedBackgroundControl = () => {
    const id = useInstanceId(LockedBackgroundControl, 'inspector-locked-background-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-background gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Background Animated', 'gutenverse' )}
            description={__( 'Background animated is a website design feature that involves adding animations or movements to the background of a webpage.', 'gutenverse' )}
            img={'pro/background-animated.png'}
        />
    </div>;
};

export default LockedBackgroundControl;
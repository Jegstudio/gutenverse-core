
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedAnimationControl = () => {
    const id = useInstanceId(LockedAnimationControl, 'inspector-locked-animation-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-animation gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Advance Animation', '--gctd--' )}
            description={__( 'Advanced animation techniques (using GSAP) in website development create visually captivating and interactive elements.', '--gctd--' )}
            img={'pro/advance-animation.png'}
        />
    </div>;
};

export default LockedAnimationControl;
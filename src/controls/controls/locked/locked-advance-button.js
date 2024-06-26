
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedAdvanceButtonControl = ({isOpen}) => {
    const id = useInstanceId(LockedAdvanceButtonControl, 'inspector-locked-advance-button');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-child-style gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Advance Button Settings And Style', '--gctd--' )}
            description={__( 'You are currently using free version. Upgrade now to unlock full potential of your website design', '--gctd--' )}
            img={'/advance-animation.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedAdvanceButtonControl;
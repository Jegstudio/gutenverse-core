
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedDynamicContentControl = ({isOpen}) => {
    const id = useInstanceId(LockedDynamicContentControl, 'inspector-locked-dynamic-content-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-dynamic-content gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Dynamic Content', '--gctd--' )}
            description={__( 'Ensure key variables remain dynamic, including links to pages or posts, titles, and meta information.', '--gctd--' )}
            img={'/dynamic-content-animation.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedDynamicContentControl;
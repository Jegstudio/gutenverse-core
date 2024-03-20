
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedDynamicContentControl = ({isOpen}) => {
    const id = useInstanceId(LockedDynamicContentControl, 'inspector-locked-dynamic-content-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-dynamic-content gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Block Dynamic Content', '--gctd--' )}
            description={__( 'Some variable need to be dynamic, such as Link to page or post, Title, Meta', '--gctd--' )}
            img={'/mouse-effect.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedDynamicContentControl;
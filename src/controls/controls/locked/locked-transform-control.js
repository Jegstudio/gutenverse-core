
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedTransformControl = ({isOpen}) => {
    const id = useInstanceId(LockedTransformControl, 'inspector-locked-transform-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-transform gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Transform Element', '--gctd--' )}
            description={__( 'Transform your element with dynamic effects: rotate, move, scale, and adjust opacity seamlessly between normal and hovered states for a captivating user experience.', '--gctd--' )}
            img={'/transform.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedTransformControl;
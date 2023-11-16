
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedTransformControl = ({isOpen}) => {
    const id = useInstanceId(LockedTransformControl, 'inspector-locked-transform-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-transform gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Transform Element', '--gctd--' )}
            description={__( 'Modify your element, rotate, move, scale, change opacity on Normal and Hovered state', '--gctd--' )}
            img={'/transform.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedTransformControl;

import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedTransform = ({isOpen}) => {
    const id = useInstanceId(LockedTransform, 'inspector-locked-transform-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-transform gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Transform Element', '--gctd--' )}
            description={__( 'Lets you rotate, scale, skew, or translate an element', '--gctd--' )}
            img={'/advance-animation.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedTransform;
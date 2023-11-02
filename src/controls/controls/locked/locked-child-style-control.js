
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedChildStyleControl = ({isOpen}) => {
    const id = useInstanceId(LockedChildStyleControl, 'inspector-locked-child-style-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-child-style gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Style Your Child Element', '--gctd--' )}
            description={__( 'Modify your child element by modify their color', '--gctd--' )}
            img={'/advance-animation.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedChildStyleControl;
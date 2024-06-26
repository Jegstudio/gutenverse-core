
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedTextClip = ({isOpen}) => {
    const id = useInstanceId(LockedTextClip, 'inspector-locked-text-clip-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-text-clip gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Text Clip Overlay', '--gctd--' )}
            description={__( 'Create stuning website with text clip for both image background and CSS Gradient', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedTextClip;
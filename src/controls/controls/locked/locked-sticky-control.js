
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedStickyControl = ({isOpen}) => {
    const id = useInstanceId(LockedStickyControl, 'inspector-locked-sticky-control');
    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-sticky gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Sticky', '--gctd--' )}
            description={__( 'Keep your elements firmly in place on your webpage as users seamlessly interact with the rest of the content.', '--gctd--' )}
            img={'/scroll-sticky.mp4'}
            isOpen={isOpen}
            permaLink={__('#sticky')}
        />
    </div>;
};

export default LockedStickyControl;
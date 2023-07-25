
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedStickyControl = () => {
    const id = useInstanceId(LockedStickyControl, 'inspector-locked-sticky-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-sticky gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Sticky', '--gctd--' )}
            description={__( 'Sticky elements remain fixed in position on a webpage while users interact with the rest of the page or application.', '--gctd--' )}
            img={'pro/sticky.gif'}
        />
    </div>;
};

export default LockedStickyControl;
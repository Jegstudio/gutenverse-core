
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedAdvanceTabsPanel = ({isOpen}) => {
    const id = useInstanceId(LockedAdvanceTabsPanel, 'inspector-locked-advance-tabs');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-child-style gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Advance Tabs Settings And Style', '--gctd--' )}
            description={__( 'You are currently using free version. Upgrade now to unlock full potential of your website design', '--gctd--' )}
            img={'/advance-animation.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedAdvanceTabsPanel;

import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedConditionControl = ({isOpen}) => {
    const id = useInstanceId(LockedConditionControl, 'inspector-locked-condition-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-condition gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Block Show / Hide Condition', '--gctd--' )}
            description={__( 'Define condition if you want to set your block shown / hidden. This can be useful for example when you want to show the content only for your logged in users.', '--gctd--' )}
            img={'/condition-filter-animation.mp4'}
            isOpen={isOpen}
            permaLink={__('condition')}
        />
    </div>;
};

export default LockedConditionControl;
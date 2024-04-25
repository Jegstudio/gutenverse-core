
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedConditionControl = ({isOpen}) => {
    const id = useInstanceId(LockedConditionControl, 'inspector-locked-condition-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-condition gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Block Show / Hide Condition', '--gctd--' )}
            description={__( 'Define condition if you want to set your block shown / hidden', '--gctd--' )}
            img={'/condition-filter-animation.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedConditionControl;

import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedHeaderFilterControl = ({ isOpen }) => {
    const id = useInstanceId(LockedHeaderFilterControl, 'inspector-locked-dynamic-content-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-dynamic-content gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__('Unlock Header Filter', '--gctd--')}
            description={__('Add a filter button next to the Header Title of the Module, which users can use to filter the content displayed this Module. You can add filters based on Category, Tags, or Author.', '--gctd--')}
            img={'/dynamic-content-animation.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedHeaderFilterControl;
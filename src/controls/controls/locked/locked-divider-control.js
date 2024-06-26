
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedDividerControl = ({isOpen}) => {
    const id = useInstanceId(LockedDividerControl, 'inspector-locked-divider-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-divider gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Shape Divider Animated', '--gctd--' )}
            description={__( 'Transform your website design with custom-shaped elements that elegantly separate sections, complete with captivating animations for an irresistible layout.', '--gctd--' )}
            img={'/shape-divider-animated.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedDividerControl;
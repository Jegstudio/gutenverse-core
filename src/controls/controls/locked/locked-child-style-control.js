
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedChildStyleControl = ({isOpen}) => {
    const id = useInstanceId(LockedChildStyleControl, 'inspector-locked-child-style-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-child-style gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Text Highlight', '--gctd--' )}
            description={__( 'Elevate your text element with customizable options like color, style, text decoration, and more to make it stand out.', '--gctd--' )}
            img={'/highlight-text.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedChildStyleControl;
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedVideoPostFormat = ({ isOpen }) => {
    const id = useInstanceId(LockedVideoPostFormat, 'inspector-locked-gallery-post-format-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-gallery-post-format gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__('Video Post Format', '--gctd--')}
            description={__('Displaying a video as the featured image of your post when using video type format post.', '--gctd--')}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedVideoPostFormat;
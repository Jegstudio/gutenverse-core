import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import LockedJNewsBlocks from './locked-jnews-blocks';

const LockedGalleryPostFormat = ({ isOpen }) => {
    const id = useInstanceId(LockedGalleryPostFormat, 'inspector-locked-gallery-post-format-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-gallery-post-format gutenverse-control-locked-layout'}>
        <LockedJNewsBlocks
            title={__('Gallery Post Format', '--gctd--')}
            description={__('Displaying a gallery as the featured image of your post.', '--gctd--')}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedGalleryPostFormat;
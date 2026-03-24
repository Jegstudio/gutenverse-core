
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsBookmark = ({isOpen}) => {
    const id = useInstanceId(LockedNewsBookmark, 'inspector-locked-news-like-dislike-button');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-like-dislike-button gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Bookmark Feature', '--gctd--' )}
            description={__( 'Allow your readers to save their favorite posts. Upgrade to unlock the Bookmark feature and keep your audience engaged with personalized reading lists.', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsBookmark;
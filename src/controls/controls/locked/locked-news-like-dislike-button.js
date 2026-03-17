import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsLikeDislikeButton = ({isOpen}) => {
    const id = useInstanceId(LockedNewsLikeDislikeButton, 'inspector-locked-news-like-dislike-button');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-like-dislike-button gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Like/Dislike Feature', '--gctd--' )}
            description={__( 'Engage your audience! Upgrade to unlock the Like/Dislike feature and get valuable feedback on your content.', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsLikeDislikeButton;
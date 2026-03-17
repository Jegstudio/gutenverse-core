import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsPopupPost = ({isOpen}) => {
    const id = useInstanceId(LockedNewsPopupPost, 'inspector-locked-news-popup-post');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-popup-post gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Popup Post Feature', '--gctd--' )}
            description={__( 'Grab your readers attention! Upgrade to unlock the Popup Post feature for special announcements, newsletter signups, or featured content.', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsPopupPost;
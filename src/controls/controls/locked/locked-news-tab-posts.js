import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsTabPosts = ({isOpen}) => {
    const id = useInstanceId(LockedNewsTabPosts, 'inspector-locked-news-tab-posts');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-tab-posts gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Tab Posts Feature', '--gctd--' )}
            description={__( 'Organize multiple content categories efficiently within limited space. Upgrade to unlock Tab Posts and let users seamlessly switch between different news feeds.', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsTabPosts;
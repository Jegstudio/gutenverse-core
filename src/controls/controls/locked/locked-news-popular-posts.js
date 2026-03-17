import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsPopularPosts = ({isOpen}) => {
    const id = useInstanceId(LockedNewsPopularPosts, 'inspector-locked-news-popular-posts');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-popular-posts gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Popular Posts Feature', '--gctd--' )}
            description={__( 'Showcase your best content! Upgrade to unlock the Popular Posts feature, highlight your most-read articles, and boost user engagement on your site.', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsPopularPosts;
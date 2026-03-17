import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsPostViewStats = ({isOpen}) => {
    const id = useInstanceId(LockedNewsPostViewStats, 'inspector-locked-news-post-view-stats');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-post-view-stats gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Post View Stats Feature', '--gctd--' )}
            description={__( 'Showcase the popularity of your articles with real-time analytics. Upgrade to unlock Post View Stats and display visitor counts to build social proof.', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsPostViewStats;
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsPostReview = ({isOpen}) => {
    const id = useInstanceId(LockedNewsPostReview, 'inspector-locked-news-popup-post');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-popup-post gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Post Review Feature', '--gctd--' )}
            description={__( 'Build credibility with detailed product or content reviews. Upgrade to unlock Post Review capabilities and share structured ratings and pros/cons with your audience.', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsPostReview;
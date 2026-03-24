import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsReadingTime = ({isOpen}) => {
    const id = useInstanceId(LockedNewsReadingTime, 'inspector-locked-news-reading-reading-time');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-reading-time gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Reading Time Feature', '--gctd--' )}
            description={__( 'Give readers a quick estimate of how long evaluating an article will take. Upgrade to unlock the Reading Time feature and set clear expectations for your audience.', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsReadingTime;
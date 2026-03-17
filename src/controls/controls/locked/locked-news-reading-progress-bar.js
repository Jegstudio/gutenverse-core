import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsReadingProgressBar = ({isOpen}) => {
    const id = useInstanceId(LockedNewsReadingProgressBar, 'inspector-locked-news-reading-progress-bar');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-reading-progress-bar gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Reading Progress Bar Feature', '--gctd--' )}
            description={__( 'Enhance the reading experience by showing how much of the article remains. Upgrade to unlock the Reading Progress Bar and reduce bounce rates.', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsReadingProgressBar;
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsViewCounter = ({isOpen}) => {
    const id = useInstanceId(LockedNewsViewCounter, 'inspector-locked-news-view-counter');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-view-counter gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Views Counter Feature', '--gctd--' )}
            description={__( 'Track and display exactly how many times your content has been viewed. Upgrade to unlock the Views Counter feature and highlight your most trafficked pages.', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsViewCounter;
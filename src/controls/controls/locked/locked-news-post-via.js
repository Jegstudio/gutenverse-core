import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsPostVia = ({isOpen}) => {
    const id = useInstanceId(LockedNewsPostVia, 'inspector-locked-news-post-via');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-post-via gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Post Via Feature', '--gctd--' )}
            description={__( 'Acknowledge curators or platforms where your content was discovered. Upgrade to unlock the Post Via block to credit external links and references properly.', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsPostVia;
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsPostSubtitle = ({isOpen}) => {
    const id = useInstanceId(LockedNewsPostSubtitle, 'inspector-locked-news-post-subtitle');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-post-source gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Post Subtitle Feature', '--gctd--' )}
            description={__( 'Add more context to your articles right beneath the title. Upgrade to unlock the Post Subtitle feature and craft more engaging headlines', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsPostSubtitle;
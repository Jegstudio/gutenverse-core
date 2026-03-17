import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsPostSource = ({isOpen}) => {
    const id = useInstanceId(LockedNewsPostSource, 'inspector-locked-news-post-source');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-post-source gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Post Source Feature', '--gctd--' )}
            description={__( 'Maintain transparency by crediting original article sources professionally. Upgrade to unlock the Post Source feature and build trust with your readers.', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsPostSource;
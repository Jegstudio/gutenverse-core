import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsAuthorDonation = ({isOpen}) => {
    const id = useInstanceId(LockedNewsAuthorDonation, 'inspector-locked-news-essential');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-essential gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Author Donation', '--gctd--' )}
            description={__( 'Empower your writers! Upgrade to unlock the Author Donation feature, allowing your readers to support their favorite authors directly.', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsAuthorDonation;
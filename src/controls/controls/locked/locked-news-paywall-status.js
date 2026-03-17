import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsPaywallStatus = ({isOpen}) => {
    const id = useInstanceId(LockedNewsPaywallStatus, 'inspector-locked-news-paywall-status');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-paywall-status gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Paywall Status Feature', '--gctd--' )}
            description={__( 'Keep your subscribers informed with detail information. Upgrade to unlock the Paywall Status feature and allow users to view their active plan, expiration date, and payment methods.', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsPaywallStatus;
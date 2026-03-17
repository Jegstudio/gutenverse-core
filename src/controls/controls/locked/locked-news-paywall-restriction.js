import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsPaywallRestriction = ({isOpen}) => {
    const id = useInstanceId(LockedNewsPaywallRestriction, 'inspector-locked-news-paywall-restriction');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-news-paywall-restriction gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Paywall Restriction Feature', '--gctd--' )}
            description={__( 'Protect your premium content and turn readers into subscribers. Upgrade to unlock the Paywall Restriction feature and start monetizing your most valuable articles.', '--gctd--' )}
            img={'/text-clip.mp4'}
            isOpen={isOpen}
            permaLink={__('features/news')}
        />
    </div>;
};

export default LockedNewsPaywallRestriction;
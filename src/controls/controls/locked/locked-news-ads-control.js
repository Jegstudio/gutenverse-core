
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsAdsControl = () => {
    const id = useInstanceId(LockedNewsAdsControl, 'inspector-locked-ads-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-ads gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__('Unlock Ads on Article Lists', 'gutenverse-pro')}
            description={__('Increase your ad revenue by seamlessly placing advertisements within the post list in your Module block, helping you maximize visibility without disrupting the user experience.', 'gutenverse-pro')}
            img={'/cursor-effect.mp4'}
        />
    </div>;
};

export default LockedNewsAdsControl;
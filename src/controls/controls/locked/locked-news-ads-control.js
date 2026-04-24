
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedNewsAdsControl = () => {
    const id = useInstanceId(LockedNewsAdsControl, 'inspector-locked-ads-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-ads gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__('This Feature Available at Professional or Higher Plan', 'gutenverse-pro')}
            description={__('Elevate your module block by seamlessly inserting ads within the content to improve visibility and enhance user engagement.', 'gutenverse-pro')}
            img={'/cursor-effect.mp4'}
        />
    </div>;
};

export default LockedNewsAdsControl;
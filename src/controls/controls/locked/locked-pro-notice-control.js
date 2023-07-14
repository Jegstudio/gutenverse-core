
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

const LockedProNoticeControl = () => {
    const id = useInstanceId(LockedProNoticeControl, 'inspector-locked-pro-notice-control');
    const {
        imgDir
    } = window['GutenverseConfig'];

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-pro-notice'}>
        <div>
            <img className="illustration" src={`${imgDir}/asset_8_1.webp`} />
        </div>
        <div>
            <h2 className="title">{ __( 'Unlock The Amazing Page Builder For Gutenberg', 'gutenverse' ) }</h2>
            <span className="description">{ __( 'You are currently using free version. Upgrade now to unlock full potential of your website design', 'gutenverse' ) }</span>
        </div>
    </div>;
};

export default LockedProNoticeControl;
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedSiteKeyControl = ({ isOpen }) => {
    const id = useInstanceId(LockedSiteKeyControl, 'inspector-locked-site-key-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-site-key gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__('Unlock reCAPTCHA Site Key', '--gctd--')}
            description={__('Connect your Google reCAPTCHA site key by upgrading to Pro. This keeps your form protected while unlocking reCAPTCHA configuration in the editor.', '--gctd--')}
            img={'/form-logic.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedSiteKeyControl;

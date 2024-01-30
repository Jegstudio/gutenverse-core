
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedFluidBackground = ({isOpen}) => {
    const id = useInstanceId(LockedFluidBackground, 'inspector-locked-fluid-background');
    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-fluid-background gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Fluid Background', '--gctd--' )}
            description={__( 'Add a stunning fluid background to your site. Upgrade to Pro to customize the fluid background to fit your website\'s style.', '--gctd--' )}
            img={'/fluid-background-animation.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedFluidBackground;
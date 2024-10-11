
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedPresetControl = ({isOpen}) => {
    const id = useInstanceId(LockedPresetControl, 'inspector-locked-preset-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-preset gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Preset', '--gctd--' )}
            description={__( 'Redesign your block easier using preset', '--gctd--' )}
            img={'/background-effect.mp4'}
            isOpen={isOpen}
        />
    </div>;
};

export default LockedPresetControl;
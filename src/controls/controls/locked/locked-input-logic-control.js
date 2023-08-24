
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedInputLogicControl = () => {
    const id = useInstanceId(LockedInputLogicControl, 'inspector-locked-input-logic-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-input-logic gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Input Logic', '--gctd--' )}
            description={__( 'Input Logic allows you to create a conditional display for certain input values.', '--gctd--' )}
            img={'pro/sticky.gif'}
        />
    </div>;
};

export default LockedInputLogicControl;
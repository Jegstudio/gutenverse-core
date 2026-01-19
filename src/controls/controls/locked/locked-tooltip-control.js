
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import DefaultLayout from './default-layout';

const LockedTooltipControl = ({isOpen}) => {
    const id = useInstanceId(LockedTooltipControl, 'inspector-locked-tooltip-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-locked-tooltip gutenverse-control-locked-layout'}>
        <DefaultLayout
            title={__( 'Unlock Tooltip', '--gctd--' )}
            description={__( 'Enhance your elements with Tooltip: deliver clear, contextual guidance that appears effortlessly on hover or focus, creating a smoother and more intuitive user experience.', '--gctd--' )}
            img={'/transform.mp4'}
            isOpen={isOpen}
            permaLink={__('tooltip/')}
        />
    </div>;
};

export default LockedTooltipControl;
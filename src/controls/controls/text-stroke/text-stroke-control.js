
import { useInstanceId } from '@wordpress/compose';
import { compose } from '@wordpress/compose';
import { withDeviceControl, withParentControl } from 'gutenverse-core/hoc';
import { ColorControl, SizeControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';

const TextStrokeControl = (props) => {
    const {
        value = {},
        onValueChange,
        onStyleChange,
    } = props;

    const id = useInstanceId(TextStrokeControl, 'inspector-text-stroke-control');

    return <div id={id} className={'gutenverse-control-wrapper'}>
        <ColorControl
            label={__('Stroke Color', '--gctd--')}
            value={value.color}
            onValueChange={color => onValueChange({ ...value, color })}
            onStyleChange={color => onStyleChange({ ...value, color })}
        />
        <SizeControl
            label={__('Stroke Width', '--gctd--')}
            value={value.width}
            onValueChange={width => onValueChange({ ...value, width })}
            onStyleChange={width => onStyleChange({ ...value, width })}
            units={{
                px: {
                    text: 'px',
                    min: 1,
                    max: 10,
                    step: 1,
                    unit: 'px',
                },
                em: {
                    text: 'em',
                    min: 0.1,
                    max: 10,
                    step: 0.1,
                    unit: 'em',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                }
            }}
        />
    </div>;
};

export default compose(withParentControl)(TextStrokeControl);
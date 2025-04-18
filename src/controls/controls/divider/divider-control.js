
import {useInstanceId} from '@wordpress/compose';
import { SelectControl, ColorControl, RangeControl, CheckboxControl, GradientControl, AngleControl } from 'gutenverse-core/controls';
import {__} from '@wordpress/i18n';
import { withParentControl } from 'gutenverse-core/hoc';

const DividerControl = (props) => {
    const {
        value = {},
        onValueChange,
        onLocalChange,
    } = props;

    const id = useInstanceId(DividerControl, 'inspector-divider-control');
    const isCapableInvert = [
        'arrow',
        'curve',
        'curve_a2',
        'curve_o',
        'mountain',
        'mountain_o',
        'papertear',
        'triangle_3',
        'waves',
        'waves_2',
        'waves_o1',
        'waves_o2',
        'waves_o3',
    ];

    const showInvert = isCapableInvert.includes(value.type);

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-background'}>
        <SelectControl
            label={__('Type', '--gctd--')}
            value={value.type}
            onValueChange={type => {
                if (type && type !== 'none') {
                    onValueChange({...value, type});
                } else {
                    onValueChange(undefined);
                }
            }}
            options={[
                {
                    label: __('None', '--gctd--'),
                    value: 'none'
                },
                {
                    label: __('Arrow', '--gctd--'),
                    value: 'arrow'
                },
                {
                    label: __('Curve', '--gctd--'),
                    value: 'curve'
                },
                {
                    label: __('Curve Asymetrical', '--gctd--'),
                    value: 'curve_a1'
                },
                {
                    label: __('Curve Asymetrical 2', '--gctd--'),
                    value: 'curve_a2'
                },
                {
                    label: __('Curve Negative', '--gctd--'),
                    value: 'curve_n'
                },
                {
                    label: __('Curve Opacity', '--gctd--'),
                    value: 'curve_o'
                },
                {
                    label: __('Mountain', '--gctd--'),
                    value: 'mountain'
                },
                {
                    label: __('Mountain Opacity', '--gctd--'),
                    value: 'mountain_o'
                },
                {
                    label: __('Papertear', '--gctd--'),
                    value: 'papertear'
                },
                {
                    label: __('Split', '--gctd--'),
                    value: 'split'
                },
                {
                    label: __('Split Negative', '--gctd--'),
                    value: 'split_n'
                },
                {
                    label: __('Tilt', '--gctd--'),
                    value: 'tilt'
                },
                {
                    label: __('Tilt Gradient', '--gctd--'),
                    value: 'tilt_g'
                },
                {
                    label: __('Triangle', '--gctd--'),
                    value: 'triangle_2'
                },
                {
                    label: __('Triangle Opacity', '--gctd--'),
                    value: 'triangle'
                },
                {
                    label: __('Triangle Asymetrical', '--gctd--'),
                    value: 'triangle_3'
                },
                {
                    label: __('Triangle Asymetrical Opacity', '--gctd--'),
                    value: 'triangle_o'
                },
                {
                    label: __('Triangle Negative', '--gctd--'),
                    value: 'triangle_n'
                },
                {
                    label: __('Triangle Negative Opacity', '--gctd--'),
                    value: 'triangle_n_o'
                },
                {
                    label: __('Waves', '--gctd--'),
                    value: 'waves'
                },
                {
                    label: __('Waves 2', '--gctd--'),
                    value: 'waves_2'
                },
                {
                    label: __('Waves Opacity', '--gctd--'),
                    value: 'waves_o1'
                },
                {
                    label: __('Waves Opacity 2', '--gctd--'),
                    value: 'waves_o2'
                },
                {
                    label: __('Waves Opacity 3', '--gctd--'),
                    value: 'waves_o3'
                },
                {
                    label: __('Zig Zag', '--gctd--'),
                    value: 'zigzag'
                },
            ]}
        />
        <RangeControl
            label={__('Width', '--gctd--')}
            value={value.width}
            onValueChange={width => onValueChange({...value, width})}
            onLocalChange={width => onLocalChange({...value, width})}
            min={100}
            max={300}
            step={1}
            allowDeviceControl={true}
            unit="px"
        />
        <RangeControl
            label={__('Height', '--gctd--')}
            value={value.height}
            onValueChange={height => onValueChange({...value, height})}
            onLocalChange={height => onLocalChange({...value, height})}
            min={1}
            max={500}
            step={1}
            allowDeviceControl={true}
            unit="px"
        />
        <CheckboxControl
            label={__('Flip', '--gctd--')}
            value={value.flip}
            onValueChange={flip => onValueChange({...value, flip})}
        />
        {showInvert ? <CheckboxControl
            label={__('Invert', '--gctd--')}
            value={value.invert}
            onValueChange={invert => onValueChange({...value, invert})}
        /> : <></>}
        <CheckboxControl
            label={__('Bring to Front', '--gctd--')}
            value={value.front}
            onValueChange={front => onValueChange({...value, front})}
        />
        <>
            <SelectControl
                label={__('Color Mode', '--gctd--')}
                value={value.colorMode}
                onValueChange={colorMode => onValueChange({...value, colorMode})}
                options={[
                    {
                        label: __('Default', '--gctd--'),
                        value: 'default'
                    },
                    {
                        label: __('Gradient', '--gctd--'),
                        value: 'gradient'
                    }
                ]}
            />
            {value.colorMode && value.colorMode === 'default' && <ColorControl
                label={__('Color', '--gctd--')}
                value={value.color}
                onValueChange={color => onValueChange({...value, color})}
                onLocalChange={color => onLocalChange({...value, color})}
            />}
            {value.colorMode && value.colorMode === 'gradient' && <>
                <GradientControl
                    label={__('Gradient Color', '--gctd--')}
                    description={__('Drag a circle outside the box to remove it. \nYou can\'t remove if there are only two left.', '--gctd--')}
                    value={value.gradientColor}
                    onValueChange={gradientColor => onValueChange({ ...value, gradientColor })}
                />
                <AngleControl
                    label={__('Gradient Angle', '--gctd--')}
                    value={value.gradientAngle}
                    onValueChange={gradientAngle => onValueChange({ ...value, gradientAngle })}
                />
            </>}
            {value.colorMode && value.colorMode === 'gradient' && ['curve_a1', 'curve_n', 'curve_o', 'mountain_o', 'tilt_g', 'triangle', 'triangle_o', 'triangle_n_o', 'waves_o1', 'waves_o2', 'waves_o3'].includes(value.type) && <>
                <GradientControl
                    label={__('Gradient Color 2', '--gctd--')}
                    description={__('Drag a circle outside the box to remove it. \nYou can\'t remove if there are only two left.', '--gctd--')}
                    value={value.gradientColor2}
                    onValueChange={gradientColor2 => onValueChange({ ...value, gradientColor2 })}
                />
                <AngleControl
                    label={__('Gradient Angle 2', '--gctd--')}
                    value={value.gradientAngle2}
                    onValueChange={gradientAngle2 => onValueChange({ ...value, gradientAngle2 })}
                />
            </>}
            {value.colorMode && value.colorMode === 'gradient' && ['curve_a1', 'curve_n', 'curve_o', 'mountain_o', 'tilt_g', 'triangle', 'triangle_o', 'triangle_n_o', 'waves_o1', 'waves_o2', 'waves_o3'].includes(value.type) && <>
                <GradientControl
                    label={__('Gradient Color 3', '--gctd--')}
                    description={__('Drag a circle outside the box to remove it. \nYou can\'t remove if there are only two left.', '--gctd--')}
                    value={value.gradientColor3}
                    onValueChange={gradientColor3 => onValueChange({ ...value, gradientColor3 })}
                />
                <AngleControl
                    label={__('Gradient Angle 3', '--gctd--')}
                    value={value.gradientAngle3}
                    onValueChange={gradientAngle3 => onValueChange({ ...value, gradientAngle3 })}
                />
            </>}
        </>
    </div>;
};

export default withParentControl(DividerControl);
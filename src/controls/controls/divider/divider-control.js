
import {useInstanceId} from '@wordpress/compose';
import { SelectControl, ColorControl, RangeControl, CheckboxControl, GradientControl, AngleControl } from 'gutenverse-core-editor/controls';
import {__} from '@wordpress/i18n';
import { withParentControl } from 'gutenverse-core-editor/hoc';

const DividerControl = (props) => {
    const {
        value = {},
        onValueChange,
        onStyleChange
    } = props;

    const id = useInstanceId(DividerControl, 'inspector-divider-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-background'}>
        <SelectControl
            label={__('Type', 'gutenverse')}
            value={value.type}
            onValueChange={type => {
                if (type && type !== 'none') {
                    onValueChange({...value, type});
                } else {
                    onValueChange(undefined);
                }
            }}
            onStyleChange={type => {
                if (type && type !== 'none') {
                    onStyleChange({...value, type});
                } else {
                    onStyleChange(undefined);
                }
            }}
            options={[
                {
                    label: __('None', 'gutenverse'),
                    value: 'none'
                },
                {
                    label: __('Arrow', 'gutenverse'),
                    value: 'arrow'
                },
                {
                    label: __('Curve', 'gutenverse'),
                    value: 'curve'
                },
                {
                    label: __('Curve Asymetrical', 'gutenverse'),
                    value: 'curve_a1'
                },
                {
                    label: __('Curve Asymetrical 2', 'gutenverse'),
                    value: 'curve_a2'
                },
                {
                    label: __('Curve Negative', 'gutenverse'),
                    value: 'curve_n'
                },
                {
                    label: __('Curve Opacity', 'gutenverse'),
                    value: 'curve_o'
                },
                {
                    label: __('Mountain', 'gutenverse'),
                    value: 'mountain'
                },
                {
                    label: __('Mountain Opacity', 'gutenverse'),
                    value: 'mountain_o'
                },
                {
                    label: __('Papertear', 'gutenverse'),
                    value: 'papertear'
                },
                {
                    label: __('Split', 'gutenverse'),
                    value: 'split'
                },
                {
                    label: __('Split Negative', 'gutenverse'),
                    value: 'split_n'
                },
                {
                    label: __('Tilt', 'gutenverse'),
                    value: 'tilt'
                },
                {
                    label: __('Tilt Gradient', 'gutenverse'),
                    value: 'tilt_g'
                },
                {
                    label: __('Triangle', 'gutenverse'),
                    value: 'triangle_2'
                },
                {
                    label: __('Triangle Opacity', 'gutenverse'),
                    value: 'triangle'
                },
                {
                    label: __('Triangle Asymetrical', 'gutenverse'),
                    value: 'triangle_3'
                },
                {
                    label: __('Triangle Asymetrical Opacity', 'gutenverse'),
                    value: 'triangle_o'
                },
                {
                    label: __('Triangle Negative', 'gutenverse'),
                    value: 'triangle_n'
                },
                {
                    label: __('Triangle Negative Opacity', 'gutenverse'),
                    value: 'triangle_n_o'
                },
                {
                    label: __('Waves', 'gutenverse'),
                    value: 'waves'
                },
                {
                    label: __('Waves 2', 'gutenverse'),
                    value: 'waves_2'
                },
                {
                    label: __('Waves Opacity', 'gutenverse'),
                    value: 'waves_o1'
                },
                {
                    label: __('Waves Opacity 2', 'gutenverse'),
                    value: 'waves_o2'
                },
                {
                    label: __('Waves Opacity 3', 'gutenverse'),
                    value: 'waves_o3'
                },
                {
                    label: __('Zig Zag', 'gutenverse'),
                    value: 'zigzag'
                },
            ]}
        />
        <RangeControl
            label={__('Width', 'gutenverse')}
            value={value.width}
            onValueChange={width => onValueChange({...value, width})}
            onStyleChange={width => onStyleChange({...value, width})}
            min={100}
            max={300}
            step={1}
            allowDeviceControl={true}
        />
        <RangeControl
            label={__('Height', 'gutenverse')}
            value={value.height}
            onValueChange={height => onValueChange({...value, height})}
            onStyleChange={height => onStyleChange({...value, height})}
            min={1}
            max={500}
            step={1}
            allowDeviceControl={true}
        />
        <CheckboxControl
            label={__('Flip', 'gutenverse')}
            value={value.flip}
            onValueChange={flip => onValueChange({...value, flip})}
            onStyleChange={flip => onStyleChange({...value, flip})}
        />
        <CheckboxControl
            label={__('Bring to Front', 'gutenverse')}
            value={value.front}
            onValueChange={front => onValueChange({...value, front})}
            onStyleChange={front => onStyleChange({...value, front})}
        />
        <>
            <SelectControl
                label={__('Color Mode', 'gutenverse')}
                value={value.colorMode}
                onValueChange={colorMode => onValueChange({...value, colorMode})}
                onStyleChange={colorMode => onStyleChange({...value, colorMode})}
                options={[
                    {
                        label: __('Default', 'gutenverse'),
                        value: 'default'
                    },
                    {
                        label: __('Gradient', 'gutenverse'),
                        value: 'gradient'
                    }
                ]}
            />
            {value.colorMode && value.colorMode === 'default' && <ColorControl
                label={__('Color', 'gutenverse')}
                value={value.color}
                onValueChange={color => onValueChange({...value, color})}
                onStyleChange={color => onStyleChange({...value, color})}
            />}
            {value.colorMode && value.colorMode === 'gradient' && <>
                <GradientControl
                    label={__('Gradient Color', 'gutenverse')}
                    description={__('Drag a circle outside the box to remove it. \nYou can\'t remove if there are only two left.', 'gutenverse')}
                    value={value.gradientColor}
                    onValueChange={gradientColor => onValueChange({ ...value, gradientColor })}
                    onStyleChange={gradientColor => onStyleChange({ ...value, gradientColor })}
                />
                <AngleControl
                    label={__('Gradient Angle', 'gutenverse')}
                    value={value.gradientAngle}
                    onValueChange={gradientAngle => onValueChange({ ...value, gradientAngle })}
                    onStyleChange={gradientAngle => onStyleChange({ ...value, gradientAngle })}
                />
            </>}
            {value.colorMode && value.colorMode === 'gradient' && ['curve_a1', 'curve_n', 'curve_o', 'mountain_o', 'tilt_g', 'triangle', 'triangle_o', 'triangle_n_o', 'waves_o1', 'waves_o2', 'waves_o3'].includes(value.type) && <>
                <GradientControl
                    label={__('Gradient Color 2', 'gutenverse')}
                    description={__('Drag a circle outside the box to remove it. \nYou can\'t remove if there are only two left.', 'gutenverse')}
                    value={value.gradientColor2}
                    onValueChange={gradientColor2 => onValueChange({ ...value, gradientColor2 })}
                    onStyleChange={gradientColor2 => onStyleChange({ ...value, gradientColor2 })}
                />
                <AngleControl
                    label={__('Gradient Angle 2', 'gutenverse')}
                    value={value.gradientAngle2}
                    onValueChange={gradientAngle2 => onValueChange({ ...value, gradientAngle2 })}
                    onStyleChange={gradientAngle2 => onStyleChange({ ...value, gradientAngle2 })}
                />
            </>}
            {value.colorMode && value.colorMode === 'gradient' && ['curve_a1', 'curve_n', 'curve_o', 'mountain_o', 'tilt_g', 'triangle', 'triangle_o', 'triangle_n_o', 'waves_o1', 'waves_o2', 'waves_o3'].includes(value.type) && <>
                <GradientControl
                    label={__('Gradient Color 3', 'gutenverse')}
                    description={__('Drag a circle outside the box to remove it. \nYou can\'t remove if there are only two left.', 'gutenverse')}
                    value={value.gradientColor3}
                    onValueChange={gradientColor3 => onValueChange({ ...value, gradientColor3 })}
                    onStyleChange={gradientColor3 => onStyleChange({ ...value, gradientColor3 })}
                />
                <AngleControl
                    label={__('Gradient Angle 3', 'gutenverse')}
                    value={value.gradientAngle3}
                    onValueChange={gradientAngle3 => onValueChange({ ...value, gradientAngle3 })}
                    onStyleChange={gradientAngle3 => onStyleChange({ ...value, gradientAngle3 })}
                />
            </>}
        </>
    </div>;
};

export default withParentControl(DividerControl);
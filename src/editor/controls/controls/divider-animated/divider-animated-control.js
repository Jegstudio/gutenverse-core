
import { useInstanceId } from '@wordpress/compose';
import { SelectControl } from 'gutenverse-core-editor/controls';
import { __ } from '@wordpress/i18n';
import { withParentControl } from 'gutenverse-core-editor/hoc';
import { CheckboxControl, RangeControl, ColorControl, GradientControl, AngleControl, SizeControl, ElementSelectorControl } from 'gutenverse-core-editor/controls';

const DividerAnimatedControl = (props) => {
    const {
        value = {},
        onValueChange,
        onStyleChange,
        elementRef
    } = props;

    const formatString = (str, ...args) => str.replace(/(\{\d+\})/g, a => args[+(a.substr(1, a.length - 2)) || 0]);
    const id = useInstanceId(DividerAnimatedControl, 'inspector-divider-animated-control');
    const numberOfColors = {
        waves: 4,
        waves_2: 4,
        // gradient: 3,
        hexagonal: 6,
        mountain: 4,
        split: 4,
        triangle: 4,
        triangle_2: 4,
        triangle_n: 4,
        curve: 4,
        curve_a: 4,
        curve_a_2: 4,
        curve_an: 4,
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-background'}>
        <SelectControl
            label={__('Type', 'gutenverse')}
            value={value.type}
            onValueChange={type => onValueChange({ ...value, type })}
            onStyleChange={type => onValueChange({ ...value, type })}
            options={[
                {
                    label: __('None', 'gutenverse'),
                    value: 'none'
                },
                {
                    label: __('Waves', 'gutenverse'),
                    value: 'waves'
                },
                {
                    label: __('Waves 2', 'gutenverse'),
                    value: 'waves_2'
                },
                // {
                //     label: __('Gradient', 'gutenverse'),
                //     value: 'gradient'
                // },
                {
                    label: __('Hexagonal', 'gutenverse'),
                    value: 'hexagonal'
                },
                {
                    label: __('Mountain', 'gutenverse'),
                    value: 'mountain'
                },
                {
                    label: __('Split', 'gutenverse'),
                    value: 'split'
                },
                {
                    label: __('Triangle', 'gutenverse'),
                    value: 'triangle'
                },
                {
                    label: __('Triangle 2', 'gutenverse'),
                    value: 'triangle_2'
                },
                {
                    label: __('Triangle Negative', 'gutenverse'),
                    value: 'triangle_n'
                },
                {
                    label: __('Curve', 'gutenverse'),
                    value: 'curve'
                },
                {
                    label: __('Curve Asymetrical', 'gutenverse'),
                    value: 'curve_a'
                },
                {
                    label: __('Curve Asymetrical 2', 'gutenverse'),
                    value: 'curve_a_2'
                },
                {
                    label: __('Curve Asymetrical Negative', 'gutenverse'),
                    value: 'curve_an'
                },
            ]}
        />
        <RangeControl
            label={__('Width', 'gutenverse')}
            value={value.width}
            onValueChange={width => onValueChange({ ...value, width })}
            onStyleChange={width => onStyleChange({ ...value, width })}
            min={100}
            max={300}
            step={1}
            allowDeviceControl={true}
        />
        <RangeControl
            label={__('Height', 'gutenverse')}
            value={value.height}
            onValueChange={height => onValueChange({ ...value, height })}
            onStyleChange={height => onStyleChange({ ...value, height })}
            min={1}
            max={500}
            step={1}
            allowDeviceControl={true}
        />
        <RangeControl
            label={__('Speed', 'gutenverse')}
            value={value.speed}
            onValueChange={speed => onValueChange({ ...value, speed })}
            onStyleChange={speed => onStyleChange({ ...value, speed })}
            min={0}
            max={10}
            step={0.1}
        />
        <CheckboxControl
            label={__('Flip', 'gutenverse')}
            value={value.flip}
            onValueChange={flip => onValueChange({ ...value, flip })}
            onStyleChange={flip => onStyleChange({ ...value, flip })}
        />
        <CheckboxControl
            label={__('Bring to Front', 'gutenverse')}
            value={value.front}
            onValueChange={front => onValueChange({ ...value, front })}
            onStyleChange={front => onStyleChange({ ...value, front })}
        />
        <CheckboxControl
            label={__('Loop', 'gutenverse')}
            value={value.loop}
            onValueChange={loop => onValueChange({ ...value, loop })}
            onStyleChange={loop => onStyleChange({ ...value, loop })}
        />
        <SelectControl
            label={__('Load On', 'gutenverse')}
            value={value.loadOn}
            onValueChange={loadOn => onValueChange({ ...value, loadOn })}
            onStyleChange={loadOn => onStyleChange({ ...value, loadOn })}
            options={[
                {
                    label: __('Page Load', 'gutenverse'),
                    value: 'pageload'
                },
                {
                    label: __('Viewport', 'gutenverse'),
                    value: 'viewport'
                },
                {
                    label: __('Hover', 'gutenverse'),
                    value: 'hover'
                },
            ]}
        />
        {value.loadOn === 'viewport' &&
            <SizeControl
                label={__('Offset', 'gutenverse')}
                value={value.offset}
                default={{ point: 50, unit: '%' }}
                onValueChange={offset => onValueChange({ ...value, offset })}
                onStyleChange={offset => onStyleChange({ ...value, offset })}
                units={{
                    ['%']: {
                        text: '%',
                        min: 0,
                        max: 100,
                        step: 1,
                        unit: '%',
                    },
                }}
            />
        }
        {value.loadOn === 'hover' &&
            <ElementSelectorControl
                label={__('Hover Anchor', 'gutenverse')}
                description={__('Use Element ID or Class, or click Tree below to select. Leave empty to use body.', 'gutenverse')}
                value={value.hoverAnchor}
                onValueChange={hoverAnchor => onValueChange({ ...value, hoverAnchor })}
                onStyleChange={hoverAnchor => onStyleChange({ ...value, hoverAnchor })}
                elementRef={elementRef}
            />
        }
        {(value.loadOn === 'viewport' || value.loadOn === 'hover') &&
            <CheckboxControl
                label={__('Pause on Leave', 'gutenverse')}
                value={value.pauseOnLeave}
                onValueChange={pauseOnLeave => onValueChange({ ...value, pauseOnLeave })}
                onStyleChange={pauseOnLeave => onStyleChange({ ...value, pauseOnLeave })}
            />
        }
        <SelectControl
            label={__('Color Mode', 'gutenverse')}
            value={value.colorMode}
            onValueChange={colorMode => onValueChange({ ...value, colorMode })}
            onStyleChange={colorMode => onStyleChange({ ...value, colorMode })}
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
        {value.colorMode === 'default' && value.type && numberOfColors[value.type] && (
            Array.from({ length: numberOfColors[value.type] }, (v, i) => i).map(i => (
                <ColorControl
                    key={i}
                    label={formatString(__('Color {0}', 'gutenverse'), i + 1)}
                    value={value[`color${i}`]}
                    onValueChange={color => onValueChange({ ...value, [`color${i}`]: color })}
                    onStyleChange={color => onStyleChange({ ...value, [`color${i}`]: color })}
                />
            ))
        )}
        {value.colorMode === 'gradient' && value.type && numberOfColors[value.type] && (
            Array.from({ length: numberOfColors[value.type] }, (v, i) => i).map(i => (
                <>
                    <GradientControl
                        label={formatString(__('Gradient Color {0}', 'gutenverse'), i + 1)}
                        description={__('Drag a circle outside the box to remove it. \nYou can\'t remove if there are only two left.', 'gutenverse')}
                        value={value[`gradientColor${i}`]}
                        onValueChange={color => onValueChange({ ...value, [`gradientColor${i}`]: color })}
                        onStyleChange={color => onStyleChange({ ...value, [`gradientColor${i}`]: color })}
                    />
                    <AngleControl
                        label={formatString(__('Gradient Angle {0}', 'gutenverse'), i + 1)}
                        value={value[`gradientAngle${i}`]}
                        onValueChange={angle => onValueChange({ ...value, [`gradientAngle${i}`]: angle })}
                        onStyleChange={angle => onStyleChange({ ...value, [`gradientAngle${i}`]: angle })}
                    />
                </>
            ))
        )}
    </div>;
};

export default withParentControl(DividerAnimatedControl);
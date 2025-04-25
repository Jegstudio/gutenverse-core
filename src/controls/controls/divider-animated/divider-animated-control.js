
import { useInstanceId } from '@wordpress/compose';
import { SelectControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { withParentControl } from 'gutenverse-core/hoc';
import { CheckboxControl, RangeControl, ColorControl, GradientControl, AngleControl, SizeControl, ElementSelectorControl } from 'gutenverse-core/controls';

const DividerAnimatedControl = (props) => {
    const {
        value = {},
        onValueChange,
        onLocalChange,
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
            label={__('Type', '--gctd--')}
            value={value.type}
            onValueChange={type => onValueChange({ ...value, type })}
            options={[
                {
                    label: __('None', '--gctd--'),
                    value: 'none'
                },
                {
                    label: __('Waves', '--gctd--'),
                    value: 'waves'
                },
                {
                    label: __('Waves 2', '--gctd--'),
                    value: 'waves_2'
                },
                // {
                //     label: __('Gradient', '--gctd--'),
                //     value: 'gradient'
                // },
                {
                    label: __('Hexagonal', '--gctd--'),
                    value: 'hexagonal'
                },
                {
                    label: __('Mountain', '--gctd--'),
                    value: 'mountain'
                },
                {
                    label: __('Split', '--gctd--'),
                    value: 'split'
                },
                {
                    label: __('Triangle', '--gctd--'),
                    value: 'triangle'
                },
                {
                    label: __('Triangle 2', '--gctd--'),
                    value: 'triangle_2'
                },
                {
                    label: __('Triangle Negative', '--gctd--'),
                    value: 'triangle_n'
                },
                {
                    label: __('Curve', '--gctd--'),
                    value: 'curve'
                },
                {
                    label: __('Curve Asymetrical', '--gctd--'),
                    value: 'curve_a'
                },
                {
                    label: __('Curve Asymetrical 2', '--gctd--'),
                    value: 'curve_a_2'
                },
                {
                    label: __('Curve Asymetrical Negative', '--gctd--'),
                    value: 'curve_an'
                },
            ]}
        />
        <RangeControl
            label={__('Width', '--gctd--')}
            value={value.width}
            onValueChange={width => onValueChange({ ...value, width })}
            onLocalChange={onLocalChange}
            min={100}
            max={300}
            step={1}
            allowDeviceControl={true}
            unit="px"
        />
        <RangeControl
            label={__('Height', '--gctd--')}
            value={value.height}
            onValueChange={height => onValueChange({ ...value, height })}
            onLocalChange={onLocalChange}
            min={1}
            max={500}
            step={1}
            allowDeviceControl={true}
            unit="px"
        />
        <RangeControl
            label={__('Speed', '--gctd--')}
            value={value.speed}
            onValueChange={speed => onValueChange({ ...value, speed })}
            onLocalChange={onLocalChange}
            min={0}
            max={10}
            step={0.1}
            unit="s"
        />
        <CheckboxControl
            label={__('Flip', '--gctd--')}
            value={value.flip}
            onValueChange={flip => onValueChange({ ...value, flip })}
        />
        <CheckboxControl
            label={__('Bring to Front', '--gctd--')}
            value={value.front}
            onValueChange={front => onValueChange({ ...value, front })}
        />
        <CheckboxControl
            label={__('Loop', '--gctd--')}
            value={value.loop}
            onValueChange={loop => onValueChange({ ...value, loop })}
        />
        <SelectControl
            label={__('Load On', '--gctd--')}
            value={value.loadOn}
            onValueChange={loadOn => onValueChange({ ...value, loadOn })}
            options={[
                {
                    label: __('Page Load', '--gctd--'),
                    value: 'pageload'
                },
                {
                    label: __('Viewport', '--gctd--'),
                    value: 'viewport'
                },
                {
                    label: __('Hover', '--gctd--'),
                    value: 'hover'
                },
            ]}
        />
        {value.loadOn === 'viewport' &&
            <SizeControl
                label={__('Offset', '--gctd--')}
                value={value.offset}
                default={{ point: 50, unit: '%' }}
                onValueChange={offset => onValueChange({ ...value, offset })}
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
                label={__('Hover Anchor', '--gctd--')}
                description={__('Use Element ID or Class, or click Tree below to select. Leave empty to use body.', '--gctd--')}
                value={value.hoverAnchor}
                onValueChange={hoverAnchor => onValueChange({ ...value, hoverAnchor })}
                elementRef={elementRef}
            />
        }
        {(value.loadOn === 'viewport' || value.loadOn === 'hover') &&
            <CheckboxControl
                label={__('Pause on Leave', '--gctd--')}
                value={value.pauseOnLeave}
                onValueChange={pauseOnLeave => onValueChange({ ...value, pauseOnLeave })}
            />
        }
        <SelectControl
            label={__('Color Mode', '--gctd--')}
            value={value.colorMode}
            onValueChange={colorMode => onValueChange({ ...value, colorMode })}
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
        {value.colorMode === 'default' && value.type && numberOfColors[value.type] && (
            Array.from({ length: numberOfColors[value.type] }, (v, i) => i).map(i => (
                <ColorControl
                    key={i}
                    label={formatString(__('Color {0}', '--gctd--'), i + 1)}
                    value={value[`color${i}`]}
                    onValueChange={color => onValueChange({ ...value, [`color${i}`]: color })}
                    onLocalChange={color => onLocalChange({ ...value, [`color${i}`]: color })}
                />
            ))
        )}
        {value.colorMode === 'gradient' && value.type && numberOfColors[value.type] && (
            Array.from({ length: numberOfColors[value.type] }, (v, i) => i).map(i => (
                <>
                    <GradientControl
                        label={formatString(__('Gradient Color {0}', '--gctd--'), i + 1)}
                        description={__('Drag a circle outside the box to remove it. \nYou can\'t remove if there are only two left.', '--gctd--')}
                        value={value[`gradientColor${i}`]}
                        onValueChange={color => onValueChange({ ...value, [`gradientColor${i}`]: color })}
                    />
                    <AngleControl
                        label={formatString(__('Gradient Angle {0}', '--gctd--'), i + 1)}
                        value={value[`gradientAngle${i}`]}
                        onValueChange={angle => onValueChange({ ...value, [`gradientAngle${i}`]: angle })}
                    />
                </>
            ))
        )}
    </div>;
};

export default withParentControl(DividerAnimatedControl);
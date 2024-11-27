
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { Droplet, Image, Video, Wind } from 'react-feather';
import { withParentControl } from 'gutenverse-core/hoc';
import { CheckboxControl, ColorControl, IconRadioControl, ImageControl, SelectControl, SizeControl, TextControl, GradientControl, AngleControl, ControlHeadingSimple, LockedFluidBackground } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { applyFilters } from '@wordpress/hooks';

const gradientOption = (props) => {
    const { value = {}, onValueChange, onStyleChange } = props;
    return <>
        <GradientControl
            label={__('Gradient Color', '--gctd--')}
            description={__('Drag a circle outside the box to remove it. \nYou can\'t remove if there are only two left.', '--gctd--')}
            value={value.gradientColor}
            onValueChange={gradientColor => onValueChange({ ...value, gradientColor })}
            onStyleChange={gradientColor => onStyleChange({ ...value, gradientColor })}
        />
        <div className={'gradient-type'}>
            <div>
                <SelectControl
                    label={__('Gradient Type', '--gctd--')}
                    value={value.gradientType}
                    onValueChange={gradientType => onValueChange({ ...value, gradientType })}
                    onStyleChange={gradientType => onStyleChange({ ...value, gradientType })}
                    options={[
                        {
                            label: __('Linear', '--gctd--'),
                            value: 'linear'
                        },
                        {
                            label: __('Radial', '--gctd--'),
                            value: 'radial'
                        },
                    ]}
                />
            </div>
            <div>
                {value.gradientType !== undefined && value.gradientType === 'linear' && <AngleControl
                    label={__('Angle', '--gctd--')}
                    value={value.gradientAngle}
                    onValueChange={gradientAngle => onValueChange({ ...value, gradientAngle })}
                    onStyleChange={gradientAngle => onStyleChange({ ...value, gradientAngle })}
                />
                }
                {value.gradientType !== undefined && value.gradientType === 'radial' && <SelectControl
                    label={__('Radial Position', '--gctd--')}
                    value={value.gradientRadial}
                    onValueChange={gradientRadial => onValueChange({ ...value, gradientRadial })}
                    onStyleChange={gradientRadial => onStyleChange({ ...value, gradientRadial })}
                    options={[
                        {
                            label: __('Center Center', '--gctd--'),
                            value: 'center center'
                        },
                        {
                            label: __('Center Left', '--gctd--'),
                            value: 'center left'
                        },
                        {
                            label: __('Center Right', '--gctd--'),
                            value: 'center right'
                        },
                        {
                            label: __('Top Center', '--gctd--'),
                            value: 'top center'
                        },
                        {
                            label: __('Top Left', '--gctd--'),
                            value: 'top left'
                        },
                        {
                            label: __('Top Right', '--gctd--'),
                            value: 'top right'
                        },
                        {
                            label: __('Bottom Center', '--gctd--'),
                            value: 'bottom center'
                        },
                        {
                            label: __('Bottom Left', '--gctd--'),
                            value: 'bottom left'
                        },
                        {
                            label: __('Bottom Right', '--gctd--'),
                            value: 'bottom right'
                        },
                    ]}
                />}
            </div>
        </div>
    </>;
};

const BackgroundControl = (props) => {
    const {
        value = {},
        onValueChange,
        onStyleChange,
        options = [],
        label,
        description,
        proLabel,
        allowDeviceControl,
        type = '',
    } = props;

    const availableOptions = [
        {
            label: __('Image & Color', '--gctd--'),
            value: 'default',
            icon: <Image size={20} />,
        },
        {
            label: __('Gradient', '--gctd--'),
            value: 'gradient',
            icon: <Droplet size={20} />,
        },
        {
            label: __('Video', '--gctd--'),
            value: 'video',
            icon: <Video size={20} />,
        },
        {
            label: __('Fluid Background', '--gctd--'),
            value: 'fluid',
            icon: <Wind size={20} />,
        },
    ];

    const finalOptions = availableOptions.filter(item => {
        return options.includes(item.value);
    });

    // multi device control
    const {
        position = {},
        size = {},
        blendMode,
        fixed = {
            Desktop: false
        }
    } = value;

    const parameter = {
        value,
        onValueChange,
        onStyleChange
    };

    const deviceType = getDeviceType();

    const id = useInstanceId(BackgroundControl, 'inspector-background-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-background'}>
        <ControlHeadingSimple
            label={label}
            description={description}
            proLabel={proLabel}
            allowDeviceControl={allowDeviceControl}
        />
        <IconRadioControl
            label={'' === type ? __('Background Type', '--gctd--') : type}
            value={value.type}
            onValueChange={type => {
                if (type === null) {
                    onValueChange(undefined);
                } else {
                    onValueChange({ ...value, type });
                }
            }}
            onStyleChange={(type => onStyleChange({ ...value, type }))}
            options={finalOptions}
        />

        {value.type !== undefined && value.type === 'default' && <>
            <ColorControl
                label={__('Background Color', '--gctd--')}
                value={value.color}
                onValueChange={color => onValueChange({ ...value, color })}
                onStyleChange={color => onStyleChange({ ...value, color })}
            />
            <ImageControl
                label={__('Background Image', '--gctd--')}
                value={value.image}
                onValueChange={image => onValueChange({ ...value, image })}
                onStyleChange={image => onStyleChange({ ...value, image })}
                allowDeviceControl={true}
            />
            <SelectControl
                label={__('Background Position', '--gctd--')}
                value={value.position}
                onValueChange={position => onValueChange({ ...value, position })}
                onStyleChange={position => onStyleChange({ ...value, position })}
                allowDeviceControl={true}
                options={[
                    {
                        label: __('Default', '--gctd--'),
                        value: 'default'
                    },
                    {
                        label: __('Center center', '--gctd--'),
                        value: 'center center'
                    },
                    {
                        label: __('Center Left', '--gctd--'),
                        value: 'center left'
                    },
                    {
                        label: __('Center Right', '--gctd--'),
                        value: 'center right'
                    },
                    {
                        label: __('Top Center', '--gctd--'),
                        value: 'top center'
                    },
                    {
                        label: __('Top Left', '--gctd--'),
                        value: 'top left'
                    },
                    {
                        label: __('Top Right', '--gctd--'),
                        value: 'top right'
                    },
                    {
                        label: __('Bottom Center', '--gctd--'),
                        value: 'bottom center'
                    },
                    {
                        label: __('Bottom Left', '--gctd--'),
                        value: 'bottom left'
                    },
                    {
                        label: __('Bottom Right', '--gctd--'),
                        value: 'bottom right'
                    },
                    {
                        label: __('Custom', '--gctd--'),
                        value: 'custom'
                    },
                ]}
            />
            {position[deviceType] !== undefined && position[deviceType] === 'custom' &&
                <>
                    <SizeControl
                        label={__('X Position', '--gctd--')}
                        value={value.xposition}
                        allowDeviceControl={true}
                        onValueChange={xposition => onValueChange({ ...value, xposition })}
                        onStyleChange={xposition => onStyleChange({ ...value, xposition })}
                    />
                    <SizeControl
                        label={__('Y Position', '--gctd--')}
                        value={value.yposition}
                        allowDeviceControl={true}
                        onValueChange={yposition => onValueChange({ ...value, yposition })}
                        onStyleChange={yposition => onStyleChange({ ...value, yposition })}
                    />
                </>}
            <SelectControl
                label={__('Repeat', '--gctd--')}
                value={value.repeat}
                onValueChange={repeat => onValueChange({ ...value, repeat })}
                onStyleChange={repeat => onStyleChange({ ...value, repeat })}
                allowDeviceControl={true}
                options={[
                    {
                        label: __('Default', '--gctd--'),
                        value: 'default'
                    },
                    {
                        label: __('No repeat', '--gctd--'),
                        value: 'no-repeat'
                    },
                    {
                        label: __('Repeat', '--gctd--'),
                        value: 'repeat'
                    },
                    {
                        label: __('Repeat-x', '--gctd--'),
                        value: 'repeat-x'
                    },
                    {
                        label: __('Repeat-y', '--gctd--'),
                        value: 'repeat-y'
                    },
                ]}
            />
            <SelectControl
                label={__('Size', '--gctd--')}
                value={value.size}
                onValueChange={size => onValueChange({ ...value, size })}
                onStyleChange={size => onStyleChange({ ...value, size })}
                allowDeviceControl={true}
                options={[
                    {
                        label: __('Default', '--gctd--'),
                        value: 'default'
                    },
                    {
                        label: __('Auto', '--gctd--'),
                        value: 'auto'
                    },
                    {
                        label: __('Cover', '--gctd--'),
                        value: 'cover'
                    },
                    {
                        label: __('Contain', '--gctd--'),
                        value: 'contain'
                    },
                    {
                        label: __('Custom', '--gctd--'),
                        value: 'custom'
                    },
                ]}
            />
            {size[deviceType] !== undefined && size[deviceType] === 'custom' &&
                <>
                    <SizeControl
                        label={__('Width', '--gctd--')}
                        value={value.width}
                        allowDeviceControl={true}
                        onValueChange={width => onValueChange({ ...value, width })}
                        onStyleChange={width => onStyleChange({ ...value, width })}
                        units={{
                            px: {
                                text: 'px',
                                min: 1,
                                max: 200,
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
                            },
                            vh: {
                                text: 'vh',
                                min: 0.1,
                                max: 10,
                                step: 0.1,
                                unit: 'vh',
                            },
                        }}
                    />
                </>
            }
            <SelectControl
                label={__('Blend Mode', '--gctd--')}
                value={blendMode}
                onValueChange={blendMode => onValueChange({ ...value, blendMode })}
                onStyleChange={blendMode => onStyleChange({ ...value, blendMode })}
                allowDeviceControl={true}
                options={[
                    {
                        label: __('Normal', '--gctd--'),
                        value: 'normal'
                    },
                    {
                        label: __('Multiply', '--gctd--'),
                        value: 'multiply'
                    },
                    {
                        label: __('Screen', '--gctd--'),
                        value: 'screen'
                    },
                    {
                        label: __('Overlay', '--gctd--'),
                        value: 'overlay'
                    },
                    {
                        label: __('Darken', '--gctd--'),
                        value: 'darken'
                    },
                    {
                        label: __('Lighten', '--gctd--'),
                        value: 'lighten'
                    },
                    {
                        label: __('Color Dodge', '--gctd--'),
                        value: 'color-dodge'
                    },
                    {
                        label: __('Color Burn', '--gctd--'),
                        value: 'color-burn'
                    },
                    {
                        label: __('Hard Light', '--gctd--'),
                        value: 'hard-light'
                    },
                    {
                        label: __('Soft Light', '--gctd--'),
                        value: 'soft-light'
                    },
                    {
                        label: __('Difference', '--gctd--'),
                        value: 'difference'
                    },
                    {
                        label: __('Exclusion', '--gctd--'),
                        value: 'exclusion'
                    },
                    {
                        label: __('Hue', '--gctd--'),
                        value: 'hue'

                    },
                    {
                        label: __('Saturation', '--gctd--'),
                        value: 'saturation'
                    },
                    {
                        label: __('Color', '--gctd--'),
                        value: 'color'
                    },
                    {
                        label: __('Luminosity', '--gctd--'),
                        value: 'luminosity'
                    },
                ]}
            />
            <CheckboxControl
                label={__('Fixed Background', '--gctd--')}
                value={fixed}
                deviceValues={fixed}
                allowDeviceControl={true}
                usePreviousDevice={true}
                onValueChange={fixed => onValueChange({ ...value, fixed })}
                onStyleChange={fixed => onStyleChange({ ...value, fixed })}
            />
        </>}

        {value.type !== undefined && value.type === 'gradient' && gradientOption(parameter)}

        {value.type !== undefined && value.type === 'video' && <>
            <TextControl
                label={__('Video Link', '--gctd--')}
                value={value.videoLink}
                onValueChange={videoLink => onValueChange({ ...value, videoLink })}
                onStyleChange={videoLink => onStyleChange({ ...value, videoLink })}
                placeholder={'https://www.youtube.com/watch?v=cAH1bSq2LmI'}
            />
            <TextControl
                label={__('Start Time', '--gctd--')}
                description={__('in Seconds. For example 1:30 minutes will be 90', '--gctd--')}
                value={value.videoStartTime}
                onValueChange={videoStartTime => onValueChange({ ...value, videoStartTime })}
                onStyleChange={videoStartTime => onStyleChange({ ...value, videoStartTime })}
                placeholder={'10'}
            />
            <TextControl
                label={__('End Time', '--gctd--')}
                description={__('in Seconds. For example 1:30 minutes will be 90', '--gctd--')}
                value={value.videoEndTime}
                onValueChange={videoEndTime => onValueChange({ ...value, videoEndTime })}
                onStyleChange={videoEndTime => onStyleChange({ ...value, videoEndTime })}
                placeholder={'70'}
            />
            <CheckboxControl
                label={__('Play Once', '--gctd--')}
                value={value.videoPlayOnce}
                onValueChange={videoPlayOnce => onValueChange({ ...value, videoPlayOnce })}
                onStyleChange={videoPlayOnce => onStyleChange({ ...value, videoPlayOnce })}
            />
            <CheckboxControl
                label={__('Play On Mobile', '--gctd--')}
                value={value.videoPlayOnMobile}
                onValueChange={videoPlayOnMobile => onValueChange({ ...value, videoPlayOnMobile })}
                onStyleChange={videoPlayOnMobile => onStyleChange({ ...value, videoPlayOnMobile })}
            />
            <ImageControl
                label={__('Background Fallback', '--gctd--')}
                value={value.videoImage}
                onValueChange={videoImage => onValueChange({ ...value, videoImage })}
                onStyleChange={videoImage => onStyleChange({ ...value, videoImage })}
                allowDeviceControl={true}
            />
        </>}

        {value.type !== undefined && value.type === 'fluid' && applyFilters(
            'gutenverse.fluid.canvas.option',
            <LockedFluidBackground isOpen={value.type === 'fluid'}/>,
            parameter
        )}
    </div>;
};

export default withParentControl(BackgroundControl);
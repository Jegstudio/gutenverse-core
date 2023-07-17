
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { Droplet, Image, Video } from 'react-feather';
import { withParentControl } from 'gutenverse-core-editor/hoc';
import { CheckboxControl, ColorControl, IconRadioControl, ImageControl, SelectControl, SizeControl, TextControl, GradientControl, AngleControl } from 'gutenverse-core-editor/controls';
import { getDeviceType } from 'gutenverse-core-editor/editor-helper';

const gradientOption = (props) => {
    const { value = {}, onValueChange, onStyleChange } = props;
    return <>
        <GradientControl
            label={__('Gradient Color', 'gutenverse')}
            description={__('Drag a circle outside the box to remove it. \nYou can\'t remove if there are only two left.', 'gutenverse')}
            value={value.gradientColor}
            onValueChange={gradientColor => onValueChange({ ...value, gradientColor })}
            onStyleChange={gradientColor => onStyleChange({ ...value, gradientColor })}
        />
        <div className={'gradient-type'}>
            <div>
                <SelectControl
                    label={__('Gradient Type', 'gutenverse')}
                    value={value.gradientType}
                    onValueChange={gradientType => onValueChange({ ...value, gradientType })}
                    onStyleChange={gradientType => onStyleChange({ ...value, gradientType })}
                    options={[
                        {
                            label: __('Linear', 'gutenverse'),
                            value: 'linear'
                        },
                        {
                            label: __('Radial', 'gutenverse'),
                            value: 'radial'
                        },
                    ]}
                />
            </div>
            <div>
                {value.gradientType !== undefined && value.gradientType === 'linear' && <AngleControl
                    label={__('Angle', 'gutenverse')}
                    value={value.gradientAngle}
                    onValueChange={gradientAngle => onValueChange({ ...value, gradientAngle })}
                    onStyleChange={gradientAngle => onStyleChange({ ...value, gradientAngle })}
                />
                }
                {value.gradientType !== undefined && value.gradientType === 'radial' && <SelectControl
                    label={__('Radial Position', 'gutenverse')}
                    value={value.gradientRadial}
                    onValueChange={gradientRadial => onValueChange({ ...value, gradientRadial })}
                    onStyleChange={gradientRadial => onStyleChange({ ...value, gradientRadial })}
                    options={[
                        {
                            label: __('Center Center', 'gutenverse'),
                            value: 'center center'
                        },
                        {
                            label: __('Center Left', 'gutenverse'),
                            value: 'center left'
                        },
                        {
                            label: __('Center Right', 'gutenverse'),
                            value: 'center right'
                        },
                        {
                            label: __('Top Center', 'gutenverse'),
                            value: 'top center'
                        },
                        {
                            label: __('Top Left', 'gutenverse'),
                            value: 'top left'
                        },
                        {
                            label: __('Top Right', 'gutenverse'),
                            value: 'top right'
                        },
                        {
                            label: __('Bottom Center', 'gutenverse'),
                            value: 'bottom center'
                        },
                        {
                            label: __('Bottom Left', 'gutenverse'),
                            value: 'bottom left'
                        },
                        {
                            label: __('Bottom Right', 'gutenverse'),
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
        options = []
    } = props;

    const availableOptions = [
        {
            label: __('Image & Color', 'gutenverse'),
            value: 'default',
            icon: <Image size={20} />,
        },
        {
            label: __('Gradient', 'gutenverse'),
            value: 'gradient',
            icon: <Droplet size={20} />,
        },
        {
            label: __('Video', 'gutenverse'),
            value: 'video',
            icon: <Video size={20} />,
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
        <IconRadioControl
            label={__('Background Type', 'gutenverse')}
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
                label={__('Background Color', 'gutenverse')}
                value={value.color}
                onValueChange={color => onValueChange({ ...value, color })}
                onStyleChange={color => onStyleChange({ ...value, color })}
            />
            <ImageControl
                label={__('Background Image', 'gutenverse')}
                value={value.image}
                onValueChange={image => onValueChange({ ...value, image })}
                onStyleChange={image => onStyleChange({ ...value, image })}
                allowDeviceControl={true}
            />
            <SelectControl
                label={__('Background Position', 'gutenverse')}
                value={value.position}
                onValueChange={position => onValueChange({ ...value, position })}
                onStyleChange={position => onStyleChange({ ...value, position })}
                allowDeviceControl={true}
                options={[
                    {
                        label: __('Default', 'gutenverse'),
                        value: 'default'
                    },
                    {
                        label: __('Center center', 'gutenverse'),
                        value: 'center center'
                    },
                    {
                        label: __('Center Left', 'gutenverse'),
                        value: 'center left'
                    },
                    {
                        label: __('Center Right', 'gutenverse'),
                        value: 'center right'
                    },
                    {
                        label: __('Top Center', 'gutenverse'),
                        value: 'top center'
                    },
                    {
                        label: __('Top Left', 'gutenverse'),
                        value: 'top left'
                    },
                    {
                        label: __('Top Right', 'gutenverse'),
                        value: 'top right'
                    },
                    {
                        label: __('Bottom Center', 'gutenverse'),
                        value: 'bottom center'
                    },
                    {
                        label: __('Bottom Left', 'gutenverse'),
                        value: 'bottom left'
                    },
                    {
                        label: __('Bottom Right', 'gutenverse'),
                        value: 'bottom right'
                    },
                    {
                        label: __('Custom', 'gutenverse'),
                        value: 'custom'
                    },
                ]}
            />
            {position[deviceType] !== undefined && position[deviceType] === 'custom' &&
                <>
                    <SizeControl
                        label={__('X Position', 'gutenverse')}
                        value={value.xposition}
                        allowDeviceControl={true}
                        onValueChange={xposition => onValueChange({ ...value, xposition })}
                        onStyleChange={xposition => onStyleChange({ ...value, xposition })}
                    />
                    <SizeControl
                        label={__('Y Position', 'gutenverse')}
                        value={value.yposition}
                        allowDeviceControl={true}
                        onValueChange={yposition => onValueChange({ ...value, yposition })}
                        onStyleChange={yposition => onStyleChange({ ...value, yposition })}
                    />
                </>}
            <SelectControl
                label={__('Repeat', 'gutenverse')}
                value={value.repeat}
                onValueChange={repeat => onValueChange({ ...value, repeat })}
                onStyleChange={repeat => onStyleChange({ ...value, repeat })}
                allowDeviceControl={true}
                options={[
                    {
                        label: __('Default', 'gutenverse'),
                        value: 'default'
                    },
                    {
                        label: __('No repeat', 'gutenverse'),
                        value: 'no-repeat'
                    },
                    {
                        label: __('Repeat', 'gutenverse'),
                        value: 'repeat'
                    },
                    {
                        label: __('Repeat-x', 'gutenverse'),
                        value: 'repeat-x'
                    },
                    {
                        label: __('Repeat-y', 'gutenverse'),
                        value: 'repeat-y'
                    },
                ]}
            />
            <SelectControl
                label={__('Size', 'gutenverse')}
                value={value.size}
                onValueChange={size => onValueChange({ ...value, size })}
                onStyleChange={size => onStyleChange({ ...value, size })}
                allowDeviceControl={true}
                options={[
                    {
                        label: __('Default', 'gutenverse'),
                        value: 'default'
                    },
                    {
                        label: __('Auto', 'gutenverse'),
                        value: 'auto'
                    },
                    {
                        label: __('Cover', 'gutenverse'),
                        value: 'cover'
                    },
                    {
                        label: __('Contain', 'gutenverse'),
                        value: 'contain'
                    },
                    {
                        label: __('Custom', 'gutenverse'),
                        value: 'custom'
                    },
                ]}
            />
            {size[deviceType] !== undefined && size[deviceType] === 'custom' &&
                <>
                    <SizeControl
                        label={__('Width', 'gutenverse')}
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
                label={__('Blend Mode', 'gutenverse')}
                value={blendMode}
                onValueChange={blendMode => onValueChange({ ...value, blendMode })}
                onStyleChange={blendMode => onStyleChange({ ...value, blendMode })}
                allowDeviceControl={true}
                options={[
                    {
                        label: __('Normal', 'gutenverse'),
                        value: 'normal'
                    },
                    {
                        label: __('Multiply', 'gutenverse'),
                        value: 'multiply'
                    },
                    {
                        label: __('Screen', 'gutenverse'),
                        value: 'screen'
                    },
                    {
                        label: __('Overlay', 'gutenverse'),
                        value: 'overlay'
                    },
                    {
                        label: __('Darken', 'gutenverse'),
                        value: 'darken'
                    },
                    {
                        label: __('Lighten', 'gutenverse'),
                        value: 'lighten'
                    },
                    {
                        label: __('Color Dodge', 'gutenverse'),
                        value: 'color-dodge'
                    },
                    {
                        label: __('Color Burn', 'gutenverse'),
                        value: 'color-burn'
                    },
                    {
                        label: __('Hard Light', 'gutenverse'),
                        value: 'hard-light'
                    },
                    {
                        label: __('Soft Light', 'gutenverse'),
                        value: 'soft-light'
                    },
                    {
                        label: __('Difference', 'gutenverse'),
                        value: 'difference'
                    },
                    {
                        label: __('Exclusion', 'gutenverse'),
                        value: 'exclusion'
                    },
                    {
                        label: __('Hue', 'gutenverse'),
                        value: 'hue'

                    },
                    {
                        label: __('Saturation', 'gutenverse'),
                        value: 'saturation'
                    },
                    {
                        label: __('Color', 'gutenverse'),
                        value: 'color'
                    },
                    {
                        label: __('Luminosity', 'gutenverse'),
                        value: 'luminosity'
                    },
                ]}
            />
            <CheckboxControl
                label={__('Fixed Background', 'gutenverse')}
                value={fixed}
                deviceValues={fixed}
                allowDeviceControl={true}
                usePreviousDevice={true}
                onValueChange={fixed => onValueChange({...value, fixed})}
                onStyleChange={fixed => onStyleChange({...value, fixed})}
            />
        </>}

        {value.type !== undefined && value.type === 'gradient' && gradientOption(parameter)}

        {value.type !== undefined && value.type === 'video' && <>
            <TextControl
                label={__('Video Link', 'gutenverse')}
                value={value.videoLink}
                onValueChange={videoLink => onValueChange({ ...value, videoLink })}
                onStyleChange={videoLink => onStyleChange({ ...value, videoLink })}
                placeholder={'https://www.youtube.com/watch?v=cAH1bSq2LmI'}
            />
            <TextControl
                label={__('Start Time', 'gutenverse')}
                description={__('in Seconds. For example 1:30 minutes will be 90', 'gutenverse')}
                value={value.videoStartTime}
                onValueChange={videoStartTime => onValueChange({ ...value, videoStartTime })}
                onStyleChange={videoStartTime => onStyleChange({ ...value, videoStartTime })}
                placeholder={'10'}
            />
            <TextControl
                label={__('End Time', 'gutenverse')}
                description={__('in Seconds. For example 1:30 minutes will be 90', 'gutenverse')}
                value={value.videoEndTime}
                onValueChange={videoEndTime => onValueChange({ ...value, videoEndTime })}
                onStyleChange={videoEndTime => onStyleChange({ ...value, videoEndTime })}
                placeholder={'70'}
            />
            <CheckboxControl
                label={__('Play Once', 'gutenverse')}
                value={value.videoPlayOnce}
                onValueChange={videoPlayOnce => onValueChange({ ...value, videoPlayOnce })}
                onStyleChange={videoPlayOnce => onStyleChange({ ...value, videoPlayOnce })}
            />
            <CheckboxControl
                label={__('Play On Mobile', 'gutenverse')}
                value={value.videoPlayOnMobile}
                onValueChange={videoPlayOnMobile => onValueChange({ ...value, videoPlayOnMobile })}
                onStyleChange={videoPlayOnMobile => onStyleChange({ ...value, videoPlayOnMobile })}
            />
            <ImageControl
                label={__('Background Fallback', 'gutenverse')}
                value={value.videoImage}
                onValueChange={videoImage => onValueChange({ ...value, videoImage })}
                onStyleChange={videoImage => onStyleChange({ ...value, videoImage })}
                allowDeviceControl={true}
            />
        </>}
    </div>;
};

export default withParentControl(BackgroundControl);
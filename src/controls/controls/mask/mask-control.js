
import { useInstanceId } from '@wordpress/compose';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { ImageControl, SelectControl, SizeControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { getDeviceType } from 'gutenverse-core/editor-helper';

const MaskControl = (props) => {
    const {
        value = {},
        onValueChange,
    } = props;

    const {
        size = {},
        position = {}
    } = value;

    const deviceType = getDeviceType();
    const id = useInstanceId(MaskControl, 'inspector-mask-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-mask'}>
        <SelectControl
            label={__('Shape', '--gctd--')}
            value={value.shape}
            onValueChange={shape => onValueChange({ ...value, shape })}
            options={[
                {
                    label: __('None', '--gctd--'),
                    value: ''
                },
                {
                    label: __('Triangle', '--gctd--'),
                    value: 'triangle'
                },
                {
                    label: __('Blob', '--gctd--'),
                    value: 'blob'
                },
                {
                    label: __('Circle', '--gctd--'),
                    value: 'circle'
                },
                {
                    label: __('Custom', '--gctd--'),
                    value: 'custom'
                },
            ]}
        />
        {'custom' === value.shape && <ImageControl
            label={__('Upload SVG', '--gctd--')}
            value={value.svg}
            onValueChange={svg => onValueChange({ ...value, svg })}
        />}
        {value.shape && '' !== value.shape && <>
            <SelectControl
                label={__('Size', '--gctd--')}
                value={value.size}
                onValueChange={size => onValueChange({ ...value, size })}
                allowDeviceControl={true}
                options={[
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
                <SizeControl
                    label={__('Scale', '--gctd--')}
                    value={value.scale}
                    allowDeviceControl={true}
                    onValueChange={scale => onValueChange({ ...value, scale })}
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
                        vw: {
                            text: 'vw',
                            min: 0.1,
                            max: 10,
                            step: 0.1,
                            unit: 'vw',
                        },
                    }}
                />
            }
            <SelectControl
                label={__('Background Position', '--gctd--')}
                value={value.position}
                onValueChange={position => onValueChange({ ...value, position })}
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
                    />
                    <SizeControl
                        label={__('Y Position', '--gctd--')}
                        value={value.yposition}
                        allowDeviceControl={true}
                        onValueChange={yposition => onValueChange({ ...value, yposition })}
                    />
                </>
            }
            <SelectControl
                label={__('Repeat', '--gctd--')}
                value={value.repeat}
                onValueChange={repeat => onValueChange({ ...value, repeat })}
                allowDeviceControl={true}
                options={[
                    {
                        label: __('Repeat', '--gctd--'),
                        value: 'repeat'
                    },
                    {
                        label: __('No repeat', '--gctd--'),
                        value: 'no-repeat'
                    },
                    {
                        label: __('Repeat-x', '--gctd--'),
                        value: 'repeat-x'
                    },
                    {
                        label: __('Repeat-y', '--gctd--'),
                        value: 'repeat-y'
                    },
                    {
                        label: __('Round', '--gctd--'),
                        value: 'round'
                    },
                    {
                        label: __('Space', '--gctd--'),
                        value: 'space'
                    },
                ]}
            />
        </>}
    </div>;
};

export default compose(withParentControl)(MaskControl);
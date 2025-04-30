import { useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { ColorControl, DimensionControl, NumberControl, SelectControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { RefreshCw } from 'react-feather';
import { Tooltip } from '@wordpress/components';

const BorderControl = (props) => {
    const {
        label,
        allowDeviceControl,
        showDeviceControl = true,
        value = {},
        onValueChange,
        onLocalChange,
        description = '',
        proLabel
    } = props;

    const [active, setActive] = useState('all');

    const id = useInstanceId(BorderControl, 'inspector-borders-control');

    const clearBorder = <Tooltip text={__('Clear Border', '--gctd--')} key={'reset'}>
        <span className={'border-refresh'}>
            <RefreshCw size={14} onClick={() => {
                onValueChange(undefined);
                setActive('all');
            }} />
        </span>
    </Tooltip>;

    const checkActiveBorder = (state) => {
        return state === active ? 'active' : '';
    };

    const setActiveBorder = (state) => {
        setActive(state);
    };

    const checkFilledBorder = (position) => {
        return props?.value?.[position] ? 'filled' : '';
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-borders'}>
        <ControlHeadingSimple
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl ? allowDeviceControl : showDeviceControl}
            proLabel={proLabel}
            outLabel={clearBorder}
        />
        <div className={'control-body'}>
            <div className={'border-icons'}>
                <div>
                    <div className={`icon ${checkActiveBorder('top')} ${checkFilledBorder('top')}`} onClick={() => setActiveBorder('top')}>
                        <div className={'border-top'}></div>
                    </div>
                </div>
                <div>
                    <div className={`icon ${checkActiveBorder('left')} ${checkFilledBorder('left')}`} onClick={() => setActiveBorder('left')}>
                        <div className={'border-left'}></div>
                    </div>
                    <div className={`icon ${checkActiveBorder('all')} ${checkFilledBorder('all')}`} onClick={() => setActiveBorder('all')}>
                        <div className={'border-all'}></div>
                    </div>
                    <div className={`icon ${checkActiveBorder('right')} ${checkFilledBorder('right')}`} onClick={() => setActiveBorder('right')}>
                        <div className={'border-right'}></div>
                    </div>
                </div>
                <div>
                    <div className={`icon ${checkActiveBorder('bottom')} ${checkFilledBorder('bottom')}`} onClick={() => setActiveBorder('bottom')}>
                        <div className={'border-bottom'}></div>
                    </div>
                </div>
            </div>
            {active && <div className={'border-value'}>
                <div>
                    <label>{__('Style', '--gctd--')}</label>
                    <SelectControl
                        value={value && value[active] && value[active].type}
                        onValueChange={type => {
                            if (type === 'default' || !type) {
                                onValueChange({
                                    ...value,
                                    [`${active}`]: undefined
                                });
                            } else {
                                onValueChange({
                                    ...value,
                                    [`${active}`]: {
                                        ...value[active],
                                        type
                                    }
                                });
                            }
                        }}
                        options={[
                            {
                                label: __('Default', '--gctd--'),
                                value: 'default'
                            },
                            {
                                label: __('None', '--gctd--'),
                                value: 'none'
                            },
                            {
                                label: __('Solid', '--gctd--'),
                                value: 'solid'
                            },
                            {
                                label: __('Double', '--gctd--'),
                                value: 'double'
                            },
                            {
                                label: __('Dotted', '--gctd--'),
                                value: 'dotted'
                            },
                            {
                                label: __('Dashed', '--gctd--'),
                                value: 'dashed'
                            },
                            {
                                label: __('Groove', '--gctd--'),
                                value: 'groove'
                            },
                        ]}
                    />
                </div>
                <div>
                    <label>{__('Width', '--gctd--')}</label>
                    <NumberControl
                        min={0}
                        max={100}
                        step={1}
                        value={value && value[active] && value[active].width}
                        onValueChange={width => onValueChange({
                            ...value,
                            [`${active}`]: {
                                ...value[active],
                                width
                            }
                        })}
                    />
                </div>
                <ColorControl
                    label={__('Color', '--gctd--')}
                    value={value && value[active] && value[active].color}
                    onValueChange={color => onValueChange({
                        ...value,
                        [`${active}`]: {
                            ...value[active],
                            color
                        }
                    })}
                    onLocalChange={color => onLocalChange({
                        ...value,
                        [`${active}`]: {
                            ...value[active],
                            color
                        }
                    })}
                />
            </div>}
        </div>
        <DimensionControl
            label={__('Border Radius', '--gctd--')}
            position={['top', 'right', 'bottom', 'left']}
            units={{
                px: {
                    text: 'px',
                    unit: 'px'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                }
            }}
            value={value && value.radius}
            allowDeviceControl={true}
            onValueChange={radius => onValueChange({ ...value, radius })}
        />
    </div>;
};

export default compose(withParentControl, withDeviceControl)(BorderControl);
import {useState} from '@wordpress/element';
import {useInstanceId} from '@wordpress/compose';
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
        value = {},
        onValueChange,
        onStyleChange,
        description = '',
        proLabel
    } = props;

    const [active, setActive] = useState('all');

    const id = useInstanceId(BorderControl, 'inspector-borders-control');

    const clearBorder = <Tooltip text={__('Clear Border', '--gctd--')} key={'reset'}>
        <span className={'border-refresh'}>
            <RefreshCw size={14} onClick={() => {
                onValueChange(undefined);
                onStyleChange(undefined);
                setActive('all');
            }}/>
        </span>
    </Tooltip>;

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-borders'}>
        <ControlHeadingSimple
            id={`${id}-borders`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
            proLabel={proLabel}
            outLabel={clearBorder}
        />
        <div className={'control-body'}>
            <div className={'border-icons'}>
                <div>
                    <div className={`icon ${active === 'top' ? 'active' : ''}`} onClick={() => setActive('top')}>
                        <div className={'border-top'}></div>
                    </div>
                </div>
                <div>
                    <div className={`icon ${active === 'left' ? 'active' : ''}`} onClick={() => setActive('left')}>
                        <div className={'border-left'}></div>
                    </div>
                    <div className={`icon ${active === 'all' ? 'active' : ''}`} onClick={() => setActive('all')}>
                        <div className={'border-all'}></div>
                    </div>
                    <div className={`icon ${active === 'right' ? 'active' : ''}`} onClick={() => setActive('right')}>
                        <div className={'border-right'}></div>
                    </div>
                </div>
                <div>
                    <div className={`icon ${active === 'bottom' ? 'active' : ''}`} onClick={() => setActive('bottom')}>
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
                        onStyleChange={type => onStyleChange({
                            ...value,
                            [`${active}`]: {
                                ...value[active],
                                type
                            }
                        })}
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
                        onStyleChange={width => onStyleChange({
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
                    onStyleChange={color => onStyleChange({
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
            onValueChange={radius => onValueChange({ ...value, radius })}
            onStyleChange={radius => onStyleChange({ ...value, radius })}
        />
    </div>;
};

export default compose(withParentControl, withDeviceControl)(BorderControl);
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

    const clearBorder = <Tooltip text={__('Clear Border', 'gutenverse')} key={'reset'}>
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
                    <label>{__('Style', 'gutenverse')}</label>
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
                                label: __('Default'),
                                value: 'default'
                            },
                            {
                                label: __('None'),
                                value: 'none'
                            },
                            {
                                label: __('Solid'),
                                value: 'solid'
                            },
                            {
                                label: __('Double'),
                                value: 'double'
                            },
                            {
                                label: __('Dotted'),
                                value: 'dotted'
                            },
                            {
                                label: __('Dashed'),
                                value: 'dashed'
                            },
                            {
                                label: __('Groove'),
                                value: 'groove'
                            },
                        ]}
                    />
                </div>
                <div>
                    <label>{__('Width', 'gutenverse')}</label>
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
                    label={__('Color', 'gutenverse')}
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
            label={__('Border Radius', 'gutenverse')}
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
            onStyleChange={radius => onStyleChange({ ...value, radius })}
        />
    </div>;
};

export default compose(withParentControl, withDeviceControl)(BorderControl);
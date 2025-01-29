import { useEffect, useRef, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import ControlHeadingSimple from '../part/control-heading-simple';
import classnames from 'classnames';
import { Check, ChevronRight, Globe, RefreshCw } from 'react-feather';
import { Tooltip } from '@wordpress/components';
import { withParentControl } from 'gutenverse-core/hoc';
import { FontControl, RangeControl, SelectControl, SizeControl } from 'gutenverse-core/controls';
import { isEmptyValue, signal } from 'gutenverse-core/editor-helper';
import isEmpty from 'lodash/isEmpty';
import { IconTypographySVG } from 'gutenverse-core/icons';
import { select } from '@wordpress/data';
export { globalStyleStore } from 'gutenverse-core/store';

const VariableFontItem = (props) => {
    const { name, active, setActive, font: typography } = props;
    const { font, weight = 'auto' } = typography;

    return <div className={classnames('variable-font-item', {
        active: active
    })} onClick={() => setActive()}>
        <div className={'variable-font-item-wrapper'}>
            <div style={{ fontFamily: !isEmpty(font) && font.value, marginRight: '10px', fontWeight: '400' }}>Tt</div>
            <h3>{name}</h3>
            <span>{` • ${font ? font.value : ''}/${weight}`}</span>
        </div>
        {active && <Check size={20} />}
    </div>;
};

const EmptyVariableFont = ({ onClick }) => {
    return <div className={'variable-font-empty'}>
        <span>
            <h3>{__('Empty Variable Font', '--gctd--')}</h3>
            <div onClick={() => onClick()} className={'gutenverse-button'}>
                {__('Add Global Fonts', '--gctd--')}
            </div>
        </span>
    </div>;
};

const TypographyControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = {},
        onValueChange,
        description = '',
    } = props;

    const id = useInstanceId(TypographyControl, 'inspector-typography-control');
    const wrapperRef = useRef(null);
    const variableRef = useRef();
    const variableWrapperRef = useRef();

    const [show, setShow] = useState(false);
    const [variableFont, setVariableFont] = useState({});
    const [variableOpen, setVariableOpen] = useState(false);

    const variableFontUpdate = () => {
        const variable = select('gutenverse/global-style')?.getVariable();
        const { fonts } = variable;

        setVariableFont(fonts);
    };

    useEffect(() => {
        variableFontUpdate();
    }, []);

    const toggleShow = () => {
        setShow(display => !display);
    };

    const toggleVariableOpen = () => {
        setVariableOpen(open => !open);
    };

    const openFontDrawer = () => {
        const icon = document.getElementsByClassName('gutenverse-icon')[0];
        const parent = icon.parentElement;
        parent.click();

        setTimeout(() => {
            signal.styleDrawerSignal.dispatch('font');
        }, 100);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShow(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        function handleClickVariableOutside(event) {
            if ((variableWrapperRef.current && !variableWrapperRef.current.contains(event.target)) &&
                (variableRef.current && !variableRef.current.contains(event.target))) {
                setVariableOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickVariableOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickVariableOutside);
        };
    }, [variableWrapperRef]);

    const bodyClass = classnames('control-body', 'control-toggle-body', 'triangle', {
        'hide': !show
    });

    const toggleClass = classnames('typography-icon', {
        'active': show,
        'not-empty': !isEmptyValue(value)
    });

    const TypographyToggle = () => <div className={'control-font-wrapper'}>
        <div className={'control-font-header'}>
            <Tooltip text={__('Font Variable', '--gctd--')}>
                <div className={classnames('control-variable', {
                    active: value.type === 'variable' && value.type
                })} onClick={() => toggleVariableOpen()} ref={variableRef}>
                    <Globe size={14} />
                </div>
            </Tooltip>
            <div className={toggleClass} onClick={() => toggleShow()}>
                <IconTypographySVG />
            </div>
        </div>
    </div>;

    const onTypographyChange = data => {
        const { id, type, ...value } = data; // eslint-disable-line no-unused-vars
        onValueChange(value);
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-typography'}>
        <ControlHeadingSimple
            id={`${id}-typography`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
            outLabel={<TypographyToggle />}
        />
        {variableOpen ? <div className={'control-font-variable'} ref={variableWrapperRef}>
            <div className={'gutenverse-font-variable-header'}>
                <h2>{__('Variable Font', '--gctd--')}</h2>
                {<Tooltip text={__('Manage Variable Font', '--gctd--')}>
                    <span onClick={() => openFontDrawer()}>
                        <ChevronRight size={14} />
                    </span>
                </Tooltip>}
            </div>
            {!isEmpty(variableFont) ? <div className={classnames('gutenverse-font-variable-content', 'active')}>
                {variableFont.map(font => {
                    const { id, font: theFont } = font;
                    const props = {
                        ...font,
                        setActive: () => {
                            const value = {
                                type: 'variable',
                                id: id,
                                ...theFont
                            };
                            onValueChange(value);
                        },
                        active: value.id === id
                    };

                    return <VariableFontItem key={id} {...props} />;
                })}
            </div> : <EmptyVariableFont onClick={() => openFontDrawer()} />}
        </div> : null}
        <div className={bodyClass} ref={wrapperRef}>
            <div className={'gutenverse-control-heading'}>
                <h2>
                    {__('Typography', '--gctd--')}
                </h2>
                <Tooltip text={__('Refresh', '--gctd--')} key={'reset'}>
                    <span>
                        <RefreshCw onClick={() => {
                            onValueChange(null);
                        }} />
                    </span>
                </Tooltip>
            </div>
            {show && <>
                <FontControl
                    label={__('Font Family', '--gctd--')}
                    value={value.font}
                    onValueChange={font => onTypographyChange({ ...value, font })}
                />
                <div className={'font-value-wrapper'}>
                    <div>
                        <SizeControl
                            label={__('Size', '--gctd--')}
                            value={value.size}
                            allowDeviceControl={true}
                            hideRange={true}
                            onValueChange={size => onTypographyChange({ ...value, size })}
                        />
                        <SelectControl
                            label={__('Weight', '--gctd--')}
                            value={value.weight}
                            onValueChange={weight => onTypographyChange({ ...value, weight })}
                            options={[
                                {
                                    label: __('Default', '--gctd--'),
                                    value: '400'
                                },
                                {
                                    label: __('Normal', '--gctd--'),
                                    value: 'normal'
                                },
                                {
                                    label: __('Bold', '--gctd--'),
                                    value: 'bold'
                                },
                                {
                                    label: __('100', '--gctd--'),
                                    value: '100'
                                },
                                {
                                    label: __('200', '--gctd--'),
                                    value: '200'
                                },
                                {
                                    label: __('300', '--gctd--'),
                                    value: '300'
                                },
                                {
                                    label: __('400', '--gctd--'),
                                    value: '400'
                                },
                                {
                                    label: __('500', '--gctd--'),
                                    value: '500'
                                },
                                {
                                    label: __('600', '--gctd--'),
                                    value: '600'
                                },
                                {
                                    label: __('700', '--gctd--'),
                                    value: '700'
                                },
                                {
                                    label: __('800', '--gctd--'),
                                    value: '800'
                                },
                                {
                                    label: __('900', '--gctd--'),
                                    value: '900'
                                },
                            ]}
                        />
                        <SelectControl
                            label={__('Decoration', '--gctd--')}
                            value={value.decoration}
                            onValueChange={decoration => onTypographyChange({ ...value, decoration })}
                            options={[
                                {
                                    label: __('Default', '--gctd--'),
                                    value: 'default'
                                },
                                {
                                    label: __('Underline', '--gctd--'),
                                    value: 'underline'
                                },
                                {
                                    label: __('Overline', '--gctd--'),
                                    value: 'overline'
                                },
                                {
                                    label: __('Line Through', '--gctd--'),
                                    value: 'line-through'
                                },
                                {
                                    label: __('None', '--gctd--'),
                                    value: 'none'
                                },
                            ]}
                        />
                    </div>
                    <div>
                        <SizeControl
                            label={__('Line Height', '--gctd--')}
                            value={value.lineHeight}
                            allowDeviceControl={true}
                            hideRange={true}
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
                            }}
                            onValueChange={lineHeight => onTypographyChange({ ...value, lineHeight })}
                        />
                        <SelectControl
                            label={__('Transform', '--gctd--')}
                            value={value.transform}
                            onValueChange={transform => onTypographyChange({ ...value, transform })}
                            options={[
                                {
                                    label: __('Default', '--gctd--'),
                                    value: 'inherit'
                                },
                                {
                                    label: __('Uppercase', '--gctd--'),
                                    value: 'uppercase'
                                },
                                {
                                    label: __('Lowercase', '--gctd--'),
                                    value: 'lowercase'
                                },
                                {
                                    label: __('Capitalize', '--gctd--'),
                                    value: 'capitalize'
                                },
                                {
                                    label: __('Normal', '--gctd--'),
                                    value: 'none'
                                },
                            ]}
                        />
                        <SelectControl
                            label={__('Style', '--gctd--')}
                            value={value.style}
                            onValueChange={style => onTypographyChange({ ...value, style })}
                            options={[
                                {
                                    label: __('Default', '--gctd--'),
                                    value: 'default'
                                },
                                {
                                    label: __('Normal', '--gctd--'),
                                    value: 'normal'
                                },
                                {
                                    label: __('Italic', '--gctd--'),
                                    value: 'italic'
                                },
                                {
                                    label: __('Oblique', '--gctd--'),
                                    value: 'Oblique'
                                },
                            ]}
                        />
                    </div>
                </div>
                <RangeControl
                    label={__('Letter Spacing', '--gctd--')}
                    min={-10}
                    max={10}
                    step={0.1}
                    value={value.spacing}
                    allowDeviceControl={true}
                    onValueChange={spacing => onTypographyChange({ ...value, spacing })}
                />
            </>}
        </div>
    </div>;
};

export default withParentControl(TypographyControl);
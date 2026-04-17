import { useEffect, useRef, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import ControlHeadingSimple from '../part/control-heading-simple';
import classnames from 'classnames';
import { Check, ChevronRight, Globe, RefreshCw } from 'react-feather';
import { Tooltip } from '@wordpress/components';
import { withParentControl } from 'gutenverse-core/hoc';
import { AlertControl, FontControl, RangeControl, SelectControl, SizeControl } from 'gutenverse-core/controls';
import { isEmptyValue, signal, useGlobalStylesConfig } from 'gutenverse-core/editor-helper';
import isEmpty from 'lodash/isEmpty';
import { CloseIcon, IconInfoSVG, IconTypographySVG } from 'gutenverse-core/icons';
import { dispatch, select } from '@wordpress/data';
import { Plus } from 'react-feather';
import cryptoRandomString from 'crypto-random-string';
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
    return <div className={'variable-font-empty'} onClick={() => onClick()}>
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
        onLocalChange,
        description = '',
    } = props;

    const id = useInstanceId(TypographyControl, 'inspector-typography-control');
    const wrapperRef = useRef(null);
    const variableRef = useRef();
    const variableWrapperRef = useRef();
    const {
        addVariableFont
    } = dispatch('gutenverse/global-style');

    const [show, setShow] = useState(false);
    const [variableFont, setVariableFont] = useState({});
    const [variableOpen, setVariableOpen] = useState(false);
    const [openAddFont, setOpenAddFont] = useState(false);
    const [addCustomFont, setAddCustomFont] = useState({
        name: `${__('Variable Font', '--gctd--')}`,
        slug: ''
    });
    const [globalWarning, setGlobalWarning] = useState(false);

    const [globalWarningContent, setGlobalWarningContent] = useState({
        type: 'confirmation',
        input: '',
        content: __('Are you sure want to create a new global font?', '--gctd--')
    });

    const handleAddCustomFont = () => {
        setAddCustomFont({
            name: `${__('Variable Font', '--gctd--')}`,
            slug: ''
        });
        setOpenAddFont(prev => !prev);
    };

    const variableFontUpdate = () => {
        const variable = select('gutenverse/global-style')?.getVariable();
        let { fonts } = variable;
        if (typeof fonts === 'object') {
            fonts = Object.values(fonts);
        }
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

    const bodyClass = classnames('control-body', 'control-toggle-body', 'guten-triangle', {
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

    const onTypographyChangeLocal = data => {
        const { id, type, ...value } = data; // eslint-disable-line no-unused-vars
        onLocalChange(value);
    };

    const handleSaveFontGlobal = () => {
        let isInputDuplicate = {
            'slug': false,
            'name': false
        };
        variableFont.forEach(element => {
            if (element.id === addCustomFont?.slug) {
                isInputDuplicate.slug = true;
            }
            if (element.name === addCustomFont?.name) {
                isInputDuplicate.name = true;
            }
        });
        if (isInputDuplicate?.slug) {
            setGlobalWarningContent({
                type: 'warning',
                input: 'slug',
                content: <span>{__(' The slug already used!', '--gctd--')}</span>
            });
            setGlobalWarning(true);
            return;
        }
        if (isInputDuplicate?.name) {
            setGlobalWarningContent({
                type: 'confirmation',
                slug: 'name',
                content: <span>{__(' This name is already used in your Global Fonts. Are you sure want to create it using the same name?', '--gctd--')}</span>
            });
            setGlobalWarning(true);
            return;
        }
        handleProceedAddGlobal();
    };

    const handleProceedAddGlobal = () => {
        const key = addCustomFont.slug ? addCustomFont.slug : cryptoRandomString({ length: 6, type: 'alphanumeric' })

        const newFont = {
            id: key,
            name: addCustomFont.name,
            font: value
        };

        addVariableFont(newFont);
        variableFontUpdate();

        const newValue = {
            type: 'variable',
            id: key,
            ...value
        };
        onValueChange(newValue);

        setGlobalWarning(false);
        setOpenAddFont(false);
        setShow(false);
    }

    useEffect(() => {
        if (globalWarning) {
            setGlobalWarning(false);
            setGlobalWarningContent({
                type: 'confirmation',
                input: '',
                content: __('Are you sure want to create a new global font?', '--gctd--')
            });
        }
    }, [addCustomFont]);

    const handleCloseAddGlobal = () => {
        setOpenAddFont(false);
        setGlobalWarning(false);
        setAddCustomFont({
            name: `${__('Variable Font', '--gctd--')}`,
            slug: ''
        });
        setGlobalWarningContent({
            type: 'confirmation',
            input: '',
            content: __('Are you sure want to create a new global font?', '--gctd--')
        });
    }

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
                <div className="action-wrapper">
                    <Tooltip text={__('Add Global', '--gctd--')} key={'add-global'}>
                        <span>
                            <Plus onClick={handleAddCustomFont} />
                        </span>
                    </Tooltip>
                    <Tooltip text={__('Refresh', '--gctd--')} key={'reset'}>
                        <span>
                            <RefreshCw onClick={() => {
                                onValueChange(null);
                            }} />
                        </span>
                    </Tooltip>
                </div>
            </div>
            {show && <>
                {
                    openAddFont && <div className="add-global-popup-wrapper for-font">
                        <div className="single-variable-item-wrapper add-global-popup">
                            <div className="form-add-global">
                                <label htmlFor="global-name">{__('Global Font Label', '--gctd--')}</label>
                                <input
                                    type="text"
                                    value={addCustomFont.name}
                                    placeholder={__('Global Font Label...', '--gctd--')}
                                    onChange={(event) => {
                                        const newValue = event.target.value;

                                        setAddCustomFont(prev => {
                                            return {
                                                ...prev,
                                                name: newValue
                                            };
                                        });
                                    }}
                                    name="global-name"
                                    className="global-name"
                                />
                                <label className="global-slug-label" htmlFor="global-slug">
                                    {__('Global Font Slug', '--gctd--')}
                                    <span className="global-slug-tooltip-wrapper">
                                        <span className="global-slug-tooltip">
                                            <IconInfoSVG />
                                        </span>
                                        <span className="global-slug-tooltip-description form">
                                            {__('Used as a unique identifier. If empty, a slug will be generated automatically.', '--gctd--')}
                                        </span>
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    value={addCustomFont.slug}
                                    placeholder={__('Global Font Slug...', '--gctd--')}
                                    onChange={(event) => {
                                        const newValue = event.target.value;

                                        setAddCustomFont(prev => {
                                            return {
                                                ...prev,
                                                slug: newValue
                                            };
                                        });
                                    }}
                                    name="global-slug"
                                    className="global-name"
                                />
                            </div>
                            {
                                globalWarning && <>
                                    <AlertControl type="warning">
                                        {globalWarningContent?.content}
                                    </AlertControl>
                                </>
                            }
                            <div className="add-global-form-actions">
                                <div className="icon-close" onClick={handleCloseAddGlobal}>{__('Cancel', '--gctd--')}</div>
                                {
                                    globalWarning ? <div className={`icon-save ${globalWarningContent?.type === 'warning' ? 'disabled' : 'active'}`} onClick={() => {
                                        if (globalWarningContent?.type === 'confirmation') {
                                            handleProceedAddGlobal();
                                        }
                                    }}>{__('Proceed', '--gctd--')}</div> : <div className="icon-save" onClick={handleSaveFontGlobal}>{__('Create', '--gctd--')}</div>
                                }
                            </div>
                        </div>
                    </div>
                }
                <div className={`${openAddFont ? 'additional-margin' : ''}`}>
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
                                onLocalChange={size => onTypographyChangeLocal({ ...value, size })}
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
                                onLocalChange={lineHeight => onTypographyChangeLocal({ ...value, lineHeight })}
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
                        onLocalChange={spacing => onTypographyChangeLocal({ ...value, spacing })}
                    />
                </div>
            </>}
        </div>
    </div>;
};

export default withParentControl(TypographyControl);
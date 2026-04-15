import { useEffect, useRef, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { GutenverseColorPicker } from '../../../components';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { __ } from '@wordpress/i18n';
import { Tooltip } from '@wordpress/components';
import { RefreshCw, Globe, ChevronRight } from 'react-feather';
import { renderColor, signal, hexToRgb, getDeviceType } from 'gutenverse-core/editor-helper';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useGlobalStylesConfig } from 'gutenverse-core/editor-helper';
import { getLastSequence, rgbToHex, useSettingFallback } from 'gutenverse-core/helper';
import cryptoRandomString from 'crypto-random-string';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { get } from 'lodash';
import { Plus } from 'react-feather';
import { CloseIcon, IconInfoSVG } from 'gutenverse-core/icons';
import AlertControl from '../alert/alert-control';

const VariableColorItem = (props) => {
    const { color, active, setActive, name } = props;
    return <Tooltip text={name}>
        <div className={classnames('variable-color-item', {
            ['active']: active
        })} onClick={() => setActive()}>
            <div className={'render-color'}>
                <div style={{ backgroundColor: renderColor(color) }} />
            </div>
        </div>
    </Tooltip>;
};

const EmptyCustomColor = ({ onClick }) => {
    return <div className={'empty-variable'} onClick={onClick} >
        <span>
            <h3>{__('Empty Custom Color', '--gctd--')}</h3>
            <div>
                {__('Add Custom Color', '--gctd--')}
            </div>
        </span>
    </div>;
};

const ColorControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = allowDeviceControl ? {} : '',
        alpha = true,
        onValueChange,
        onLocalChange,
        description = '',
    } = props;

    const wrapperRef = useRef();
    const colorRef = useRef();
    const variableRef = useRef();
    const variableWrapperRef = useRef();

    const [open, setControlOpen] = useState(false);
    const [localColor, setLocalColor] = useState({});
    const [variableOpen, setVariableOpen] = useState(false);

    const defaultPalette = useSettingFallback('color.palette.default');
    const themeColors = useSettingFallback('color.palette.theme');
    const customs = useSettingFallback('color.palette.custom') ? useSettingFallback('color.palette.custom') : [];
    const [customPalette, setCustomPalette] = useState(customs);
    const [themePalette, setThemePalette] = useState(themeColors);
    const [openAddColor, setOpenAddColor] = useState(false);
    const [globalWarning, setGlobalWarning] = useState(false);

    const [addCustomColor, setAddCustomColor] = useState({
        name: `${__('Variable Color', '--gctd--')} #${getLastSequence(customPalette)}`,
        slug: ''
    });

    const [globalWarningContent, setGlobalWarningContent] = useState({
        type: 'confirmation',
        input: '',
        content: __('Are you sure want to create a new global color?', '--gctd--')
    });

    const { isUserConfigReady, userConfig, setUserConfig } = useGlobalStylesConfig();

    const handleAddCustomColor = () => {
        setAddCustomColor({
            name: `${__('Variable Color', '--gctd--')} #${getLastSequence(customPalette)}`,
            slug: ''
        });
        setOpenAddColor(prev => !prev);
    };

    const defaultColor = !isEmpty(defaultPalette) && defaultPalette.map(item => {
        return {
            id: item.slug,
            type: 'default',
            name: item.name,
            color: hexToRgb(item.color)
        };
    });

    const themeColor = !isEmpty(themePalette) && themePalette.map(item => {
        return {
            id: item.slug,
            type: 'theme',
            name: item.name,
            color: hexToRgb(item.color)
        };
    });

    const customColor = !isEmpty(customPalette) && customPalette.map(item => {
        return {
            id: item.slug,
            type: 'custom',
            name: item.name,
            color: hexToRgb(item.color)
        };
    });

    const toggleOpen = () => {
        setControlOpen(open => !open);
    };

    const toggleVariableOpen = () => {
        setVariableOpen(open => !open);
    };

    const getColorValue = (val) => {
        if (val.type === 'variable') {
            const defaultCheck = Object.keys(defaultColor).filter(key => {
                return defaultColor[key].id === val.id;
            });

            if (!isEmpty(defaultCheck) && !isEmpty(defaultColor[defaultCheck[0]])) {
                return defaultColor[defaultCheck[0]].color;
            }

            const themeCheck = Object.keys(themeColor).filter(key => {
                return themeColor[key].id === val.id;
            });

            if (!isEmpty(themeCheck) && !isEmpty(themeColor[themeCheck[0]])) {
                return themeColor[themeCheck[0]].color;
            }

            const customCheck = Object.keys(customColor).filter(key => {
                return customColor[key].id === val.id;
            });

            if (!isEmpty(customCheck) && !isEmpty(customColor[customCheck[0]])) {
                return customColor[customCheck[0]].color;
            }
        }

        return val;
    };

    const openColorDrawer = () => {
        const icon = document.getElementsByClassName('gutenverse-icon')[0];
        const parent = icon.parentElement;
        parent.click();

        setTimeout(() => {
            signal.styleDrawerSignal.dispatch('color');
        }, 100);
    };

    useEffect(() => {
        if (userConfig.settings.color && userConfig.settings.color.palette && userConfig.settings.color.palette) {
            setCustomPalette(userConfig.settings.color.palette.custom);
            setThemePalette(userConfig.settings.color.palette.theme);
        }
    }, [isUserConfigReady, userConfig]);

    useEffect(() => {
        function handleClickOutside(event) {
            if ((wrapperRef.current && !wrapperRef.current.contains(event.target)) &&
                (colorRef.current && !colorRef.current.contains(event.target))) {
                setControlOpen(false);
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

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (localColor) {
            onLocalChange(localColor);
        }
    }, [localColor]);

    const deviceType = getDeviceType();

    useEffect(() => {
        setLocalColor(value);
    }, [deviceType]);

    useEffect(() => {
        if (JSON.stringify(value) !== JSON.stringify(localColor)) {
            setLocalColor(value);
        }
    }, [value]);

    const id = useInstanceId(ColorControl, 'inspector-color-control');

    const ColorContent = <div className={'control-color-wrapper'}>
        <div className={'control-color-header'}>
            <Tooltip text={__('Color Variable', '--gctd--')}>
                <div className={classnames('control-variable', {
                    active: value.type === 'variable' && value.type
                })} onClick={() => toggleVariableOpen()} ref={variableRef}>
                    <Globe size={14} />
                </div>
            </Tooltip>
            <div className={'control-color'} onClick={() => toggleOpen()} ref={colorRef}>
                <div style={{ backgroundColor: renderColor(getColorValue(localColor)) }} />
            </div>
        </div>
    </div>;

    const isKebabCase = (str) => {
        return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(str);
    };
    const toKebabCase = (str) => {
        if (isKebabCase(str)) return str;
        return str
            .match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|\d+/g) // split into meaningful parts
            .map(part => part.toLowerCase())
            .join('-');
    };

    const handleSaveColorGlobal = () => {
        if (value?.type === 'variable') {
            setGlobalWarningContent({
                type: 'warning',
                content: <span>{__(' Select the color. It\'s already using global color.', '--gctd--')}</span>
            });
            setGlobalWarning(true);
            return;
        }
        let isInputDuplicate = {
            'color': false,
            'slug': false,
            'name': false
        };
        customPalette.forEach(element => {
            if (element.slug === addCustomColor?.slug) {
                isInputDuplicate.slug = true;
            }
            if (element.name === addCustomColor?.name) {
                isInputDuplicate.name = true;
            }
            if (element.color === rgbToHex(value)) {
                isInputDuplicate.color = true;
            }
        });
        if (isInputDuplicate?.slug) {
            setGlobalWarningContent({
                type: 'warning',
                input: 'slug',
                content: <span>{__(' This slug already used!', '--gctd--')}</span>
            });
            setGlobalWarning(true);
            return;
        }
        if (isInputDuplicate?.name) {
            setGlobalWarningContent({
                type: 'confirmation',
                input: 'name',
                content: <span>{__(' This name is already used in your Global Colors. Are you sure want to create it using the same name?', '--gctd--')}</span>
            });
            setGlobalWarning(true);
            return;
        }
        if (isInputDuplicate?.color) {
            setGlobalWarningContent({
                type: 'confirmation',
                input: '',
                content: <span>{__(' This color is already available in your Global Colors. Are you sure want to create it again?', '--gctd--')}</span>
            });
            setGlobalWarning(true);
            return;
        }
        handleProceedAddGlobal();
    };

    useEffect(() => {
        if(globalWarning){
            setGlobalWarning(false);
            setGlobalWarningContent({
                type: 'confirmation',
                input: '',
                content: __('Are you sure want to create a new global color?', '--gctd--')
            });
        }
    },[addCustomColor]);

    const handleProceedAddGlobal = () => {
        const key = toKebabCase(
            addCustomColor.slug ? addCustomColor.slug : cryptoRandomString({ length: 6, type: 'alphanumeric' })
        );

        const newColor = {
            key,
            id: key,
            slug: key,
            type: 'custom',
            name: addCustomColor.name,
            color: value
        };

        setUserConfig((currentConfig) => {
            const newUserConfig = cloneDeep(currentConfig);
            const pathToSet = 'settings.color.palette.custom';

            // Get current palette directly from userConfig
            const existingPalette = get(newUserConfig, pathToSet, []) || [];

            const updatedPalette = [
                ...existingPalette,
                {
                    ...newColor,
                    color: rgbToHex(newColor.color)
                }
            ];

            set(newUserConfig, pathToSet, updatedPalette);

            return newUserConfig;
        });

        // Update local state AFTER (no stale usage)
        setCustomPalette(prev => [...prev, newColor]);
        const newValue = {
            type: 'variable',
            id: key
        };
        setLocalColor(newValue);
        onValueChange(newValue);

        setGlobalWarning(false);
        setOpenAddColor(false);
        setControlOpen(false);
    };

    const handleCloseAddGlobal = () => {
        setOpenAddColor(false);
        setGlobalWarning(false);
        setAddCustomColor({
            name: `${__('Variable Color', '--gctd--')} #${getLastSequence(customPalette)}`,
            slug: ''
        });
        setGlobalWarningContent({
            type: 'confirmation',
            input: '',
            content: __('Are you sure want to create a new global color?', '--gctd--')
        });
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-color'}>
        <ControlHeadingSimple
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
            outLabel={ColorContent}
        />
        {variableOpen ? <div className={'control-color-variable'} ref={variableWrapperRef}>
            <div className={'gutenverse-color-variable-header'}>
                <h2>{__('Variable Color', '--gctd--')}</h2>
                <Tooltip text={__('Manage Variable Color', '--gctd--')}>
                    <span onClick={() => openColorDrawer()}>
                        <ChevronRight size={14} />
                    </span>
                </Tooltip>
            </div>
            <div className={'gutenverse-color-variable-body'}>
                <h4>{__('Custom Colors', '--gctd--')}</h4>
                <div className={classnames('active', 'gutenverse-color-variable-content')}>
                    {isEmpty(customColor) ? <EmptyCustomColor onClick={openColorDrawer} /> : customColor.map(color => {
                        const { id } = color;
                        const props = {
                            ...color,
                            setActive: () => {
                                const value = {
                                    type: 'variable',
                                    id: id
                                };
                                setLocalColor(value);
                                onValueChange(value);
                            },
                            active: localColor.id === id
                        };

                        return <VariableColorItem key={id} {...props} />;
                    })}
                </div>
                {!isEmpty(themeColor) && <>
                    <h4>{__('Theme Colors', '--gctd--')}</h4>
                    <div className={classnames('active', 'gutenverse-color-variable-content')}>
                        {themeColor.map(color => {
                            const { id } = color;
                            const props = {
                                ...color,
                                setActive: () => {
                                    const value = {
                                        type: 'variable',
                                        id
                                    };
                                    setLocalColor(value);
                                    onValueChange(value);
                                },
                                active: localColor.id === id
                            };

                            return <VariableColorItem key={id} {...props} />;
                        })}
                    </div>
                </>}
                {<>
                    <h4>{__('Default Colors', '--gctd--')}</h4>
                    <div className={classnames('active', 'gutenverse-color-variable-content')}>
                        {defaultColor.map(color => {
                            const { id } = color;
                            const props = {
                                ...color,
                                setActive: () => {
                                    const value = {
                                        type: 'variable',
                                        id
                                    };
                                    setLocalColor(value);
                                    onValueChange(value);
                                },
                                active: localColor.id === id
                            };

                            return <VariableColorItem key={id} {...props} />;
                        })}
                    </div>
                </>}
            </div>
        </div> : null}
        {open ? <div className={'control-color-display'} ref={wrapperRef}>
            <div className={'gutenverse-control-heading'}>
                <h2>
                    {__('Color Picker', '--gctd--')}
                </h2>
                <div className="action-wrapper">
                    <Tooltip text={__('Add Global', '--gctd--')} key={'add-global'}>
                        <span>
                            <Plus onClick={handleAddCustomColor} />
                        </span>
                    </Tooltip>
                    <Tooltip text={__('Refresh', '--gctd--')} key={'reset'}>
                        <span>
                            <RefreshCw onClick={() => {
                                onValueChange(allowDeviceControl ? {} : '');
                                setLocalColor(allowDeviceControl ? {} : '');
                            }} />
                        </span>
                    </Tooltip>
                </div>
            </div>
            {
                openAddColor && <div className="add-global-popup-wrapper">
                    <div className="single-variable-item-wrapper add-global-popup">
                        <div className="form-add-global">
                            <label htmlFor="global-name">{__('Global Label', '--gctd--')}</label>
                            <input
                                type="text"
                                value={addCustomColor.name}
                                placeholder={__('Global Label...', '--gctd--')}
                                onChange={(event) => {
                                    const newValue = event.target.value;

                                    setAddCustomColor(prev => {
                                        return {
                                            ...prev,
                                            name: newValue
                                        };
                                    });
                                }}
                                name="global-name"
                                className={`global-name ${globalWarningContent?.input === 'name' ? 'duplicate' : ''}`}
                            />
                            <label className="global-slug-label" htmlFor="global-slug">
                                {__('Global Slug', '--gctd--')}
                                <Tooltip text={
                                    <span className="global-slug-tooltip-description">
                                        {__('Used as a unique identifier. If empty, a slug will be generated automatically.', '--gctd--')}
                                    </span>
                                }>
                                    <span className="global-slug-tooltip">
                                        <IconInfoSVG />
                                    </span>
                                </Tooltip>
                            </label>
                            <input
                                id="global-slug"
                                type="text"
                                value={addCustomColor.slug}
                                placeholder={__('Global Slug...', '--gctd--')}
                                onChange={(event) => {
                                    const newValue = event.target.value;

                                    setAddCustomColor(prev => {
                                        return {
                                            ...prev,
                                            slug: newValue
                                        };
                                    });
                                }}
                                name="global-slug"
                                className={`global-name ${globalWarningContent?.input === 'slug' ? 'duplicate' : ''}`}
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
                                }}>{__('Proceed', '--gctd--')}</div> : <div className="icon-save" onClick={handleSaveColorGlobal}>{__('Create', '--gctd--')}</div>
                            }
                        </div>
                    </div>
                </div>
            }
            <GutenverseColorPicker
                disableAlpha={!alpha}
                classNames={`${openAddColor ? 'additional-margin' : ''}`}
                color={getColorValue(localColor)}
                onChange={color => {
                    setLocalColor(color.rgb);
                }}
                onChangeComplete={(color) => {
                    onValueChange(color.rgb);
                }}
            />
        </div> : null}
    </div>;
};

export default compose(withParentControl, withDeviceControl)(ColorControl);

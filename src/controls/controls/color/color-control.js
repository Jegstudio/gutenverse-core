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

    const [addCustomColor, setAddCustomColor] = useState({
        name: `${__('Variable Color', '--gctd--')} #${getLastSequence(customPalette)}`,
        color: '',
        slug: ''
    });

    const { isUserConfigReady, userConfig, setUserConfig } = useGlobalStylesConfig();

    const handleAddCustomColor = () => {
        setAddCustomColor({
            name: `${__('Variable Color', '--gctd--')} #${getLastSequence(customPalette)}`,
            color: '',
            slug: ''
        });
        setOpenAddColor(true);
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
        const key = toKebabCase(
            addCustomColor.slug ? addCustomColor.slug : cryptoRandomString({ length: 6, type: 'alphanumeric' })
        );

        const newColor = {
            key,
            id: key,
            slug: key,
            type: 'custom',
            name: addCustomColor.name,
            color: addCustomColor.color
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
                    {!isEmpty(customColor) && customColor.map(color => {
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
                    <div className="variable-color-item add-global-button" >
                        <div className="render-color" onClick={handleAddCustomColor}>
                            <div className="add-global">+</div>
                        </div>
                    </div>
                </div>
                {
                    openAddColor && <div className="single-variable-item-wrapper add-color-popup">
                        <div className="form-add-global-color">
                            <div className="add-color-input-wrapper">
                                <div className="variable-color-item">
                                    <div className={'render-color'}>
                                        <div style={{ backgroundColor: renderColor(addCustomColor?.color) }} />
                                    </div>
                                </div>
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
                                    className="color-name"
                                />
                            </div>
                            <ChromePicker
                                color={addCustomColor.color}
                                onChange={color => {
                                    setAddCustomColor(prev => {
                                        return {
                                            ...prev,
                                            color: color.rgb
                                        };
                                    });
                                }}
                                onChangeComplete={(color) => {
                                    setAddCustomColor(prev => {
                                        return {
                                            ...prev,
                                            color: color.rgb
                                        };
                                    });
                                }}
                            />
                            <input
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
                                className="color-name"
                            />
                        </div>
                        <div className="add-color-actions">
                            <div className="icon-close" onClick={() => setOpenAddColor(false)}>{__('Cancel', '--gctd--')}</div>
                            <div className="icon-save" onClick={handleSaveColorGlobal}>{__('Save', '--gctd--')}</div>
                        </div>
                    </div>
                }

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
                <Tooltip text={__('Refresh', '--gctd--')} key={'reset'}>
                    <span>
                        <RefreshCw onClick={() => {
                            onValueChange(allowDeviceControl ? {} : '');
                            setLocalColor(allowDeviceControl ? {} : '');
                        }} />
                    </span>
                </Tooltip>
            </div>
            <GutenverseColorPicker
                disableAlpha={!alpha}
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
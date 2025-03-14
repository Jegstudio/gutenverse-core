import cryptoRandomString from 'crypto-random-string';
import { useEffect, useRef, useState } from '@wordpress/element';
import { ChromePicker } from 'react-color';
import { Edit, Edit2, Trash } from 'react-feather';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import { getLastSequence, rgbToHex, useSettingFallback } from 'gutenverse-core/helper';
import { hexToRgb, useGlobalStylesConfig, renderColor } from 'gutenverse-core/editor-helper';
import { IconCloseSVG } from 'gutenverse-core/icons';
import { Prompt, PromptContent, PromptHeader } from 'gutenverse-core/components';

const ThePrompt = ({ openPopup, closePopup, deleteColor, value }) => {
    return openPopup ? <Prompt closePrompt={() => closePopup()} className={'variable-color'}>
        <PromptHeader>
            <>
                <h3>{__('Delete Color Variable', '--gctd--')}</h3>
                <div className={'gutenverse-close'} onClick={() => closePopup()}>
                    <IconCloseSVG size={20} />
                </div>
            </>
        </PromptHeader>
        <PromptContent>
            <>
                <p>{__('You are about to delete one of your Color Variable. If you are assign this color variable to blocks, it will lost the color.', '--gctd--')}</p>
                <div className={'prompt-buttons'}>
                    <div className={'prompt-button cancel'} onClick={() => closePopup()}>
                        {__('Cancel', '--gctd--')}
                    </div>
                    <div className={'prompt-button submit'} onClick={() => deleteColor(value.id)}>
                        {__('Delete', '--gctd--')}
                    </div>
                </div>
            </>
        </PromptContent>
    </Prompt> : null;
};

const SingleVariableColor = ({ value, updateColor, deleteColor, showDelete }) => {
    const [open, setControlOpen] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [color, setColor] = useState(value);

    const wrapperRef = useRef();
    const colorRef = useRef();

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

    const toggleOpen = () => {
        setControlOpen(open => !open);
    };

    const editName = (e) => {
        updateColor({
            ...value,
            name: e.target.value
        });
    };

    return <div className={classnames('gutenverse-control-wrapper', 'single-variable-color', 'gutenverse-control-color')}>
        <div className={'single-variable-color-wrapper'}>
            <div className={'single-variable-item-wrapper'}>
                <div className={'control-color'} onClick={() => toggleOpen()} ref={colorRef}>
                    <div style={{ backgroundColor: renderColor(color.color) }} />
                </div>
                <input type="text" value={value.name} onChange={editName} className={'color-name'} />
            </div>
            {showDelete ? <div className={'color-delete'} onClick={() => setOpenPopup(true)}>
                <Trash size={12} />
            </div> : <div className={'color-delete'} onClick={() => toggleOpen()}>
                <Edit2 size={12} />
            </div>}
        </div>
        {open ? <div className={'control-color-display'} ref={wrapperRef}>
            <div className={'gutenverse-control-heading'}>
                <h2>
                    {__('Color Picker', '--gctd--')}
                </h2>
            </div>
            <ChromePicker
                color={color.color}
                onChange={color => {
                    setColor({
                        ...value,
                        color: color.rgb
                    });
                }}
                onChangeComplete={(color) => {
                    updateColor({
                        ...value,
                        color: color.rgb
                    });
                }}
            />
        </div> : null}
        {showDelete && <ThePrompt openPopup={openPopup} closePopup={() => setOpenPopup(false)} deleteColor={deleteColor} value={value} />}
    </div>;
};

const ThemeVariableColor = ({ value }) => {
    return <div className={classnames('gutenverse-control-wrapper', 'single-variable-color', 'gutenverse-control-color')}>
        <div className={'single-variable-color-wrapper'}>
            <div className={'single-variable-item-wrapper'} style={{ width: '100%' }}>
                <div className={'control-color'}>
                    <div style={{ backgroundColor: renderColor(value.color) }} />
                </div>
                <span className={'color-name'}>{value.name}</span>
            </div>
        </div>
    </div>;
};

const GlobalVariableColor = () => {
    const defaultPalette = useSettingFallback('color.palette.default');
    const themePalette = useSettingFallback('color.palette.theme');

    const { userConfig, setUserConfig } = useGlobalStylesConfig();

    const customs = userConfig.settings.color && userConfig.settings.color.palette && userConfig.settings.color.palette.custom;
    const [customPalette, setCustomPalette] = useState(customs ? customs : []);
    const [themesPalette, setThemePalette] = useState(themePalette ? themePalette : []);

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

    const customColor = customPalette.map(item => {
        return {
            id: item.slug,
            type: 'custom',
            name: item.name,
            color: hexToRgb(item.color)
        };
    });

    const addVariableColor = () => {
        const name = `${__('Variable Color', '--gctd--')} #${getLastSequence(customColor)}`;

        const newColor = {
            slug: cryptoRandomString({ length: 6, type: 'alphanumeric' }),
            name: name,
            color: '#fff'
        };

        setCustomPalette([
            ...customPalette,
            newColor
        ]);
    };

    const updateVariableColor = (index, value) => {
        const { id: slug, name, color } = value;
        const updated = {
            slug,
            name,
            color: rgbToHex(color)
        };

        const updatedCustoms = [...customPalette];
        updatedCustoms[index] = updated;
        setCustomPalette(updatedCustoms);
    };

    const deleteVariableColor = (index) => {
        const updatedCustoms = customPalette.filter((custom, idx) => index !== idx);

        setCustomPalette([...updatedCustoms]);
    };

    const updateThemesColor = (index, value) => {
        const { id: slug, name, color } = value;
        const updated = {
            slug,
            name,
            color: rgbToHex(color)
        };

        const updatedCustoms = [...themePalette];
        updatedCustoms[index] = updated;
        setThemePalette(updatedCustoms);
    };

    useEffect(() => {
        setUserConfig((currentConfig) => {
            const newUserConfig = cloneDeep(currentConfig);
            const pathToSet = 'settings.color.palette.custom';

            set(newUserConfig, pathToSet, customPalette);
            return newUserConfig;
        });
    }, [customPalette]);

    useEffect(() => {
        setUserConfig((currentConfig) => {
            const newUserConfig = cloneDeep(currentConfig);
            const pathToSet = 'settings.color.palette.theme';

            set(newUserConfig, pathToSet, themesPalette);
            return newUserConfig;
        });
    }, [themesPalette]);

    // const [importColors, setImportColors] = useState('');

    // const onImportColors = () => {
    //     setUserConfig((currentConfig) => {
    //         const newUserConfig = cloneDeep(currentConfig);
    //         const pathToSet = 'settings.color.palette.custom';
    //         const newData = JSON.parse(importColors);

    //         set(newUserConfig, pathToSet, newData);

    //         return newUserConfig;
    //     });
    // };

    return <>
        {<div className={'color-variable-wrapper'}>
            <h4 style={{ marginTop: 0 }}>{__('Custom Colors', '--gctd--')}</h4>
            {!isEmpty(customColor) && customColor.map((value, index) => {
                return <SingleVariableColor
                    key={value.id}
                    value={value}
                    updateColor={(value) => updateVariableColor(index, value)}
                    deleteColor={() => deleteVariableColor(index)}
                    showDelete={true}
                />;
            })}
            {isEmpty(customColor) && <div className="empty-variable" onClick={() => addVariableColor()}>
                {__('Empty Variable Color', '--gctd--')}
            </div>}
            {<div className={'color-variable-add'}>
                <div onClick={() => addVariableColor()}>
                    {__('Add Color', '--gctd--')}
                </div>
            </div>}
            <div style={{ display: 'block', height: '10px' }}></div>
            <h4>{__('Theme Colors', '--gctd--')}</h4>
            {!isEmpty(themeColor) && themeColor.map((value, index) => {
                return <SingleVariableColor
                    key={value.slug}
                    value={value}
                    updateColor={(value) => updateThemesColor(index, value)}
                    deleteColor={() => { }}
                    showDelete={false}
                />;
            })}
            <h4>{__('Default Colors', '--gctd--')}</h4>
            {!isEmpty(defaultColor) && defaultColor.map(value => <ThemeVariableColor key={value.slug} value={value} allowChange={false} userConfig={userConfig} />)}
            {/* {isTools && <div className="guten-dev-tools">
                <textarea id="global-colors" name="global-colors" rows="4" cols="50" value={importColors} onChange={e => setImportColors(e.target.value)}>
                </textarea>
                <div className={'variable-import'}>
                    <div onClick={() => onImportColors()}>
                        {__('Import Colors', '--gctd--')}
                    </div>
                </div>
            </div>} */}
        </div>}
    </>;
};

export default GlobalVariableColor;
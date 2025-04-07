import cryptoRandomString from 'crypto-random-string';
import { createPortal, useEffect, useRef, useState } from '@wordpress/element';
import { ChromePicker } from 'react-color';
import { Edit2, Trash } from 'react-feather';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import { getLastSequence, rgbToHex, useSettingFallback } from 'gutenverse-core/helper';
import { hexToRgb, useGlobalStylesConfig, renderColor } from 'gutenverse-core/editor-helper';
import { IconCloseSVG } from 'gutenverse-core/icons';
import { Prompt, PromptContent, PromptHeader } from 'gutenverse-core/components';
import { Tooltip } from '@wordpress/components';
import { Notice } from 'gutenverse-core/components';

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

const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
};

const SingleVariableColor = ({ value, updateColor, deleteColor, showDelete, showEditSlug = false, checkDoubleSlug = () => { } }) => {
    const [open, setControlOpen] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [color, setColor] = useState(value);
    const [slugLock, setSlugLock] = useState(true);
    const [editorWarn, setEditorWarn] = useState(false);

    const wrapperRef = useRef();
    const colorRef = useRef();

    const toggleOpen = () => {
        setControlOpen(open => !open);
    };

    const editName = (e) => {
        updateColor({
            ...value,
            name: e.target.value
        });
    };

    const editSlug = (e) => {
        let slug = slugify(e.target.value);
        slug = checkDoubleSlug(slug);
        updateColor({
            ...value,
            id: slug
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
        {open ? <div className={'gutenverse-variable-detail-wrapper'}>
            <div className={'control-color-display'} ref={wrapperRef}>
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
            </div>
            {showEditSlug && <div className={'gutenverse-variable-slug'}>
                <div className={'gutenverse-control-heading'}>
                    <h2>
                        {__('Color Slug', '--gctd--')}
                    </h2>
                </div>
                <div className={'variable-input-wrapper'}>
                    {slugLock ? <>
                        <div className={'variable-input'}>
                            <input type="text" value={value.id} readOnly />
                        </div>
                        <div className={'variable-input-lock'} onClick={() => setEditorWarn(true)}>
                            <Tooltip placement="bottom" text={__('Unlock to edit slug', '--gctd--')}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.83268 5.83464C5.83268 3.53297 7.69768 1.66797 9.99935 1.66797C12.301 1.66797 14.166 3.53297 14.166 5.83464V8.33464H14.4993C15.2327 8.33464 15.8327 8.93464 15.8327 9.66797V15.5013C15.8327 16.6013 14.9327 17.5013 13.8327 17.5013H6.16602C5.06602 17.5013 4.16602 16.6013 4.16602 15.5013V9.66797C4.16602 8.93464 4.76602 8.33464 5.49935 8.33464H5.83268V5.83464ZM12.4993 5.83464V8.33464H7.49935V5.83464C7.49935 4.45297 8.61768 3.33464 9.99935 3.33464C11.381 3.33464 12.4993 4.45297 12.4993 5.83464ZM9.99935 10.2096C9.66796 10.2093 9.34634 10.3218 9.08746 10.5287C8.82858 10.7356 8.64787 11.0244 8.5751 11.3477C8.50232 11.671 8.54183 12.0095 8.68711 12.3073C8.83239 12.6051 9.07478 12.8446 9.37435 12.9863V15.0013C9.37435 15.1671 9.4402 15.326 9.55741 15.4432C9.67462 15.5605 9.83359 15.6263 9.99935 15.6263C10.1651 15.6263 10.3241 15.5605 10.4413 15.4432C10.5585 15.326 10.6243 15.1671 10.6243 15.0013V12.9863C10.9239 12.8446 11.1663 12.6051 11.3116 12.3073C11.4569 12.0095 11.4964 11.671 11.4236 11.3477C11.3508 11.0244 11.1701 10.7356 10.9112 10.5287C10.6524 10.3218 10.3307 10.2093 9.99935 10.2096Z" fill="#FFB200" />
                                </svg>
                            </Tooltip>
                        </div>
                    </> : <>
                        <div className={'variable-input'}>
                            <input type="text" value={value.id} onChange={e => editSlug(e)} />
                        </div>
                        <div className={'variable-input-lock'} onClick={() => setSlugLock(true)}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.83268 5.83258C5.83128 4.81744 6.20053 3.8367 6.87108 3.07455C7.54164 2.31239 8.46736 1.82125 9.47442 1.69336C10.4815 1.56547 11.5006 1.80963 12.3404 2.37998C13.1801 2.95033 13.7828 3.80764 14.0352 4.79091C14.0904 5.00497 14.0584 5.2322 13.9461 5.42263C13.8338 5.61305 13.6505 5.75108 13.4364 5.80633C13.2224 5.86158 12.9951 5.82954 12.8047 5.71725C12.6143 5.60497 12.4763 5.42163 12.421 5.20758C12.2697 4.61747 11.9081 4.1029 11.4042 3.76056C10.9003 3.41822 10.2887 3.27165 9.6844 3.3484C9.08005 3.42514 8.52452 3.71992 8.12218 4.17735C7.71983 4.63478 7.49835 5.22338 7.49935 5.83258V8.33258H14.4993C15.2327 8.33258 15.8327 8.93258 15.8327 9.66591V15.4992C15.8327 16.5992 14.9327 17.4992 13.8327 17.4992H6.16602C5.06602 17.4992 4.16602 16.5992 4.16602 15.4992V9.66591C4.16602 8.93258 4.76602 8.33258 5.49935 8.33258H5.83268V5.83258ZM9.99935 10.2076C9.66796 10.2072 9.34634 10.3198 9.08746 10.5266C8.82858 10.7335 8.64787 11.0224 8.5751 11.3457C8.50232 11.669 8.54183 12.0074 8.68711 12.3052C8.83239 12.6031 9.07478 12.8426 9.37435 12.9842V14.9992C9.37435 15.165 9.4402 15.324 9.55741 15.4412C9.67462 15.5584 9.83359 15.6242 9.99935 15.6242C10.1651 15.6242 10.3241 15.5584 10.4413 15.4412C10.5585 15.324 10.6243 15.165 10.6243 14.9992V12.9842C10.9239 12.8426 11.1663 12.6031 11.3116 12.3052C11.4569 12.0074 11.4964 11.669 11.4236 11.3457C11.3508 11.0224 11.1701 10.7335 10.9112 10.5266C10.6524 10.3198 10.3307 10.2072 9.99935 10.2076Z" fill="#12B76A" />
                            </svg>
                        </div>
                    </>}
                </div>
            </div>}
        </div> : null}
        {showDelete && <ThePrompt openPopup={openPopup} closePopup={() => setOpenPopup(false)} deleteColor={deleteColor} value={value} />}
        {editorWarn && createPortal(<Notice
            icon={<svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.83268 5.83464C5.83268 3.53297 7.69768 1.66797 9.99935 1.66797C12.301 1.66797 14.166 3.53297 14.166 5.83464V8.33464H14.4993C15.2327 8.33464 15.8327 8.93464 15.8327 9.66797V15.5013C15.8327 16.6013 14.9327 17.5013 13.8327 17.5013H6.16602C5.06602 17.5013 4.16602 16.6013 4.16602 15.5013V9.66797C4.16602 8.93464 4.76602 8.33464 5.49935 8.33464H5.83268V5.83464ZM12.4993 5.83464V8.33464H7.49935V5.83464C7.49935 4.45297 8.61768 3.33464 9.99935 3.33464C11.381 3.33464 12.4993 4.45297 12.4993 5.83464ZM9.99935 10.2096C9.66796 10.2093 9.34634 10.3218 9.08746 10.5287C8.82858 10.7356 8.64787 11.0244 8.5751 11.3477C8.50232 11.671 8.54183 12.0095 8.68711 12.3073C8.83239 12.6051 9.07478 12.8446 9.37435 12.9863V15.0013C9.37435 15.1671 9.4402 15.326 9.55741 15.4432C9.67462 15.5605 9.83359 15.6263 9.99935 15.6263C10.1651 15.6263 10.3241 15.5605 10.4413 15.4432C10.5585 15.326 10.6243 15.1671 10.6243 15.0013V12.9863C10.9239 12.8446 11.1663 12.6051 11.3116 12.3073C11.4569 12.0095 11.4964 11.671 11.4236 11.3477C11.3508 11.0244 11.1701 10.7356 10.9112 10.5287C10.6524 10.3218 10.3307 10.2093 9.99935 10.2096Z" fill="#FFB200" />
            </svg>}
            title={__('Color Slug Edit is Locked', '--gctd--')}
            description={__('Warning: All blocks assigned to this will lose their color. Only unlock if you understand the consequences', '--gctd--')}
            buttonText={__('Unlock Slug', '--gctd--')}
            onCLick={() => {
                setSlugLock(false);
                setEditorWarn(false);
            }}
            onClose={() => setEditorWarn(false)}
            scheme="danger"
        />, document.getElementById('gutenverse-root'))}
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

    const checkDoubleSlug = (slug, idx, colors) => {
        let doubleFlag = false;
        colors.forEach((item, index) => {
            if (index !== idx && item.slug === slug) {
                doubleFlag = true;
            }
        });

        if (doubleFlag) {
            const newSlug = `${slug}-${Math.floor(Math.random() * 100)}`;
            return checkDoubleSlug(newSlug, idx, colors);
        } else {
            return slug;
        }
    };

    return <>
        {<div className={'color-variable-wrapper'}>
            <h4 style={{ marginTop: 0 }}>{__('Custom Colors', '--gctd--')}</h4>
            {!isEmpty(customColor) && customColor.map((value, index) => {
                return <SingleVariableColor
                    key={index}
                    value={value}
                    updateColor={(value) => updateVariableColor(index, value)}
                    deleteColor={() => deleteVariableColor(index)}
                    showDelete={true}
                    showEditSlug={true}
                    checkDoubleSlug={slug => checkDoubleSlug(slug, index, customPalette)}
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
        </div>}
    </>;
};

export default GlobalVariableColor;
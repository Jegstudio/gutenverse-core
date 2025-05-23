import cryptoRandomString from 'crypto-random-string';
import { createPortal, useEffect, useRef, useState } from '@wordpress/element';
import { ChromePicker } from 'react-color';
import { Edit2, Trash } from 'react-feather';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import { getLastSequence, rgbToHex, slugify, useSettingFallback } from 'gutenverse-core/helper';
import { hexToRgb, useGlobalStylesConfig, renderColor } from 'gutenverse-core/editor-helper';
import { Tooltip } from '@wordpress/components';
import Notice from '../notice';

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
        {editorWarn && createPortal(<Notice
            icon={<svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.83268 5.83464C5.83268 3.53297 7.69768 1.66797 9.99935 1.66797C12.301 1.66797 14.166 3.53297 14.166 5.83464V8.33464H14.4993C15.2327 8.33464 15.8327 8.93464 15.8327 9.66797V15.5013C15.8327 16.6013 14.9327 17.5013 13.8327 17.5013H6.16602C5.06602 17.5013 4.16602 16.6013 4.16602 15.5013V9.66797C4.16602 8.93464 4.76602 8.33464 5.49935 8.33464H5.83268V5.83464ZM12.4993 5.83464V8.33464H7.49935V5.83464C7.49935 4.45297 8.61768 3.33464 9.99935 3.33464C11.381 3.33464 12.4993 4.45297 12.4993 5.83464ZM9.99935 10.2096C9.66796 10.2093 9.34634 10.3218 9.08746 10.5287C8.82858 10.7356 8.64787 11.0244 8.5751 11.3477C8.50232 11.671 8.54183 12.0095 8.68711 12.3073C8.83239 12.6051 9.07478 12.8446 9.37435 12.9863V15.0013C9.37435 15.1671 9.4402 15.326 9.55741 15.4432C9.67462 15.5605 9.83359 15.6263 9.99935 15.6263C10.1651 15.6263 10.3241 15.5605 10.4413 15.4432C10.5585 15.326 10.6243 15.1671 10.6243 15.0013V12.9863C10.9239 12.8446 11.1663 12.6051 11.3116 12.3073C11.4569 12.0095 11.4964 11.671 11.4236 11.3477C11.3508 11.0244 11.1701 10.7356 10.9112 10.5287C10.6524 10.3218 10.3307 10.2093 9.99935 10.2096Z" fill="#FFB200" />
            </svg>}
            title={__('Color Slug Edit is Locked', '--gctd--')}
            description={__('Warning: Changing this will cause all assigned blocks to lose their color. Only proceed if you fully understand the consequences.', '--gctd--')}
            buttonText={__('Unlock Slug', '--gctd--')}
            onClick={() => {
                setSlugLock(false);
                setEditorWarn(false);
            }}
            onClose={() => setEditorWarn(false)}
            scheme="danger"
        />, document.getElementById('gutenverse-root'))}
        {openPopup && <Notice
            icon={<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4286 0.517446C11.0653 -0.172482 9.93558 -0.172482 9.5723 0.517446L0.122776 18.4514C0.0377128 18.6121 -0.0044578 18.7922 0.000372931 18.9742C0.00520366 19.1562 0.0568709 19.3338 0.150341 19.4898C0.24381 19.6457 0.375894 19.7747 0.533723 19.8641C0.691551 19.9535 0.869741 20.0004 1.05093 20H19.95C20.131 20.0004 20.3091 19.9536 20.4668 19.8642C20.6246 19.7749 20.7565 19.646 20.8499 19.4901C20.9433 19.3342 20.9949 19.1567 20.9996 18.9749C21.0044 18.793 20.9622 18.613 20.8771 18.4524L11.4286 0.517446ZM11.5504 16.8352H9.45051V14.7253H11.5504V16.8352ZM9.45051 12.6154V7.34077H11.5504L11.5515 12.6154H9.45051Z" fill="#FFB200" />
            </svg>}
            title={__('Delete Color Variable?', '--gctd--')}
            description={__('You are about to delete one of your Color Variable. If you are assign this color variable to blocks, it will lost the color.', '--gctd--')}
            buttonText={__('Delete', '--gctd--')}
            cancelButtonText={__('Cancel', '--gctd--')}
            cancelButton={true}
            onClick={() => deleteColor(value?.id)}
            onClose={() => setOpenPopup(false)}
            scheme="danger"
        />}
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
        return toKebabCase(slug);
    }
};

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


/**
 * Global Custom Color Component
 *
 * @returns {JSX.Element}
 */
const GlobalCustomColor = ({ userConfig, setUserConfig }) => {
    const customs = userConfig.settings.color && userConfig.settings.color.palette && userConfig.settings.color.palette.custom;
    const isFirstRender = useRef(true);
    const [customPalette, setCustomPalette] = useState(customs ? customs.map(item => {
        return {
            key: cryptoRandomString({ length: 6, type: 'alphanumeric' }),
            id: item.slug,
            slug: item.slug,
            type: 'custom',
            name: item.name,
            color: hexToRgb(item.color)
        };
    }) : []);

    const addVariableColor = () => {
        const name = `${__('Variable Color', '--gctd--')} #${getLastSequence(customPalette)}`;
        const key = toKebabCase(cryptoRandomString({ length: 6, type: 'alphanumeric' }));
        const newColor = {
            key: key,
            id: key,
            slug: key,
            type: 'custom',
            name: name,
            color: hexToRgb('#fff')
        };

        setCustomPalette([
            ...customPalette,
            newColor
        ]);
    };

    const updateVariableColor = (index, value) => {
        const { id: slug, key, name, color } = value;
        const updated = {
            slug,
            id: slug,
            key,
            name,
            color: color
        };

        const updatedCustoms = [...customPalette];
        updatedCustoms[index] = updated;
        setCustomPalette(updatedCustoms);
    };

    const deleteVariableColor = (index) => {
        const updatedCustoms = customPalette.filter((custom, idx) => index !== idx);

        setCustomPalette([...updatedCustoms]);
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setUserConfig((currentConfig) => {
            const newUserConfig = cloneDeep(currentConfig);
            const pathToSet = 'settings.color.palette.custom';

            set(newUserConfig, pathToSet, customPalette.map(item => {
                return {
                    ...item,
                    color: rgbToHex(item.color)
                };
            }));
            return newUserConfig;
        });
    }, [customPalette]);

    return <>
        <h4 style={{ marginTop: 0 }}>{__('Custom Colors', '--gctd--')}</h4>
        {!isEmpty(customPalette) && customPalette.map((value, index) => {
            return <SingleVariableColor
                key={value.key}
                value={value}
                updateColor={(value) => updateVariableColor(index, value)}
                deleteColor={() => deleteVariableColor(index)}
                showDelete={true}
                showEditSlug={true}
                checkDoubleSlug={slug => checkDoubleSlug(slug, index, customPalette)}
            />;
        })}
        {isEmpty(customPalette) && <div className="empty-variable" onClick={() => addVariableColor()}>
            {__('Empty Variable Color', '--gctd--')}
        </div>}
        {<div className={'color-variable-add'}>
            <div onClick={() => addVariableColor()}>
                {__('Add Color', '--gctd--')}
            </div>
        </div>}
    </>;
};

const GlobalDefaultColor = ({ userConfig }) => {
    const defaultPalette = useSettingFallback('color.palette.default');
    const defaultColor = !isEmpty(defaultPalette) && defaultPalette.map(item => {
        return {
            id: item.slug,
            type: 'default',
            name: item.name,
            color: hexToRgb(item.color)
        };
    });

    return <>
        <h4>{__('Default Colors', '--gctd--')}</h4>
        {!isEmpty(defaultColor) && defaultColor.map(value => {
            return <ThemeVariableColor
                key={value.slug}
                value={value}
                allowChange={false}
                userConfig={userConfig}
            />;
        })}
    </>;
};

const GlobalThemesColor = ({ userConfig, setUserConfig }) => {
    const isFirstRender = useRef(true);
    const themePalette = useSettingFallback('color.palette.theme');
    const [dummyThemesPalette, setDummyThemesPalette] = useState(themePalette ? themePalette.map(item => {
        return {
            id: item.slug,
            slug: item.slug,
            type: 'theme',
            name: item.name,
            color: hexToRgb(item.color)
        };
    }) : []);

    const updateThemesColor = (index, value) => {
        const { id: slug, name, color } = value;
        const updated = {
            id: slug,
            slug,
            name,
            color: color
        };

        const updatedCustoms = [...dummyThemesPalette];
        updatedCustoms[index] = updated;
        setDummyThemesPalette(updatedCustoms);
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setUserConfig((currentConfig) => {
            const newUserConfig = cloneDeep(currentConfig);
            const pathToSet = 'settings.color.palette.theme';
            const themesColors = dummyThemesPalette.map(item => {
                return {
                    ...item,
                    color: rgbToHex(item.color)
                };
            });

            set(newUserConfig, pathToSet, themesColors);
            return newUserConfig;
        });
    }, [dummyThemesPalette]);

    return <>
        <h4>{__('Theme Colors', '--gctd--')}</h4>
        {!isEmpty(dummyThemesPalette) && dummyThemesPalette.map((value, index) => {
            return <SingleVariableColor
                key={value.slug}
                value={value}
                updateColor={(value) => updateThemesColor(index, value)}
                deleteColor={() => { }}
                showDelete={false}
            />;
        })}
    </>;
};

const GlobalVariableColor = () => {
    const { userConfig, setUserConfig } = useGlobalStylesConfig();

    return <>
        {<div className={'color-variable-wrapper'}>
            <GlobalCustomColor userConfig={userConfig} setUserConfig={setUserConfig} />
            <div style={{ display: 'block', height: '10px' }}></div>
            <GlobalThemesColor userConfig={userConfig} setUserConfig={setUserConfig} />
            <div style={{ display: 'block', height: '10px' }}></div>
            <GlobalDefaultColor userConfig={userConfig} setUserConfig={setUserConfig} />
        </div>}
    </>;
};

export default GlobalVariableColor;
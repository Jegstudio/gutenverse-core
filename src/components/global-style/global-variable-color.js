import cryptoRandomString from 'crypto-random-string';
import { useEffect, useRef, useState } from '@wordpress/element';
import { ChromePicker } from 'react-color';
import { Trash } from 'react-feather';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import { getLastSequence, rgbToHex, useSettingFallback } from 'gutenverse-core/helper';
import { hexToRgb, useGlobalStylesConfig, renderColor } from 'gutenverse-core/editor-helper';
import Notice from '../notice';

const SingleVariableColor = ({ value, updateColor, deleteColor }) => {
    const [open, setControlOpen] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

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

    const editColor = (rgba) => {
        updateColor({
            ...value,
            color: rgba
        });
    };

    return <div className={classnames('gutenverse-control-wrapper', 'single-variable-color', 'gutenverse-control-color')}>
        <div className={'single-variable-color-wrapper'}>
            <div className={'single-variable-item-wrapper'}>
                <div className={'control-color'} onClick={() => toggleOpen()} ref={colorRef}>
                    <div style={{ backgroundColor: renderColor(value.color) }} />
                </div>
                <input type="text" value={value.name} onChange={editName} className={'color-name'} />
            </div>
            <div className={'color-delete'} onClick={() => setOpenPopup(true)}>
                <Trash size={12} />
            </div>
        </div>
        {open ? <div className={'control-color-display'} ref={wrapperRef}>
            <div className={'gutenverse-control-heading'}>
                <h2>
                    {__('Color Picker', '--gctd--')}
                </h2>
            </div>
            <ChromePicker
                color={value.color}
                onChange={color => {
                    editColor(color.rgb);
                }}
                onChangeComplete={(color) => {
                    editColor(color.rgb);
                }}
            />
        </div> : null}
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
            <div className={'single-variable-item-wrapper'}>
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

    useEffect(() => {
        setUserConfig((currentConfig) => {
            const newUserConfig = cloneDeep(currentConfig);
            const pathToSet = 'settings.color.palette.custom';

            set(newUserConfig, pathToSet, customPalette);

            return newUserConfig;
        });
    }, [customPalette]);

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
            {!isEmpty(themeColor) && themeColor.map(value => <ThemeVariableColor key={value.slug} value={value} />)}
            <h4>{__('Default Colors', '--gctd--')}</h4>
            {!isEmpty(defaultColor) && defaultColor.map(value => <ThemeVariableColor key={value.slug} value={value} />)}
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
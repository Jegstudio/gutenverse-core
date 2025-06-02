import cryptoRandomString from 'crypto-random-string';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import { getLastSequence, rgbToHex, useSettingFallback } from 'gutenverse-core/helper';
import { hexToRgb, useGlobalStylesConfig, renderColor } from 'gutenverse-core/editor-helper';
import { SortableComponent } from './global-style-sortable';
import { useState, useRef, useEffect } from '@wordpress/element';

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
const GlobalCustomColor = (props) => {
    const { userConfig, setUserConfig } = props;
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

    const sortCustomsColor = (newArr) => {
        setCustomPalette(newArr);
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
        {!isEmpty(customPalette) && <SortableComponent
            items={customPalette}
            isDragable={true}
            onValueChange={sortCustomsColor}
            updateValue={updateVariableColor}
            deleteValue={deleteVariableColor}
            showDelete={true}
            showEditSlug={true}
            {...props}
        />
        }
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

const GlobalThemesColor = (props) => {
    const { userConfig, setUserConfig } = props;
    const isFirstRender = useRef(true);
    const themePalette = userConfig.settings.color && userConfig.settings.color.palette && userConfig.settings.color.palette.theme;
    const [dummyThemesPalette, setDummyThemesPalette] = useState(themePalette ? themePalette.map(item => {
        return {
            key: cryptoRandomString({ length: 6, type: 'alphanumeric' }),
            id: item.slug,
            slug: item.slug,
            type: 'theme',
            name: item.name,
            color: hexToRgb(item.color)
        };
    }) : []);

    const sortThemesColor = (newArr) => {
        setDummyThemesPalette(newArr);
    };

    const updateThemesColor = (index, value) => {
        const { id: slug, name, color, key } = value;
        const updated = {
            key,
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
            set(newUserConfig, pathToSet, dummyThemesPalette.map(item => {
                return {
                    ...item,
                    color: rgbToHex(item.color)
                };
            }));
            return newUserConfig;
        });
    }, [dummyThemesPalette]);

    return <>
        <h4>{__('Theme Colors', '--gctd--')}</h4>
        {!isEmpty(dummyThemesPalette) && <SortableComponent
            items={dummyThemesPalette}
            isDragable={true}
            onValueChange={sortThemesColor}
            updateValue={updateThemesColor}
            deleteValue={() => { }}
            showDelete={false}
            {...props}
        />
        }
    </>;
};

const GlobalVariableColor = ({ stage }) => {
    const { userConfig, setUserConfig } = useGlobalStylesConfig();
    return <>
        {<div className={'color-variable-wrapper'}>
            <GlobalCustomColor userConfig={userConfig} setUserConfig={setUserConfig} stage={stage} />
            <div style={{ display: 'block', height: '10px' }}></div>
            <GlobalThemesColor userConfig={userConfig} setUserConfig={setUserConfig} stage={stage} />
            <div style={{ display: 'block', height: '10px' }}></div>
            <GlobalDefaultColor userConfig={userConfig} setUserConfig={setUserConfig} />
        </div>}
    </>;
};

export default GlobalVariableColor;
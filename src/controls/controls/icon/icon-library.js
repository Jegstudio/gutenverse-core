import { LogoFullColorSVG, IconSearchSVG } from 'gutenverse-core/icons';
import { useEffect, useRef, useState } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { AutoSizer, Grid } from 'react-virtualized';
import faIcons from './font-awesome-icons';
import gtnIcons from './gutenverse-icons';
import { X } from 'react-feather';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { settingsData } from 'gutenverse-core/config';

const COLUMN_NUMBER = 8;
const AUTO_CONVERT_SETTING_KEY = 'icon_library_auto_convert_svg';

const getAutoConvertSetting = () => {
    const editorSettings = settingsData?.editor_settings || {};
    return typeof editorSettings[AUTO_CONVERT_SETTING_KEY] === 'boolean' ? editorSettings[AUTO_CONVERT_SETTING_KEY] : true;
};

const updateAutoConvertSetting = (value) => {
    const editorSettings = settingsData?.editor_settings || {};
    const nextEditorSettings = {
        ...editorSettings,
        [AUTO_CONVERT_SETTING_KEY]: value
    };

    if (settingsData) {
        settingsData.editor_settings = nextEditorSettings;
    }

    if (window?.GutenverseConfig?.settingsData) {
        window.GutenverseConfig.settingsData.editor_settings = nextEditorSettings;
    }

    if (window?.GutenverseDashboard?.settingsData) {
        window.GutenverseDashboard.settingsData.editor_settings = nextEditorSettings;
    }
};

const IconItem = ({ active, columnWidth, onClick, icon, title }) => {
    const iconClass = classnames('icon-library-item', {
        'active': active
    });

    return <div style={{ maxWidth: `${columnWidth}px` }} className={iconClass} onClick={() => onClick()}>
        <div className={'icon-library-content'}>
            <i className={icon} />
            <div className={'icon-library-title'}>{title}</div>
        </div>
    </div>;
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const getIconTitle = (name) => {
    const str = name.split(' ')[1];
    const normalStr = str.split('-');
    normalStr.shift();
    return capitalizeFirstLetter(normalStr.join(' '));
};

function rankStringsByWordMatch(strings, searchTerm) {
    const searchWords = searchTerm.toLowerCase().split(' ');

    // Map each string with a count of how many search words it contains
    const rankedStrings = strings.map(str => {
        const lowerStr = str.toLowerCase();
        const matchCount = searchWords.reduce((count, word) => {
            // Add 1 for each occurrence of the word
            return count + (lowerStr.includes(word) ? 1 : 0);
        }, 0);
        return { str, matchCount };
    });

    // Filter out strings with no matches and sort the remaining strings
    return rankedStrings
        .filter(item => item.matchCount > 0)
        .sort((a, b) => b.matchCount - a.matchCount)
        .map(item => item.str);
}

const IconLibraryContent = ({ width, height, cellRenderer, selected, setSelected, iconList }) => {
    const size = (width - 15) / COLUMN_NUMBER;
    const [scrollTop, setScrollTop] = useState(false);

    useEffect(() => {
        if (selected !== '' && width > 0) {
            const found = iconList.findIndex(value => {
                return value === selected;
            });

            const row = Math.floor(found / COLUMN_NUMBER);
            setScrollTop(row * size);
        }
    }, [size]);

    useEffect(() => {
        if (scrollTop) {
            setScrollTop(false);
        }
    }, [scrollTop]);

    return <Grid
        cellRenderer={props => cellRenderer({
            ...props,
            columnWidth: size - 10,
            selected: selected,
            setSelected: setSelected
        })}
        columnCount={COLUMN_NUMBER}
        rowCount={Math.floor(iconList.length / COLUMN_NUMBER) + 1}
        columnWidth={size}
        rowHeight={size}
        height={height}
        width={width}
        scrollTop={scrollTop}
    />;
};

const getAllFont = () => {
    return [
        ...faIcons,
        ...gtnIcons
    ];
};

export const IconLibrary = ({
    closeLibrary,
    value,
    onChange,
    allowConvertToSvg = false
}) => {
    const [filter, setFilter] = useState('');
    const [selected, setSelected] = useState(value);
    const [iconList, setIconList] = useState(getAllFont());
    const persistedConvertToSvg = useRef(getAutoConvertSetting());
    const saveRequestId = useRef(0);
    const [convertToSvg, setConvertToSvg] = useState(persistedConvertToSvg.current);

    const changeFilter = (e) => {
        setFilter(e.target.value);
    };

    const saveConvertToSvg = value => {
        const requestId = saveRequestId.current + 1;
        const previousValue = persistedConvertToSvg.current;
        const editorSettings = settingsData?.editor_settings || {};
        const nextEditorSettings = {
            ...editorSettings,
            [AUTO_CONVERT_SETTING_KEY]: value
        };

        saveRequestId.current = requestId;
        setConvertToSvg(value);

        apiFetch({
            path: 'gutenverse-client/v1/settings/modify',
            method: 'POST',
            data: {
                setting: {
                    editor_settings: nextEditorSettings
                }
            }
        }).then(() => {
            if (saveRequestId.current === requestId) {
                persistedConvertToSvg.current = value;
                updateAutoConvertSetting(value);
            }
        }).catch(() => {
            if (saveRequestId.current === requestId) {
                setConvertToSvg(previousValue);
            }
        });
    };

    useEffect(() => {
        const fonts = getAllFont();
        const data = rankStringsByWordMatch(fonts, filter);
        setIconList(data);
    }, [filter]);

    const changeIcon = () => {
        if (!selected) {
            return;
        }

        if (allowConvertToSvg && convertToSvg) {
            onChange(selected, { convertToSvg: true });
        } else {
            onChange(selected);
        }

        closeLibrary();
    };

    const cellRenderer = ({
        columnIndex,
        columnWidth,
        key,
        rowIndex,
        style,
        selected,
        setSelected
    }) => {
        const index = rowIndex * COLUMN_NUMBER + columnIndex;
        const icon = iconList[index];
        if (iconList.length > index) {
            return <div className={'icon-library-item-wrapper'} key={key} style={style}>
                <IconItem
                    active={icon === selected}
                    columnWidth={columnWidth}
                    key={icon}
                    icon={icon}
                    title={getIconTitle(icon)}
                    onClick={() => setSelected(icon)}
                />
            </div>;
        } else {
            return null;
        }
    };

    return <div className={'icon-library-wrapper'}>
        <div className={'icon-library-overlay'} onClick={() => closeLibrary()} />
        <div className={'icon-library-container'}>
            <div className={'icon-library-box'}>
                <div className={'icon-library-header'}>
                    <h2 className={'gutenverse-icon-logo'}><LogoFullColorSVG />{__('Icon Library', '--gctd--')}</h2>
                    <X className={'close'} onClick={() => closeLibrary()} />
                </div>
                <div className={'icon-library-search'}>
                    <div className={'input'}>
                        <IconSearchSVG />
                        <input type={'text'} placeholder={__('Search Icon', '--gctd--')} onChange={changeFilter} autoFocus={true}/>
                    </div>
                </div>
                <div className={'icon-library-result'}>
                    <AutoSizer>
                        {({ height, width }) => (
                            <IconLibraryContent
                                height={height}
                                width={width}
                                cellRenderer={cellRenderer}
                                selected={selected}
                                setSelected={setSelected}
                                iconList={iconList}
                            />
                        )}
                    </AutoSizer>
                </div>
                <div className={'icon-library-insert'}>
                    {allowConvertToSvg && <div className={'gutenverse-control-wrapper gutenverse-control-checkbox icon-library-convert'}>
                        <div className={'control-title'}>
                            <label htmlFor={'icon-library-convert-to-svg'}>
                                <span className={'icon-library-convert-title'}>
                                    {__('Automatically convert to SVG', '--gctd--')}
                                </span>
                                <input
                                    id={'icon-library-convert-to-svg'}
                                    checked={convertToSvg}
                                    type="checkbox"
                                    onChange={e => saveConvertToSvg(e.target.checked)}
                                    hidden
                                />
                                <span className="switch" />
                            </label>
                            <p className={'icon-library-convert-description'}>
                                {__('Enable this to improve page performance by using optimized SVG icons.', '--gctd--')}
                            </p>
                        </div>
                    </div>}
                    <Button variant={true} onClick={changeIcon} disabled={!selected}>
                        {__('Insert Icon', '--gctd--')}
                    </Button>
                </div>
            </div>
        </div>
    </div>;
};

export default IconLibrary;

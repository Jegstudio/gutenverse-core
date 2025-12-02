import { useEffect, useState } from '@wordpress/element';
import { createPortal } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import faIcons from './font-awesome-icons';
import gtnIcons from './gutenverse-icons';
import { __ } from '@wordpress/i18n';
import { Trash, X } from 'react-feather';
import { Button } from '@wordpress/components';
import { MediaUpload } from '@wordpress/block-editor';
import classnames from 'classnames';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { AutoSizer, Grid } from 'react-virtualized';
import { svgAtob, gutenverseRoot } from 'gutenverse-core/helper';
import { LogoFullColorSVG, IconSearchSVG } from 'gutenverse-core/icons';

const COLUMN_NUMBER = 8;

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

export const IconLibrary = ({
    closeLibrary,
    value,
    onChange
}) => {
    const [filter, setFilter] = useState('');
    const [selected, setSelected] = useState(value);
    const [iconList, setIconList] = useState(getAllFont());

    const changeFilter = (e) => {
        setFilter(e.target.value);
    };

    useEffect(() => {
        const fonts = getAllFont();
        const data = rankStringsByWordMatch(fonts, filter);
        setIconList(data);
    }, [filter]);

    const changeIcon = () => {
        onChange(selected);
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
                        <input type={'text'} placeholder={__('Search Icon', '--gctd--')} onChange={changeFilter} autoFocus={true} />
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
                    <Button variant={true} onClick={changeIcon}>
                        {__('Insert Icon', '--gctd--')}
                    </Button>
                </div>
            </div>
        </div>
    </div>;
};

const IconControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = '',
        onValueChange,
        attributes,
        setAttributes,
        id,
        values,
    } = props;

    const [openIconLibrary, setOpenIconLibrary] = useState(false);
    const instanceId = useInstanceId(IconControl, 'inspector-icon-control');

    const typeAttribute = id ? `${id}Type` : '';
    const svgAttribute = id ? `${id}SVG` : '';

    const iconType = (attributes && attributes[typeAttribute]) ? attributes[typeAttribute] : (values && values[typeAttribute] ? values[typeAttribute] : 'icon');
    const svgValue = (attributes && attributes[svgAttribute]) ? attributes[svgAttribute] : (values && values[svgAttribute] ? values[svgAttribute] : {});

    const updateAttributes = (newAttributes) => {
        if (setAttributes) {
            setAttributes(newAttributes);
        } else if (values && values.setAttributes) {
            values.setAttributes(newAttributes);
        }
    };

    const onChange = value => {
        onValueChange(value);
    };

    const removeIcon = (e) => {
        e.stopPropagation();
        onChange('');
    };

    const removeSVG = (e) => {
        e.stopPropagation();
        if (svgAttribute) {
            updateAttributes({ [svgAttribute]: '' });
        }
    };

    const onSelectSVG = (media) => {
        if (svgAttribute && media.url) {
            // Fetch SVG content and store as string
            fetch(media.url)
                .then(response => response.text())
                .then(svgContent => {
                    const encodedSVG = btoa(svgContent);
                    updateAttributes({ [svgAttribute]: encodedSVG });
                })
                .catch((error) => {
                    console.error('Failed to fetch SVG content:', error);
                    // Fallback: store empty string
                    updateAttributes({ [svgAttribute]: '' });
                });
        }
    };

    const setType = (type) => {
        if (typeAttribute) {
            updateAttributes({ [typeAttribute]: type });
        }
    };

    return <div id={instanceId} className={'gutenverse-control-wrapper gutenverse-control-icon'}>
        <ControlHeadingSimple
            id={`${instanceId}-icon`}
            label={label}
            description={__('Using the icon library may increase your frontend size. For best performance, use uploaded SVGs for all icons.', '--gctd--')}
            allowDeviceControl={allowDeviceControl}
        />

        {iconType === 'icon' ? (
            <div className={'control-body'}>
                <div>
                    <div className={'icon-wrapper'}>
                        {value !== '' && <div className={'icon-remove'} onClick={e => removeIcon(e)}>
                            <Trash />
                        </div>}
                        <div className={'icon-preview'} onClick={() => setOpenIconLibrary(true)}>
                            <i className={value} />
                        </div>
                        <div className={'icon-change'}>
                            <div className={'choose-icon active'} onClick={() => setType('icon')}>
                                {__('Choose Icon', '--gctd--')}
                            </div>
                            <div className={'upload-svg'} onClick={() => setType('svg')}>
                                {__('Upload SVG', '--gctd--')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className={'control-body'}>
                <MediaUpload
                    onSelect={onSelectSVG}
                    allowedTypes={['image/svg+xml']}
                    value={undefined}
                    render={({ open }) => (
                        <div className={'icon-wrapper'}>
                            {svgValue && <div className={'icon-remove'} onClick={e => removeSVG(e)}>
                                <Trash />
                            </div>}
                            <div className={'icon-preview'} onClick={open} style={{
                                backgroundSize: '20px 20px',
                                backgroundPosition: '0 0, 10px 10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {svgValue ? <div dangerouslySetInnerHTML={{ __html: svgAtob(svgValue) }} style={{ maxWidth: '60%', maxHeight: '60%', display: 'flex' }} /> : null}
                            </div>
                            <div className={'icon-change'}>
                                <div className={'choose-icon'} onClick={() => setType('icon')}>
                                    {__('Choose Icon', '--gctd--')}
                                </div>
                                <div className={'upload-svg active'} onClick={() => setType('svg')}>
                                    {__('Upload SVG', '--gctd--')}
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
        )}

        {openIconLibrary && createPortal(<IconLibrary
            closeLibrary={() => setOpenIconLibrary(false)}
            value={value}
            onChange={onChange}
        />, gutenverseRoot)}
    </div>;
};

export default compose(withParentControl, withDeviceControl)(IconControl);
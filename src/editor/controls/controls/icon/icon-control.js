import { useEffect, useState } from '@wordpress/element';
import { createPortal } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import faIcons from './font-awesome-icons';
import gtnIcons from './gutenverse-icons';
import { __ } from '@wordpress/i18n';
import { Trash, X } from 'react-feather';
import { Button } from '@wordpress/components';
import classnames from 'classnames';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core-editor/hoc';
import { withDeviceControl } from 'gutenverse-core-editor/hoc';
import { AutoSizer, Grid } from 'react-virtualized';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { LogoFullColorSVG, IconSearchSVG } from 'gutenverse-core-editor/icons';

const COLUMN_NUMBER = 8;

const IconItem = ({ active, columnWidth, onClick, icon, title }) => {
    const iconClass = classnames('icon-library-item', {
        'active': active
    });

    return <div style={{ maxWidth: `${columnWidth}px` }} className={iconClass} onClick={() => onClick()}>
        <div className={'icon-library-content'}>
            <i className={icon}/>
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

export const IconLibrary = ({
    closeLibrary,
    value,
    onChange
}) => {
    const [filter, setFilter] = useState('');
    const [selected, setSelected] = useState(value);

    const changeFilter = (e) => {
        setFilter(e.target.value);
    };

    const changeIcon = () => {
        onChange(selected);
        closeLibrary();
    };

    const iconList = faIcons.filter(icon => {
        if (filter === '') {
            return true;
        } else {
            return icon.toLowerCase().includes(filter.toLowerCase());
        }
    });

    iconList.push(...gtnIcons.filter(icon => {
        if (filter === '') {
            return true;
        } else {
            return icon.toLowerCase().includes(filter.toLowerCase());
        }
    }));

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
        <div className={'icon-library-overlay'} onClick={() => closeLibrary()}/>
        <div className={'icon-library-container'}>
            <div className={'icon-library-box'}>
                <div className={'icon-library-header'}>
                    <h2 className={'gutenverse-icon-logo'}><LogoFullColorSVG/>{__('Icon Library', 'gutenverse')}</h2>
                    <X className={'close'} onClick={() => closeLibrary()}/>
                </div>
                <div className={'icon-library-search'}>
                    <div className={'input'}>
                        <IconSearchSVG/>
                        <input type={'text'} placeholder={__('Search Icon', 'gutenverse')} onChange={changeFilter}/>
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
                    <Button isPrimary={true} onClick={changeIcon}>
                        {__('Insert Icon', 'gutenverse')}
                    </Button>
                </div>
            </div>
        </div>
    </div>;
};

const IconControl = ({
    label,
    allowDeviceControl,
    value = '',
    onValueChange,
    onStyleChange,
    description = '',
}) => {
    const [openIconLibrary, setOpenIconLibrary] = useState(false);
    const id = useInstanceId(IconControl, 'inspector-icon-control');

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    const removeIcon = (e) => {
        e.stopPropagation();
        onChange('');
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-icon'}>
        <ControlHeadingSimple
            id={`${id}-icon`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'icon-wrapper'}>
                {value !== '' && <div className={'icon-remove'} onClick={e => removeIcon(e)}>
                    <Trash/>
                </div>}
                <div className={'icon-preview'} onClick={() => setOpenIconLibrary(true)}>
                    <i className={value}/>
                </div>
                <div className={'icon-change'} onClick={() => setOpenIconLibrary(true)}>
                    {__('Choose Icon', 'gutenverse')}
                </div>
            </div>
        </div>
        {openIconLibrary && createPortal(<IconLibrary
            closeLibrary={() => setOpenIconLibrary(false)}
            value={value}
            onChange={onChange}
        />, gutenverseRoot)}
    </div>;
};

export default compose(withParentControl, withDeviceControl)(IconControl);
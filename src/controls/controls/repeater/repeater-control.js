import { useEffect, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { ControlHeadingSimple, PanelTutorial } from 'gutenverse-core/controls';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withParentControl } from 'gutenverse-core/hoc';
import { RotateCcw, X } from 'react-feather';
import classnames from 'classnames';
import template from 'lodash/template';
import cryptoRandomString from 'crypto-random-string';
import { IconDuplicateSVG } from 'gutenverse-core/icons';
import { ReactSortable } from 'react-sortablejs';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

const SortableItem = SortableElement(props => {
    const {
        value,
        item,
        idx: index,
        id,
        rootId,
        options,
        onValueChange,
        onStyleChange,
        titleFormat,
        removeIndex,
        duplicateIndex,
        isDuplicate,
        isRemove,
        isReset,
        resetStatus,
        openLast,
        addStyle,
        removeStyle,
        resetMethod,
        throttleSave,
        booleanSwitcher,
        refreshStyle,
        items
    } = props;

    return <RepeaterItem
        key={item._key === undefined ? `${id}-${index}` : item._key}
        id={`${rootId}-style-${index}`}
        index={index}
        values={items}
        options={options}
        onValueChange={onValueChange}
        onStyleChange={onStyleChange}
        titleFormat={titleFormat}
        onRemove={() => removeIndex(index)}
        onDuplicate={() => duplicateIndex(index)}
        isDuplicate={isDuplicate}
        isRemove={isRemove}
        isReset={isReset}
        resetStatus={() => resetStatus(item)}
        initialOpen={index === openLast}
        addStyle={addStyle}
        removeStyle={removeStyle}
        resetMethod={() => resetMethod(index, value, onStyleChange, onValueChange, refreshStyle)}
        throttleSave={throttleSave}
        booleanSwitcher={booleanSwitcher}
    />;
});

const SortableList = SortableContainer(props => {
    const { items, id } = props;
    return (
        <ul>
            {items.map((item, index) => {
                return <SortableItem
                    key={item._key === undefined ? `${id}-${index}` : item._key}
                    index={index}
                    idx={index}
                    value={item}
                    item={item}
                    items={items}
                    {...props}
                />;
            })}
        </ul>
    );
});

const SortableComponent = (props) => {
    const { items, onValueChange, refreshDrag, refreshStyle } = props;

    const onSortEnd = (props) => {
        const { oldIndex, newIndex } = props;
        onValueChange(arrayMoveImmutable(items, oldIndex, newIndex));
        refreshDrag && refreshStyle();
    };

    return <SortableList {...props} onSortEnd={onSortEnd} />;
};


const DragDropList = ({ list, setList, children, isDragable }) => {
    return <ReactSortable
        list={list}
        setList={setList}
        animation="100"
        easing="ease-out"
        handle=".repeater-header"
        sort={isDragable}
    >
        {children}
    </ReactSortable>;
};

const RepeaterComponent = (props) => {
    const { component: Component, index: repeaterIndex, itemProps, value = {}, id: rootId, onValueChange, addStyle, removeStyle, throttleSave } = props;
    const { id, allowDeviceControl, style, onChange } = itemProps;
    const onRepeaterComponentChange = (val) => {
        const newVal = {
            ...value,
            [id]: val,
        };
        onValueChange(newVal);

        onChange ? onChange({
            ...newVal
        }, repeaterIndex) : null;
    };

    const onRepeaterStyleChange = (value) => {
        if (style) {
            const theStyle = style.map(item => {
                const { selector } = item;
                let theSelector = typeof selector === 'string' || selector instanceof String ? selector : selector(repeaterIndex, { props: props.value });
                return {
                    ...item,
                    selector: theSelector
                };
            });
            throttleSave({
                id: rootId,
                value,
                style: theStyle,
                allowDeviceControl,
                addStyle,
                removeStyle,
            });
        }
    };

    return <Component
        {...itemProps}
        value={value[id] === undefined ? null : value[id]}
        values={value}
        onValueChange={onRepeaterComponentChange}
        onStyleChange={onRepeaterStyleChange}
    />;
};

const processTitle = (format, values) => {
    if (typeof format === 'function') {
        return format(values);
    } else {
        return template(format)({ value: values });
    }
};

const RepeaterItem = ({
    titleFormat,
    values,
    options,
    index,
    onValueChange,
    onStyleChange,
    onRemove,
    onDuplicate,
    initialOpen = true,
    addStyle,
    removeStyle,
    throttleSave,
    isDuplicate = true,
    isRemove = true,
    isReset,
    resetStatus,
    id,
    resetMethod,
    booleanSwitcher = false,
}) => {
    const [open, setOpen] = useState(true);
    const toggleOpen = () => {
        console.log('hit here...');
        setOpen(state => !state);
    };

    const onUpdateIndexValue = (val) => {
        const newValue = values.map((item, idx) => index === idx ? val : item);
        onValueChange(newValue);
    };

    const onUpdateIndexStyle = (val) => {
        const newValue = values.map((item, idx) => index === idx ? val : item);
        onStyleChange(newValue);
    };

    const duplicateIndex = e => {
        e.stopPropagation();
        onDuplicate();
    };

    const itemClass = classnames('repeater-item', open ? 'open' : 'close');
    const title = processTitle(titleFormat, values[index]);

    return <div className={itemClass}>
        <div className={'repeater-header'} onClick={() => toggleOpen()}>
            <div className={'repeater-title'} dangerouslySetInnerHTML={{ __html: title }} />
            {
                isRemove && <div className={'repeater-remove'} onClick={() => onRemove()}>
                    <X />
                </div>
            }
            {
                isDuplicate && <div className={'repeater-duplicate'} onClick={e => duplicateIndex(e)}>
                    <IconDuplicateSVG />
                </div>
            }
            {
                isReset && resetStatus() && <div className="repeater-clear" onClick={resetMethod} >
                    <RotateCcw size={12} />
                </div>
            }
        </div>

        {open && <div className={'repeater-body'}>
            {options.map(item => {
                let showControl = true;
                if (booleanSwitcher) {
                    showControl = item.show;
                } else {
                    showControl = item.show !== undefined ? item.show(values[index]) : true;
                }

                return showControl && <RepeaterComponent
                    index={index}
                    component={item.component}
                    key={`${id}-${item.id}`}
                    id={`${id}-${item.id}`}
                    value={values[index]}
                    itemProps={item}
                    onValueChange={val => onUpdateIndexValue(val)}
                    onStyleChange={val => onUpdateIndexStyle(val)}
                    addStyle={addStyle}
                    removeStyle={removeStyle}
                    throttleSave={throttleSave}
                />;
            })}
        </div>}
    </div>;
};

const RepeaterControl = ({
    label,
    allowDeviceControl,
    repeaterDefault = {},
    value = [],
    onValueChange,
    onStyleChange,
    options,
    titleFormat,
    description = '',
    throttleSave,
    values,
    id: rootId,
    refreshDrag = true,
    isDuplicate = true,
    isAddNew = true,
    isRemove = true,
    isDragable = true,
    isReset = false,
    resetStatus = false,
    resetMethod,
    infoMessage,
    booleanSwitcher
}) => {
    const { addStyle, removeStyle, refreshStyle } = values;
    const id = useInstanceId(RepeaterControl, 'inspector-repeater-control');
    const [openLast, setOpenLast] = useState(null);

    useEffect(() => {
        const newValue = value.map(item => {
            if (item._key === undefined) {
                return {
                    ...item,
                    _key: cryptoRandomString({ length: 6, type: 'alphanumeric' })
                };
            } else {
                return item;
            }
        });

        onValueChange(newValue);
        onStyleChange(newValue);
    }, []);

    useEffect(() => {
        console.log(value);
    }, [value]);

    const addNewItem = () => {
        setOpenLast(value.length);

        const newValue = [
            ...value,
            {
                ...repeaterDefault,
                _key: cryptoRandomString({ length: 6, type: 'alphanumeric' })
            }
        ];

        onValueChange(newValue);
        onStyleChange(newValue);
        refreshStyle();
    };

    const removeIndex = index => {
        const newValue = value.filter((item, idx) => index !== idx);

        onValueChange(newValue);
        onStyleChange(newValue);
        refreshStyle();
    };

    const duplicateIndex = index => {
        setOpenLast(value.length);
        const data = value[index];
        const newValue = [
            ...value,
            {
                ...data,
                _key: cryptoRandomString({ length: 6, type: 'alphanumeric' })
            }
        ];

        onValueChange(newValue);
        onStyleChange(newValue);
        refreshStyle();
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-repeater'}>
        <ControlHeadingSimple
            id={`${id}-repeater`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'repeater-wrapper'}>
                {
                    !isAddNew && value.length === 0 && <PanelTutorial
                        title={infoMessage.title}
                        list={infoMessage.list}
                    />
                }
                {value.length === 0 ? isAddNew && <div className="repeater-empty" onClick={addNewItem}>
                    {__('Click Add Item to Add List', '--gctd--')}
                </div> : <>
                    <SortableComponent
                        id={id}
                        items={value}
                        rootId={rootId}
                        options={options}
                        onValueChange={onValueChange}
                        onStyleChange={onStyleChange}
                        titleFormat={titleFormat}
                        removeIndex={removeIndex}
                        duplicateIndex={duplicateIndex}
                        isDuplicate={isDuplicate}
                        isRemove={isRemove}
                        isReset={isReset}
                        resetStatus={resetStatus}
                        openLast={openLast}
                        addStyle={addStyle}
                        removeStyle={removeStyle}
                        resetMethod={resetMethod}
                        throttleSave={throttleSave}
                        booleanSwitcher={booleanSwitcher}
                        refreshStyle={refreshStyle}
                        refreshDrag={refreshDrag}
                    />
                    {/* <DragDropList list={value} isDragable={isDragable} setList={values => {
                        if (!isEqual(value, values)) {
                            onValueChange(values);
                            refreshDrag && refreshStyle();
                        }
                    }}>
                        {value.map((item, index) => {
                            return (
                                <RepeaterItem
                                    key={item._key === undefined ? `${id}-${index}` : item._key}
                                    id={`${rootId}-style-${index}`}
                                    index={index}
                                    values={value}
                                    options={options}
                                    onValueChange={onValueChange}
                                    onStyleChange={onStyleChange}
                                    titleFormat={titleFormat}
                                    onRemove={() => removeIndex(index)}
                                    onDuplicate={() => duplicateIndex(index)}
                                    isDuplicate={isDuplicate}
                                    isRemove={isRemove}
                                    isReset={isReset}
                                    resetStatus={() => resetStatus(item)}
                                    initialOpen={index === openLast}
                                    addStyle={addStyle}
                                    removeStyle={removeStyle}
                                    resetMethod={() => resetMethod(index, value, onStyleChange, onValueChange, refreshStyle)}
                                    throttleSave={throttleSave}
                                    booleanSwitcher={booleanSwitcher}
                                />
                            );
                        })}
                    </DragDropList> */}
                </>}
                {
                    isAddNew && <div className={'repeater-add-wrapper'}>
                        <Button isPrimary={true} onClick={addNewItem}>
                            {__('Add Item', '--gctd--')}
                        </Button>
                    </div>
                }
            </div>
        </div>
    </div>;
};

export default withParentControl(RepeaterControl);
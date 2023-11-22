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
import { IconDragSVG, IconDuplicateSVG } from 'gutenverse-core/icons';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

const DragHandle = SortableHandle(() =>
    <div className={'repeater-drag-handle'}>
        <IconDragSVG />
    </div>);

const SortableItem = SortableElement(props => {
    const {
        titleFormat,
        items,
        options,
        idx: index,
        onValueChange,
        onStyleChange,
        removeIndex,
        duplicateIndex,
        openLast,
        setOpenLast,
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
    } = props;

    const toggleOpen = () => {
        if (openLast === null || openLast !== index) {
            setOpenLast(index);
        } else {
            setOpenLast(null);
        }
    };

    const onUpdateIndexValue = (val) => {
        const newValue = items.map((item, idx) => index === idx ? val : item);
        onValueChange(newValue);
    };

    const onUpdateIndexStyle = (val) => {
        const newValue = items.map((item, idx) => index === idx ? val : item);
        onStyleChange(newValue);
    };

    const handleDuplicateIndex = e => {
        e.stopPropagation();
        duplicateIndex(index);
    };

    const itemClass = classnames('repeater-item', index === openLast ? 'open' : 'close');
    const title = processTitle(titleFormat, items[index]);
    return <div className={itemClass}>
        <div className={'repeater-header'} onClick={() => toggleOpen()}>
            <DragHandle />
            <div className={'repeater-title'} dangerouslySetInnerHTML={{ __html: title }} />
            {
                isRemove && <div className={'repeater-remove'} onClick={() => removeIndex(index)}>
                    <X />
                </div>
            }
            {
                isDuplicate && <div className={'repeater-duplicate'} onClick={e => handleDuplicateIndex(e)}>
                    <IconDuplicateSVG />
                </div>
            }
            {
                isReset && resetStatus(items[index]) && <div className="repeater-clear" onClick={resetMethod} >
                    <RotateCcw size={12} />
                </div>
            }
        </div>

        {index === openLast && <div className={'repeater-body'}>
            {options.map(item => {
                let showControl = true;
                if (booleanSwitcher) {
                    showControl = item.show;
                } else {
                    showControl = item.show !== undefined ? item.show(items[index]) : true;
                }

                return showControl && <RepeaterComponent
                    index={index}
                    component={item.component}
                    key={`${id}-${item.id}`}
                    id={`${id}-${item.id}`}
                    value={items[index]}
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
});

const SortableList = SortableContainer(props => {
    const { items, id, resetMethod, onStyleChange, onValueChange, refreshStyle, value } = props;
    return (
        <div>
            {items.map((item, index) => {
                return <SortableItem
                    key={item._key === undefined ? `${id}-${index}` : item._key}
                    index={index}
                    idx={index}
                    value={item}
                    item={item}
                    items={items}
                    resetMethod={() => resetMethod(index, value, onStyleChange, onValueChange, refreshStyle)}
                    {...props}
                />;
            })}
        </div>
    );
});

const SortableComponent = (props) => {
    const { items, onValueChange, refreshDrag, refreshStyle, isDragable } = props;

    const onSortEnd = (props) => {
        const { oldIndex, newIndex } = props;
        onValueChange(arrayMoveImmutable(items, oldIndex, newIndex));
        refreshDrag && refreshStyle();
    };
    const shouldCancelSortStart = coach => {
        return targetHasProp(coach.target, (el) => {
            return ['button'].includes(el.tagName.toLowerCase());
        });
    };
    return <SortableList {...props} onSortEnd={onSortEnd} useDragHandle={true} disabled={!isDragable} shouldCancelStart={shouldCancelSortStart} />;
};

export const targetHasProp = (
    target,
    hasProp,
) => {
    while (target) {
        if (hasProp(target)) {
            return true;
        }
        target = target.parentElement;
    }
    return false;
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
                        setOpenLast={setOpenLast}
                        addStyle={addStyle}
                        removeStyle={removeStyle}
                        resetMethod={resetMethod}
                        throttleSave={throttleSave}
                        booleanSwitcher={booleanSwitcher}
                        refreshStyle={refreshStyle}
                        refreshDrag={refreshDrag}
                        isDragable={isDragable}
                    />
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
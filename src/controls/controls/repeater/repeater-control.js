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
import u from 'umbrellajs';
import isEmpty from 'lodash/isEmpty';


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
        onLocalChange,
        removeIndex,
        duplicateIndex,
        openLast,
        setOpenLast,
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

    const onUpdateIndexValueLocal = (val) => {
        const newValue = items.map((item, idx) => index === idx ? val : item);
        onLocalChange(newValue);
    };

    const handleDuplicateIndex = e => {
        e.stopPropagation();
        duplicateIndex(index);
    };

    const isHaveUniqueId = () => {
        if (items[index].spanId) {
            return items[index].spanId;
        }
    };

    const handleEnter = () => {
        let wrapper = u(`.${items[index].spanId}, #${items[index].spanId}`);
        wrapper.nodes.map(el => {
            u(el).addClass('hover-child-style');
        });
        const iframe = u('.edit-site-visual-editor__editor-canvas');
        if (iframe.length > 0) {
            wrapper = u(iframe.nodes[0].contentWindow.document).find(`#${items[index].spanId}`);
            wrapper.nodes.map(el => {
                u(el).addClass('hover-child-style');
            });
        }
    };

    const handleLeave = () => {
        let wrapper = u(`.${items[index].spanId}, #${items[index].spanId}`);
        wrapper.nodes.map(el => {
            u(el).removeClass('hover-child-style');
        });
        const iframe = u('.edit-site-visual-editor__editor-canvas');
        if (iframe.length > 0) {
            wrapper = u(iframe.nodes[0].contentWindow.document).find(`#${items[index].spanId}`);
            wrapper.nodes.map(el => {
                u(el).removeClass('hover-child-style');
            });
        }
    };

    const itemClass = classnames('repeater-item', index === openLast ? 'open' : 'close');
    const title = processTitle(titleFormat, items[index]);
    return <div className={itemClass}>
        <div className={`repeater-header ${isHaveUniqueId()}`} onClick={() => toggleOpen()} onMouseEnter={() => handleEnter()} onMouseLeave={() => handleLeave()} >
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
                isReset && resetStatus(items[index]) && <div className="repeater-clear" onClick={() => resetMethod(index, items, onValueChange)} >
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
                    id={item._key === undefined ? `${id}-${index}` : item._key}
                    value={items[index]}
                    itemProps={item}
                    onValueChange={val => onUpdateIndexValue(val)}
                    onLocalChange={val => onUpdateIndexValueLocal(val)}
                />;
            })}
        </div>}
    </div>;
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
    const { items, onValueChange, isDragable } = props;

    const onSortEnd = (props) => {
        const { oldIndex, newIndex } = props;
        onValueChange(arrayMoveImmutable(items, oldIndex, newIndex));
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
    const { component: Component, index: repeaterIndex, itemProps, value = {}, onValueChange, onLocalChange } = props;
    const { id, onChange } = itemProps;
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

    const onRepeaterComponentLocalChange = (val) => {
        const newVal = {
            ...value,
            [id]: val,
        };

        onLocalChange(newVal);

        onChange ? onChange({
            ...newVal
        }, repeaterIndex) : null;
    };

    return <Component
        {...itemProps}
        value={value[id] === undefined ? null : value[id]}
        values={value}
        onValueChange={onRepeaterComponentChange}
        onLocalChange={onRepeaterComponentLocalChange}
    />;
};

const processTitle = (format, values) => {
    if (values.value && isEmpty(values.value)) {
        values.value = u(`#${values.id}`).nodes[0];
        const iframe = u('.edit-site-visual-editor__editor-canvas');
        if (iframe.length > 0) {
            values.value = u(iframe.nodes[0].contentWindow.document).find(`#${values.spanId}`).nodes[0];
        }
    }
    if (typeof format === 'function') {
        return format(values);
    } else {
        return template(format)({ value: values });
    }
};

const RepeaterControl = (props) => {
    const {
        label,
        allowDeviceControl,
        repeaterDefault = {},
        value = [],
        onValueChange,
        onLocalChange,
        options,
        titleFormat,
        description = '',
        id: rootId,
        isDuplicate = true,
        isAddNew = true,
        isRemove = true,
        isDragable = true,
        isReset = false,
        resetStatus = false,
        resetMethod,
        infoMessage,
        booleanSwitcher,
        openChild = '',
        liveStyle
    } = props;
    const id = useInstanceId(RepeaterControl, 'inspector-repeater-control');
    const [openLast, setOpenLast] = useState(null);

    useEffect(() => {
        let indexOpenChild = value.findIndex(el => el.id === openChild);
        setOpenLast(indexOpenChild);
    }, [openChild]);

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
    };

    const removeIndex = index => {
        const newValue = value.filter((item, idx) => index !== idx);
        onValueChange(newValue);
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
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-repeater'}>
        <ControlHeadingSimple
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
                        onLocalChange={onLocalChange}
                        titleFormat={titleFormat}
                        removeIndex={removeIndex}
                        duplicateIndex={duplicateIndex}
                        isDuplicate={isDuplicate}
                        isRemove={isRemove}
                        isReset={isReset}
                        resetStatus={resetStatus}
                        openLast={openLast}
                        setOpenLast={setOpenLast}
                        resetMethod={resetMethod}
                        booleanSwitcher={booleanSwitcher}
                        isDragable={isDragable}
                        liveStyle={liveStyle}
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
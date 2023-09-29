import { useEffect, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { ControlHeadingSimple } from 'gutenverse-core/controls';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withParentControl } from 'gutenverse-core/hoc';
import { X } from 'react-feather';
import classnames from 'classnames';
import template from 'lodash/template';
import cryptoRandomString from 'crypto-random-string';
import { IconDuplicateSVG } from 'gutenverse-core/icons';
import { ReactSortable } from 'react-sortablejs';

const DragDropList = ({ list, setList, children }) => {
    return <ReactSortable list={list} setList={setList}>
        {children}
    </ReactSortable>;
};

const RepeaterComponent = ({ component: Component, index, itemProps, value = {}, onValueChange, onStyleChange }) => {
    const { id, onChange } = itemProps;

    const onRepeaterComponentChange = (val) => {
        const newVal = {
            ...value,
            [id]: val,
        };

        onValueChange(newVal);

        onChange ? onChange({
            ...newVal
        }, index) : null;
    };

    const onRepeaterStyleChange = (val) => {
        const newVal = {
            ...value,
            [id]: val,
        };

        onStyleChange(newVal);
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
}) => {
    const [open, setOpen] = useState(initialOpen);

    const toggleOpen = () => {
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
            <div className={'repeater-remove'} onClick={() => onRemove()}>
                <X />
            </div>
            <div className={'repeater-duplicate'} onClick={e => duplicateIndex(e)}>
                <IconDuplicateSVG />
            </div>
        </div>

        {open && <div className={'repeater-body'}>
            {options.map(item => {
                const showControl = item.show !== undefined ? item.show(values[index]) : true;

                return showControl && <RepeaterComponent
                    index={index}
                    component={item.component}
                    key={`${index}-${item.id}`}
                    value={values[index]}
                    itemProps={item}
                    onValueChange={val => onUpdateIndexValue(val)}
                    onStyleChange={val => onUpdateIndexStyle(val)}
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
}) => {
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
            repeaterDefault
        ];

        onValueChange(newValue);
        onStyleChange(newValue);
    };

    const removeIndex = index => {
        const newValue = value.filter((item, idx) => index !== idx);

        onValueChange(newValue);
        onStyleChange(newValue);
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
    };

    // const onDragEnd = (result) => {
    //     const { destination, source } = result;

    //     if (!result.destination) {
    //         return;
    //     }

    //     const newLanguages = reorder(value, source.index, destination.index);
    //     setOpenLast(null);
    //     onValueChange(newLanguages);
    //     onStyleChange(newLanguages);
    // };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-repeater'}>
        <ControlHeadingSimple
            id={`${id}-repeater`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'repeater-wrapper'}>
                {value.length === 0 ? <div className="repeater-empty" onClick={addNewItem}>
                    {__('Click Add Item to Add List', '--gctd--')}
                </div> : <>
                    <DragDropList list={value} setList={onValueChange}>
                        {value.map((item, index) => {
                            return (
                                <RepeaterItem
                                    key={item._key === undefined ? `${id}-${index}` : item._key}
                                    id={item._key === undefined ? `${id}-${index}` : item._key}
                                    index={index}
                                    values={value}
                                    options={options}
                                    onValueChange={onValueChange}
                                    onStyleChange={onStyleChange}
                                    titleFormat={titleFormat}
                                    onRemove={() => removeIndex(index)}
                                    onDuplicate={() => duplicateIndex(index)}
                                    initialOpen={index === openLast}
                                />
                            );
                        })
                        }
                    </DragDropList>
                </>}
                <div className={'repeater-add-wrapper'}>
                    <Button isPrimary={true} onClick={addNewItem}>
                        {__('Add Item', '--gctd--')}
                    </Button>
                </div>
            </div>
        </div>
    </div>;
};

export default withParentControl(RepeaterControl);
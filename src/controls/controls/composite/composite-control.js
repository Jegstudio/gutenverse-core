import { useEffect, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { chevronUp, chevronDown } from '@wordpress/icons';
import { Icon } from '@wordpress/components';
import { withParentControl } from 'gutenverse-core/hoc';
import classnames from 'classnames';
import template from 'lodash/template';
import cryptoRandomString from 'crypto-random-string';

const CompositeComponent = ({ component: Component, index, itemProps, value = {}, onValueChange, onStyleChange }) => {
    const { id, onChange } = itemProps;

    const onCompositeComponentChange = (val) => {
        const newVal = {
            ...value,
            [id]: val,
        };

        onValueChange(newVal);

        onChange ? onChange({
            ...newVal
        }, index) : null;
    };

    const onCompositeStyleChange = (val) => {
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
        onValueChange={onCompositeComponentChange}
        onStyleChange={onCompositeStyleChange}
    />;
};

const processTitle = (format, values, index) => {
    if (typeof format === 'function') {
        return format(values, index);
    } else {
        return template(format)({ value: values});
    }
};

const CompositeItem = ({
    titleFormat,
    values,
    options,
    index,
    onValueChange,
    onStyleChange,
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

    const itemClass = classnames('composite-item', open ? 'open' : 'close');
    const title = processTitle(titleFormat, values[index], index);

    return <div>
        <div className={itemClass}>
            <div className={'composite-header'} onClick={() => toggleOpen()}>
                <div className={'composite-title'} dangerouslySetInnerHTML={{ __html: title }} />
                <div className={'repeater-arrow-up'}>
                    <Icon icon={ chevronUp }/>
                </div>
                <div className={'repeater-arrow-down'}>
                    <Icon icon={ chevronDown }/>
                </div>
            </div>
            {open && <div className={'composite-body'}>
                {options.map(item => {
                    const showControl = item.show !== undefined ? item.show(values[index]) : true;

                    return showControl && <CompositeComponent
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
        </div>
    </div>;

};

const CompositeControl = ({
    label,
    allowDeviceControl,
    value = [],
    onValueChange,
    onStyleChange,
    options,
    titleFormat,
    description = '',
}) => {
    const id = useInstanceId(CompositeControl, 'inspector-composite-control');
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

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-composite'}>
        <ControlHeadingSimple
            id={`${id}-composite`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'composite-wrapper'}>
                {value.length &&
                    <div>
                        <div className={'composite-container'}>
                            {value.map((item, index) => {
                                return <CompositeItem
                                    key={item._key === undefined ? `${id}-${index}` : item._key}
                                    id={item._key === undefined ? `${id}-${index}` : item._key}
                                    index={index}
                                    values={value}
                                    options={options}
                                    onValueChange={onValueChange}
                                    onStyleChange={onStyleChange}
                                    titleFormat={titleFormat}
                                    initialOpen={index === openLast}
                                />;
                            })}
                        </div>
                    </div>}
            </div>
        </div>
    </div>;
};

export default withParentControl(CompositeControl);
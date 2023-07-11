import { useState, useEffect } from '@wordpress/element';
// import Select, { components } from 'react-select';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core-editor/hoc';
import { withDeviceControl } from 'gutenverse-core-editor/hoc';
// import { __ } from '@wordpress/i18n';
// import {
//     SortableContainer,
//     SortableElement,
//     SortableHandle,
// } from 'react-sortable-hoc';

function arrayMove(array, from, to) {
    const slicedArray = array.slice();
    slicedArray.splice(
        to < 0 ? array.length + to : to,
        0,
        slicedArray.splice(from, 1)[0]
    );
    return slicedArray;
}

// const SortableMultiValue = SortableElement(
//     (props) => {
//         const onMouseDown = (e) => {
//             e.preventDefault();
//             e.stopPropagation();
//         };
//         const innerProps = { ...props.innerProps, onMouseDown };
//         return <components.MultiValue {...props} innerProps={innerProps} />;
//     }
// );

// const SortableMultiValueLabel = SortableHandle(
//     (props) => <components.MultiValueLabel {...props} />
// );

// const SortableSelect = SortableContainer(Select);

const  SelectSortableControl = props => {
    const {
        label,
        allowDeviceControl,
        value = allowDeviceControl ? {} : '',
        onValueChange,
        onStyleChange,
        options,
        description = '',
        proLabel,
    } = props;

    const [selected, setSelected] = useState([]);

    const id = useInstanceId(SelectSortableControl, 'inspector-select-async-control');

    const onChange = (selectedOptions) => {
        onValueChange(selectedOptions);
        onStyleChange(selectedOptions);
    };

    const customStyles = {
        input: () => {
            return {
                padding: 0,
                margin: 0
            };
        },
        control: (provided) => {
            return {
                ...provided,
                borderRadius: '1px'
            };
        },
        menu: (provided) => {
            return {
                ...provided,
                zIndex: 99999
            };
        }
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newValue = arrayMove(selected, oldIndex, newIndex);
        onValueChange(newValue);
        onStyleChange(newValue);
    };

    useEffect(() => {
        setSelected(value);
    }, [value]);

    return (
        <div id={id} className={'gutenverse-control-wrapper gutenverse-control-select-sortable'}>
            <ControlHeadingSimple
                id={`${id}-select`}
                label={label}
                description={description}
                proLabel={proLabel}
                allowDeviceControl={allowDeviceControl}
            />
            <div className={'control-body'}>
                <div className={'control-select'}>
                    {/* <SortableSelect
                        useDragHandle
                        id={`${id}-select`}
                        axis="xy"
                        onSortEnd={onSortEnd}
                        distance={4}
                        getHelperDimensions={({ node }) => node.getBoundingClientRect()}
                        isMulti
                        options={options}
                        styles={customStyles}
                        value={selected}
                        onChange={onChange}
                        components={{
                            MultiValue: SortableMultiValue,
                            MultiValueLabel: SortableMultiValueLabel,
                        }}
                        closeMenuOnSelect={false}
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default compose(withParentControl, withDeviceControl)(SelectSortableControl);


import { useInstanceId } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import ControlHeadingSimple from '../part/control-heading-simple';
import AsyncSelect from 'react-select/async';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { __ } from '@wordpress/i18n';

/**
 * SelectSearchControl - Async select search control with support for single and multi select.
 *
 * @param {Object}   props                    - Control props.
 * @param {boolean}  props.onlyValue          - When true, only the value (not the full {label, value} object) is saved.
 *                                              The component will use local state to track the selected option for display,
 *                                              and will resolve stored values on mount via onSearch({ include: value }).
 *                                              Default: false.
 */
const SelectSearchControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = allowDeviceControl ? {} : [],
        values,
        onValueChange,
        onSearch,
        isMulti = false,
        description = '',
        noOptionsText,
        cacheOptions = true,
        defaultOptions = true,
        components,
        onlyValue = false,
        deviceType,
    } = props;

    const [selectedOption, setSelectedOption] = useState(allowDeviceControl ? {} : []);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!onlyValue) return;
        const hasValue = isMulti ? (Array.isArray(value) && value.length > 0) : !!value;
        if (hasValue) {
            setLoading(true);
            onSearch({ include: value }).then(data => {
                if (Array.isArray(data)) {
                    setSelectedOption(isMulti ? data : data[0] || null);
                }
                setLoading(false);
            }).catch(() => setLoading(false));
        } else {
            setSelectedOption(isMulti ? [] : null);
        }
    }, [deviceType]);

    const noOptionsMessage = () => noOptionsText ? noOptionsText : __('Type to start searching...', '--gctd--');

    const onChange = option => {
        if (onlyValue) {
            setSelectedOption(option);
            if (option) {
                if (isMulti) {
                    onValueChange(Array.isArray(option) ? option.map(opt => opt.value) : []);
                } else {
                    onValueChange(option.value);
                }
            } else {
                onValueChange(isMulti ? [] : '');
            }
        } else {
            onValueChange(option);
        }
    };

    const customStyles = {
        input: (provided) => {
            return {
                ...provided,
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
                zIndex: 999
            };
        }
    };

    const id = useInstanceId(SelectSearchControl, 'inspector-select-async-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-select-async'}>
        <ControlHeadingSimple
            id={`${id}-select-async`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'control-select-async'}>
                <AsyncSelect
                    id={`${id}-select-async`}
                    placeholder={__('Search...', '--gctd--')}
                    noOptionsMessage={noOptionsMessage}
                    isMulti={isMulti}
                    styles={customStyles}
                    value={onlyValue ? selectedOption : value}
                    cacheOptions={cacheOptions}
                    defaultOptions={defaultOptions}
                    components={components}
                    isLoading={onlyValue ? loading : false}
                    onChange={onChange}
                    loadOptions={input => onlyValue
                        ? onSearch({
                            type: 'search',
                            search: input,
                            exclude: isMulti && Array.isArray(selectedOption) ? selectedOption.map(opt => opt.value) : false,
                        })
                        : onSearch(input, values)
                    } />
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(SelectSearchControl);

import { useInstanceId } from '@wordpress/compose';
import { useState, useEffect, useRef, useCallback } from '@wordpress/element';
import ControlHeadingSimple from '../part/control-heading-simple';
import AsyncSelect from 'react-select/async';
import Select, { components as SelectComponents } from 'react-select';
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
        loadmore = false,
    } = props;

    const paged = useRef(1);
    const inputValue = useRef('');
    const request = useRef(0);

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(allowDeviceControl ? {} : []);
    const [loading, setLoading] = useState(false);
    const [loadingOptions, setLoadingOptions] = useState(false);
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

    const searchOptions = useCallback((input, page) => {
        return onlyValue
            ? onSearch({
                type: 'search',
                search: input,
                ...(loadmore ? { paged: page } : {}),
                exclude: isMulti && Array.isArray(selectedOption) ? selectedOption.map(opt => opt.value) : false,
            })
            : loadmore ? onSearch(input, values, page) : onSearch(input, values);
    }, [isMulti, loadmore, onlyValue, onSearch, selectedOption, values]);

    const getOptionKey = option => {
        if (option?.value !== undefined && option?.value !== null) {
            return `value:${option.value}`;
        }

        if (option?.id !== undefined && option?.id !== null) {
            return `id:${option.id}`;
        }

        return null;
    };

    const mergeOptionGroup = (currentGroup, nextGroup) => {
        const currentOptions = currentGroup.options || [];
        const seen = new Set(currentOptions.map(getOptionKey).filter(key => key !== null));

        return {
            ...currentGroup,
            ...nextGroup,
            options: [
                ...currentOptions,
                ...(nextGroup.options || []).filter(option => {
                    const key = getOptionKey(option);

                    if (key === null) {
                        return true;
                    }

                    if (seen.has(key)) {
                        return false;
                    }

                    seen.add(key);
                    return true;
                })
            ]
        };
    };

    const mergeOptions = useCallback((currentOptions, nextOptions) => {
        const mergedOptions = [...currentOptions];

        nextOptions.forEach(nextOption => {
            if (Array.isArray(nextOption.options)) {
                const groupIndex = mergedOptions.findIndex(option => option.label === nextOption.label && Array.isArray(option.options));

                if (groupIndex >= 0) {
                    mergedOptions[groupIndex] = mergeOptionGroup(mergedOptions[groupIndex], nextOption);
                } else {
                    mergedOptions.push(nextOption);
                }

                return;
            }

            const key = getOptionKey(nextOption);
            const exists = key !== null && mergedOptions.some(option => getOptionKey(option) === key);

            if (!exists) {
                mergedOptions.push(nextOption);
            }
        });

        return mergedOptions;
    }, []);

    const loadOptions = useCallback(input => {
        paged.current = 1;
        inputValue.current = input;

        if (!loadmore) {
            return searchOptions(input, 1);
        }

        const currentRequest = request.current + 1;
        request.current = currentRequest;
        setLoadingOptions(true);

        return Promise.resolve(searchOptions(input, 1)).then(data => {
            const nextOptions = Array.isArray(data) ? data : [];

            if (request.current === currentRequest) {
                setOptions(nextOptions);
                setLoadingOptions(false);
            }

            return nextOptions;
        }).catch(() => {
            if (request.current === currentRequest) {
                setOptions([]);
                setLoadingOptions(false);
            }

            return [];
        });
    }, [loadmore, searchOptions]);

    const loadMoreOptions = useCallback(event => {
        event.preventDefault();
        event.stopPropagation();

        if (loadingOptions) {
            return;
        }

        const nextPage = paged.current + 1;
        const currentRequest = request.current + 1;
        request.current = currentRequest;
        setLoadingOptions(true);

        Promise.resolve(searchOptions(inputValue.current, nextPage)).then(data => {
            const nextOptions = Array.isArray(data) ? data : [];

            if (request.current === currentRequest) {
                paged.current = nextPage;
                setOptions(currentOptions => mergeOptions(currentOptions, nextOptions));
                setLoadingOptions(false);
            }
        }).catch(() => {
            if (request.current === currentRequest) {
                setLoadingOptions(false);
            }
        });
    }, [loadingOptions, mergeOptions, searchOptions]);

    const onInputChange = useCallback((input, actionMeta) => {
        if (actionMeta.action === 'input-change') {
            loadOptions(input);
        }

        return input;
    }, [loadOptions]);

    useEffect(() => {
        if (!loadmore) {
            return;
        }

        if (Array.isArray(defaultOptions)) {
            setOptions(defaultOptions);
            return;
        }

        if (defaultOptions) {
            loadOptions('');
        }
    }, [defaultOptions, loadOptions, loadmore]);

    const renderedComponents = loadmore
        ? {
            ...(typeof components === 'object' ? components : {}),
            MenuList: props => <div>
                <SelectComponents.MenuList {...props} />
                <button
                    type="button"
                    className="guten-select-search-loadmore"
                    disabled={loadingOptions}
                    onMouseDown={event => event.preventDefault()}
                    onClick={loadMoreOptions}
                >
                    {loadingOptions ? __('Loading...', '--gctd--') : __('Load More', '--gctd--')}
                </button>
            </div>
        }
        : components;

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
    const SelectComponent = loadmore ? Select : AsyncSelect;

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-select-async'}>
        <ControlHeadingSimple
            id={`${id}-select-async`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'control-select-async'}>
                <SelectComponent
                    id={`${id}-select-async`}
                    placeholder={__('Search...', '--gctd--')}
                    noOptionsMessage={noOptionsMessage}
                    isMulti={isMulti}
                    styles={customStyles}
                    value={onlyValue ? selectedOption : value}
                    cacheOptions={cacheOptions}
                    defaultOptions={defaultOptions}
                    components={renderedComponents}
                    isLoading={loadmore ? (loading || loadingOptions) : (onlyValue ? loading : false)}
                    onChange={onChange}
                    options={loadmore ? options : undefined}
                    filterOption={loadmore ? null : undefined}
                    onInputChange={loadmore ? onInputChange : undefined}
                    loadOptions={loadmore ? undefined : loadOptions} />
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(SelectSearchControl);

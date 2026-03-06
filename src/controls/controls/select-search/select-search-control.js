
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import AsyncSelect from 'react-select/async';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { __ } from '@wordpress/i18n';

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
        components
    } = props;

    const noOptionsMessage = () => noOptionsText ? noOptionsText : __('Type to start searching...', '--gctd--');

    const onChange = value => {
        onValueChange(value);
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
                    value={value}
                    cacheOptions={cacheOptions}
                    defaultOptions={defaultOptions}
                    components={components}
                    onChange={onChange}
                    loadOptions={input => onSearch(input, values)} />
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(SelectSearchControl);
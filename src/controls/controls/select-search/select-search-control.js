
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import AsyncSelect from 'react-select/async';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core-editor/hoc';
import { withDeviceControl } from 'gutenverse-core-editor/hoc';
import { __ } from '@wordpress/i18n';

const SelectSearchControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = allowDeviceControl ? {} : [],
        values,
        onValueChange,
        onStyleChange,
        onSearch,
        isMulti = false,
        description = '',
        noOptionsText,
        cacheOptions = true,
        defaultOptions = true
    } = props;

    const noOptionsMessage = () => noOptionsText ? noOptionsText : __('Type to start searching...', 'gutenverse');

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
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
                    placeholder={__('Search...', 'gutenverse')}
                    noOptionsMessage={noOptionsMessage}
                    isMulti={isMulti}
                    styles={customStyles}
                    value={value}
                    cacheOptions={cacheOptions}
                    defaultOptions={defaultOptions}
                    onChange={onChange}
                    loadOptions={input => onSearch(input, values)} />
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(SelectSearchControl);
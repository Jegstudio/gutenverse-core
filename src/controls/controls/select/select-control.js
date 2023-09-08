import { useEffect, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import Select from 'react-select';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { __ } from '@wordpress/i18n';
import ProLock from '../pro-lock';

const SelectControl = (props) => {
    const { label, allowDeviceControl, value = allowDeviceControl ? {} : undefined, onValueChange, onStyleChange, isMulti = false, options, description = '', noOptionsText, proLabel, group = false } = props;

    const noOptionsMessage = () => (noOptionsText ? noOptionsText : __('No Option', '--gctd--'));

    const onChange = (value) => {
        onValueChange(value);
        onStyleChange(value);
    };

    const customStyles = {
        input: () => {
            return {
                padding: 0,
                margin: 0,
            };
        },
        control: (provided) => {
            return {
                ...provided,
                borderRadius: '1px',
            };
        },
        menu: (provided) => {
            return {
                ...provided,
                zIndex: 99999,
            };
        },
    };

    const id = useInstanceId(SelectControl, 'inspector-select-control');

    const formatOptionLabel = ({ label, pro }) => {
        return (
            <div className={`select-option${pro && ' pro'}`}>
                <div>{label}</div>
                {pro && <ProLock />}
            </div>
        );
    };

    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        if (value) {
            if (isMulti) {
                setSelectedValue(value);
            } else {
                if (group) {
                    options.map((theOptions) => {
                        const { options: opts } = theOptions;
                        opts.map((option) => {
                            if (option.value === value) {
                                setSelectedValue(option);
                            }
                        });
                    });
                } else {
                    options.map((option) => {
                        if (option.value === value) {
                            setSelectedValue(option);
                        }
                    });
                }
            }
        } else {
            setSelectedValue(null);
        }
    }, [value]);

    return (
        <div id={id} className={'gutenverse-control-wrapper gutenverse-control-select'}>
            <ControlHeadingSimple id={`${id}-select`} label={label} description={description} proLabel={proLabel} allowDeviceControl={allowDeviceControl} />
            <div className={'control-body'}>
                <div className={'control-select'}>
                    <Select
                        id={`${id}-select`}
                        isMulti={isMulti}
                        styles={customStyles}
                        value={selectedValue}
                        options={options}
                        onChange={(option) => (isMulti ? onChange(option) : onChange(option.value))}
                        noOptionsMessage={noOptionsMessage}
                        formatOptionLabel={formatOptionLabel}
                        isOptionDisabled={(option) => option.disabled || option.pro}
                        isDisabled={proLabel}
                    />
                </div>
            </div>
        </div>
    );
};

export default compose(withParentControl, withDeviceControl)(SelectControl);

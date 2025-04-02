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
    const { label, allowDeviceControl, showDeviceControlOnly, value = allowDeviceControl ? {} : undefined, onValueChange, isMulti = false, options, description = '', noOptionsText, proLabel, group = false } = props;

    const noOptionsMessage = () => (noOptionsText ? noOptionsText : __('No Option', '--gctd--'));

    const onChange = (value) => {
        onValueChange(value);
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

    const formatOptionLabel = ({ label, pro, description }) => {
        return (
            <div className={`select-option${pro && ' pro'}`}>
                <div>{label}</div>
                {pro && <ProLock
                    title={label}
                    description={description}
                />}

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
            <ControlHeadingSimple
                label={label}
                description={description}
                proLabel={proLabel}
                allowDeviceControl={allowDeviceControl}
                showDeviceControlOnly={showDeviceControlOnly}
            />
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

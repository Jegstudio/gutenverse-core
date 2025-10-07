
import { __ } from '@wordpress/i18n';
import AsyncSelect from 'react-select/async';
import { v4 as uuidv4 } from 'uuid';

const SelectSearchControl = (props) => {
    let uuid = uuidv4();
    const {
        id,
        title,
        description,
        value = '',
        values,
        onChange,
        onSearch,
        className = 'select-search',
        classNamePrefix = 'async-select',
        isMulti = false,
        noOptionsMessage = () => __('Not Found', 'gutenverse')
    } = props;

    return (
        <>
            <div className="control-wrapper control-search-select">
                <label className="control-title" htmlFor={`${id}-search-select-${uuid}`}>
                    {title}
                    <AsyncSelect
                        id={id}
                        placeholder={__('Search...', 'gutenverse')}
                        noOptionsMessage={noOptionsMessage}
                        className={className}
                        classNamePrefix={classNamePrefix}
                        isMulti={isMulti}
                        styles={{
                            control: (styles) => ({
                                ...styles,
                                width: '100%',
                                minHeight: '36px',
                                border: '1px solid var(--gtb-border)'
                            })
                        }}
                        value={value}
                        onChange={onChange}
                        loadOptions={input => onSearch(input, values)} />
                </label>
                {description !== '' && <span className="control-description">
                    {description}
                </span>}
            </div>

        </>
    );
};

export default SelectSearchControl;
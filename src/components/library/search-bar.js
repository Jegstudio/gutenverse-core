import { useState, useCallback } from '@wordpress/element';
import debounce from 'lodash/debounce';
import { IconCloseSVG, IconSearchSVG } from 'gutenverse-core-editor/icons';

const SearchBar = ({ placeholder, onChange }) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        doDebounce(event.target.value);
    };

    const emptyValue = (e) => {
        e.stopPropagation();
        onChange('');
        setValue('');
    };

    const doDebounce = useCallback(debounce((keyword) => {
        onChange(keyword);
    }, 250), []);

    return <div className="gutenverse-library-search-bar">
        <input type="text" placeholder={placeholder} value={value} onChange={e => handleChange(e)} />
        {value === '' ? <IconSearchSVG /> : <IconCloseSVG onClick={e => emptyValue(e)} />}
    </div>;
};

export default SearchBar;
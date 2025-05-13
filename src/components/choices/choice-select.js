import { useEffect, useRef, useState } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import isEmpty from 'lodash/isEmpty';

const useOnClickOutside = (ref, handler) => {
    useEffect(
        () => {
            const listener = (event) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        [ref, handler]
    );
};

const ChoiceOptionSingle = (props) => {
    const { option, hovered, setHovered, setSelected, selected } = props;
    const choiceClass = classnames(
        'choices__item choices__item--choice',
        'choices__item--selectable',
        {
            'is-highlighted': option.value === hovered,
            'is-selected' : selected && option === selected
        }
    );

    return <div
        className={choiceClass}
        data-select-text="Press to select"
        onMouseEnter={() => setHovered(option.value)}
        onClick={() => setSelected(option)}>
        {option.label}
    </div>;
};

const cantBeRendered = (option, values) => {
    if (isEmpty(values)) {
        return true;
    } else {
        let flag = values.filter(val => {
            const { value } = val;
            return value === option.value;
        });

        return isEmpty(flag);
    }
};

const ChoiceOptionMulti = (props) => {
    const { option, hovered, setHovered, selected, setSelected } = props;

    if (cantBeRendered(option, selected)) {
        const choiceClass = classnames(
            'choices__item choices__item--choice',
            'choices__item--selectable',
            {
                'is-highlighted': option.value === hovered
            }
        );

        return <div
            className={choiceClass}
            data-select-text="Press to select"
            onMouseEnter={() => setHovered(option.value)}
            onClick={() => setSelected(option)}>
            {option.label}
        </div>;
    } else {
        return null;
    }
};

const ChoicePlaceholderOption = (props) => {
    const { placeholder, hovered, setHovered, setSelected } = props;
    const placeholderClass = classnames(
        'choices__placeholder',
        'choices__item choices__item--choice',
        'choices__item--selectable',
        {
            'is-highlighted': 'placeholder' === hovered
        }
    );

    return <div
        className={placeholderClass}
        data-select-text="Press to select"
        onMouseEnter={() => setHovered('placeholder')}
        onClick={() => setSelected({ value: '' })}>
        {placeholder}
    </div>;
};

const ChoiceSingleOptions = (props) => {
    const { open, placeholder, setSelected, selected, setOpen, options, searchKeyword, setSearch, excludePlaceholder = false } = props;
    const [hovered, setHovered] = useState('placeholder');
    const [choices, setChoices] = useState(options);

    const updateSearch = e => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        setChoices(options.filter(option => {
            const { value, label } = option;

            if (value && label) {
                return value.search(searchKeyword) >= 0 || label.search(searchKeyword) > 0;
            } else {
                return true;
            }
        }));
    }, [searchKeyword, options]);

    const updateSelected = (value) => {
        setSelected(value);
        setSearch('');
        setOpen(false);
    };

    return <div className={`choices__list choices__list--dropdown ${open? 'is-active' : ''}`}>
        <input type="text" className="choices__input" value={searchKeyword} onChange={updateSearch} />
        <div className="choices__list">
            {!excludePlaceholder && <ChoicePlaceholderOption
                placeholder={placeholder}
                hovered={hovered}
                setHovered={setHovered}
                setSelected={setSelected} />}
            {choices.map(option => <ChoiceOptionSingle
                key={option.value}
                option={option}
                hovered={hovered}
                selected={selected}
                setHovered={setHovered}
                setSelected={updateSelected} />)}
        </div>
    </div>;
};

const ChoiceMultiOptions = props => {
    const { open, selected, setSelected, options, searchKeyword, setSearch } = props;
    const [hovered, setHovered] = useState(options[0].value);
    const [choices, setChoices] = useState(options);

    useEffect(() => {
        setChoices(options.filter(option => {
            const { value, label } = option;

            if (value && label) {
                return value.search(searchKeyword) >= 0 || label.search(searchKeyword) > 0;
            } else {
                return true;
            }
        }));
    }, [searchKeyword, options]);

    const updateSelected = (value) => {
        setSearch('');
        setSelected([
            ...selected,
            value
        ]);
    };

    return <div className={`choices__list choices__list--dropdown ${open? 'is-active' : ''}`}>
        <div className="choices__list">
            {
                choices.map(option => <ChoiceOptionMulti
                    key={option.value}
                    option={option}
                    hovered={hovered}
                    selected={selected}
                    setHovered={setHovered}
                    setSelected={updateSelected}
                />)
            }
        </div>
    </div>;
};

const ChoiceGroupMultiOptions = props => {
    const { open, selected, setSelected, options, searchKeyword, setSearch } = props;
    const [hovered, setHovered] = useState(options[0].value);
    const [choices, setChoices] = useState(options);

    useEffect(() => {
        setChoices(options.filter(option => {
            const { value, label } = option;

            if (value && label) {
                return value.search(searchKeyword) >= 0 || label.search(searchKeyword) > 0;
            } else {
                return true;
            }
        }));
    }, [searchKeyword, options]);

    const updateSelected = (value) => {
        setSearch('');
        setSelected([
            ...selected,
            value
        ]);
    };
    const handleGroupClick = (group) => {
        let notInSelect = group.options;
        for(let i = 0; i < selected.length; i++ ){
            notInSelect = notInSelect.filter(item => item.value !== selected[i].value);
        }
        setSelected([
            ...selected,
            ...notInSelect
        ]);
    };

    return <div className={`choices__list choices__list--dropdown ${open? 'is-active' : ''}`}>
        <div className="choices__list">
            {
                choices.map(group =>
                    <div className="choices__group" key={group.value}>
                        <div
                            className="choices__heading"
                            onClick={() => handleGroupClick(group)}
                        >
                            {group.label}
                        </div>
                        {
                            group.options.map(option =>
                                <ChoiceOptionMulti
                                    key={option.value}
                                    option={option}
                                    hovered={hovered}
                                    selected={selected}
                                    setHovered={setHovered}
                                    setSelected={updateSelected}
                                />
                            )
                        }
                    </div>
                )
            }
        </div>
    </div>;
};

const ChoiceInnerSingle = ({ selected, clearSelected, placeholder }) => {
    return <>
        {selected.value ? selected.label : placeholder}
        {selected.value && <button
            onClick={clearSelected}
            type="button"
            className="choices__button">
            {__('Remove item', '--gctd--')}
        </button>}
    </>;
};

const ChoiceMultiInner = props => {
    const { selected, setSelected, setOpen, setSearch, searchKeyword, placeholder } = props;
    const [ placeholderContent, setPlaceholderContent ] = useState(placeholder);
    const innerRef = useRef();
    const inputRef = useRef();
    useEffect(() => {
        if(selected.length > 0){
            setPlaceholderContent('');
        }else{
            setPlaceholderContent(placeholder);
        }
    },[selected]);
    const choiceInnerClicked = () => {
        setOpen(true);
        inputRef.current.focus();
    };

    const removeItem = (removed) => {
        setSelected(selected.filter(item => {
            return item.value !== removed.value;
        }));
    };

    const searchOption = (e) => {
        setSearch(e.target.value);
    };

    return <div className="choices__inner" ref={innerRef} onClick={() => choiceInnerClicked()}>
        <div className="choices__list choices__list--multiple">
            {selected.map(item => {
                return <div key={item.value} className="choices__item choices__item--selectable">
                    {item.label}
                    <button type="button" className="choices__button" onClick={() => removeItem(item)}>
                        {__('Remove item', '--gctd--')}
                    </button>
                </div>;
            })}
        </div>
        <input type="text" className="choices__input" ref={inputRef} onChange={searchOption} placeholder={placeholderContent} value={searchKeyword} />
    </div >;
};

const ChoiceSingleInner = (props) => {
    const { selected, setSelected, placeholder, setOpen } = props;
    const innerRef = useRef();
    const choiceClass = classnames(
        'choices__item',
        'choices__item--selectable',
        {
            'choices__placeholder': selected.value === ''
        }
    );

    const clearSelected = () => {
        setSelected({ value: '' });
    };

    const toggleOpen = () => setOpen(flag => !flag);

    return <div className="choices__inner" ref={innerRef} onClick={() => toggleOpen()}>
        <div className="choices__list choices__list--single" >
            <div className={choiceClass}>
                <ChoiceInnerSingle
                    selected={selected}
                    clearSelected={clearSelected}
                    placeholder={placeholder}
                />
            </div>
        </div>
    </div>;
};

const ChoiceSelect = (props) => {
    const { placeholder, multi, selected, setSelected, isGroup = false } = props;
    const [searchKeyword, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const selectRef = useRef();
    const theProps = {
        ...props,
        open,
        placeholder,
        selected,
        setSelected,
        searchKeyword,
        setSearch,
        setOpen,
    };

    const choiceClasses = classnames(
        'choices',
        {
            'is-open': open
        }
    );

    useOnClickOutside(selectRef, () => setOpen(false));

    return <div
        className={choiceClasses}
        data-type={multi ? 'select-multiple' : 'select-one'}
        ref={selectRef}
    >
        {multi ? isGroup ? <>
            <ChoiceMultiInner {...theProps} />
            <ChoiceGroupMultiOptions {...theProps} />
        </> : <>
            <ChoiceMultiInner {...theProps} />
            <ChoiceMultiOptions {...theProps} />
        </> : <>
            <ChoiceSingleInner {...theProps} />
            <ChoiceSingleOptions {...theProps} />
        </>}
    </div>;
};

export default ChoiceSelect;
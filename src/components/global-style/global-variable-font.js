import { Tooltip } from '@wordpress/components';
import { useState, useRef, createPortal } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import cryptoRandomString from 'crypto-random-string';
import { Edit2, RefreshCw, Trash } from 'react-feather';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { PanelTutorial, SelectControl } from 'gutenverse-core/controls';
import { Prompt, PromptContent, PromptHeader } from 'gutenverse-core/components';
import { IconCloseSVG } from 'gutenverse-core/icons';
import { FontControl, RangeControl, SizeControl } from 'gutenverse-core/controls';
import { injectFont } from 'gutenverse-core/styling';
import { Notice } from 'gutenverse-core/components';
import { slugify } from 'gutenverse-core/helper';

const handleFont = (typography, props, id) => {
    const weight = typography.weight && typography.style === 'italic' ? `${typography.weight}italic` : typography.weight;
    injectFont({
        controlId: id,
        addFont: props.addFont,
        font: typography.font,
        weight
    });
};

const ThePrompt = ({ openPopup, closePopup, deleteColor, value }) => {
    return openPopup ? <Prompt closePrompt={() => closePopup()} className={'variable-font'}>
        <PromptHeader>
            <>
                <h3>{__('Delete Font Variable', '--gctd--')}</h3>
                <div className={'gutenverse-close'} onClick={() => closePopup()}>
                    <IconCloseSVG size={20} />
                </div>
            </>
        </PromptHeader>
        <PromptContent>
            <>
                <p>{__('You are about to delete one of your Font Variable. If you are assign this variable to blocks, it will lost the typography.', '--gctd--')}</p>
                <div className={'prompt-buttons'}>
                    <div className={'prompt-button cancel'} onClick={() => closePopup()}>
                        {__('Cancel', '--gctd--')}
                    </div>
                    <div className={'prompt-button submit'} onClick={() => {
                        deleteColor(value.id);
                        closePopup();
                    }}>
                        {__('Delete', '--gctd--')}
                    </div>
                </div>
            </>
        </PromptContent>
    </Prompt> : null;
};

const SingleVariableFont = ({ value, updateFont, deleteFont, checkDoubleSlug }) => {
    const [open, setControlOpen] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [slugLock, setSlugLock] = useState(true);
    const [editorWarn, setEditorWarn] = useState(false);

    const wrapperRef = useRef();
    const fontRef = useRef();

    const toggleOpen = () => {
        setControlOpen(open => !open);
    };

    const editName = (e) => {
        updateFont({
            ...value,
            name: e.target.value
        });
    };

    const bodyClass = classnames('control-body', 'control-toggle-body', 'triangle', {
        ['hide']: !open
    });

    const toggleClass = classnames('typography-icon', {
        ['active']: open
    });

    const editSlug = (e) => {
        let slug = slugify(e.target.value);
        slug = checkDoubleSlug(slug);

        updateFont({
            ...value,
            id: slug
        });
    };

    const onTypographyChange = font => updateFont({ ...value, font });

    return <div className={classnames('gutenverse-control-wrapper', 'gutenverse-control-typography')}>
        <div className={'single-variable-font-wrapper'}>
            <div className={'single-variable-item-wrapper'}>
                <Tooltip text={__('Edit', '--gctd--')}>
                    <div className={toggleClass} onClick={() => toggleOpen()} ref={fontRef}>
                        <Edit2 size={12} />
                    </div>
                </Tooltip>
                <input type="text" value={value.name} onChange={editName} className={'font-name'} />
            </div>
            <Tooltip text={__('Delete', '--gctd--')}>
                <div className={'font-delete'} onClick={() => setOpenPopup(true)}>
                    <Trash size={12} />
                </div>
            </Tooltip>
        </div>
        {open && <div className={'gutenverse-variable-detail-wrapper'}>
            <div className={bodyClass} ref={wrapperRef}>
                <div className={'gutenverse-control-heading'}>
                    <h2>
                        {__('Typography', '--gctd--')}
                    </h2>
                    <Tooltip text={__('Refresh', '--gctd--')} key={'reset'}>
                        <span>
                            <RefreshCw onClick={() => onTypographyChange({})} />
                        </span>
                    </Tooltip>
                </div>
                <>
                    <FontControl
                        label={__('Font Family', '--gctd--')}
                        value={value.font.font}
                        onValueChange={font => onTypographyChange({ ...value.font, font })}
                    />
                    <div className={'font-value-wrapper'}>
                        <div>
                            <SizeControl
                                label={__('Size', '--gctd--')}
                                value={value.font.size}
                                allowDeviceControl={true}
                                hideRange={true}
                                onValueChange={size => onTypographyChange({ ...value.font, size })}
                                onLocalChange={size => onTypographyChange({ ...value.font, size })}
                            />
                            <SelectControl
                                label={__('Weight', '--gctd--')}
                                value={value.font.weight}
                                onValueChange={weight => onTypographyChange({ ...value.font, weight })}
                                options={[
                                    {
                                        label: __('Default', '--gctd--'),
                                        value: 'default'
                                    },
                                    {
                                        label: __('Normal', '--gctd--'),
                                        value: 'normal'
                                    },
                                    {
                                        label: __('Bold', '--gctd--'),
                                        value: 'bold'
                                    },
                                    {
                                        label: '100',
                                        value: '100'
                                    },
                                    {
                                        label: '200',
                                        value: '200'
                                    },
                                    {
                                        label: '300',
                                        value: '300'
                                    },
                                    {
                                        label: '400',
                                        value: '400'
                                    },
                                    {
                                        label: '500',
                                        value: '500'
                                    },
                                    {
                                        label: '600',
                                        value: '600'
                                    },
                                    {
                                        label: '700',
                                        value: '700'
                                    },
                                    {
                                        label: '800',
                                        value: '800'
                                    },
                                    {
                                        label: '900',
                                        value: '900'
                                    },
                                ]}
                            />
                            <SelectControl
                                label={__('Decoration', '--gctd--')}
                                value={value.font.decoration}
                                onValueChange={decoration => onTypographyChange({ ...value.font, decoration })}
                                options={[
                                    {
                                        label: __('Default', '--gctd--'),
                                        value: 'default'
                                    },
                                    {
                                        label: __('Underline', '--gctd--'),
                                        value: 'underline'
                                    },
                                    {
                                        label: __('Overline', '--gctd--'),
                                        value: 'overline'
                                    },
                                    {
                                        label: __('Line Through', '--gctd--'),
                                        value: 'line-through'
                                    },
                                    {
                                        label: __('None', '--gctd--'),
                                        value: 'none'
                                    },
                                ]}
                            />
                        </div>
                        <div>
                            <SizeControl
                                label={__('Line Height', '--gctd--')}
                                value={value.font.lineHeight}
                                allowDeviceControl={true}
                                hideRange={true}
                                units={{
                                    px: {
                                        text: 'px',
                                        min: 1,
                                        max: 200,
                                        step: 1,
                                        unit: 'px',
                                    },
                                    em: {
                                        text: 'em',
                                        min: 0.1,
                                        max: 10,
                                        step: 0.1,
                                        unit: 'em',
                                    },
                                }}
                                onValueChange={lineHeight => onTypographyChange({ ...value.font, lineHeight })}
                                onLocalChange={lineHeight => onTypographyChange({ ...value.font, lineHeight })}
                            />
                            <SelectControl
                                label={__('Transform', '--gctd--')}
                                value={value.font.transform}
                                onValueChange={transform => onTypographyChange({ ...value.font, transform })}
                                options={[
                                    {
                                        label: __('Default', '--gctd--'),
                                        value: 'default'
                                    },
                                    {
                                        label: __('Uppercase', '--gctd--'),
                                        value: 'uppercase'
                                    },
                                    {
                                        label: __('Lowercase', '--gctd--'),
                                        value: 'lowercase'
                                    },
                                    {
                                        label: __('Capitalize', '--gctd--'),
                                        value: 'capitalize'
                                    },
                                    {
                                        label: __('Normal', '--gctd--'),
                                        value: 'normal'
                                    },
                                ]}
                            />
                            <SelectControl
                                label={__('Style', '--gctd--')}
                                value={value.font.style}
                                onValueChange={style => onTypographyChange({ ...value.font, style })}
                                options={[
                                    {
                                        label: __('Default', '--gctd--'),
                                        value: 'default'
                                    },
                                    {
                                        label: __('Normal', '--gctd--'),
                                        value: 'normal'
                                    },
                                    {
                                        label: __('Italic', '--gctd--'),
                                        value: 'italic'
                                    },
                                    {
                                        label: __('Oblique', '--gctd--'),
                                        value: 'oblique'
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <RangeControl
                        label={__('Letter Spacing', '--gctd--')}
                        min={-10}
                        max={10}
                        step={0.1}
                        value={value.font.spacing}
                        allowDeviceControl={true}
                        onValueChange={spacing => onTypographyChange({ ...value.font, spacing })}
                        onLocalChange={spacing => onTypographyChange({ ...value.font, spacing })}
                    />
                </>
            </div>
            <div className={'gutenverse-variable-slug'}>
                <div className={'gutenverse-control-heading'}>
                    <h2>
                        {__('Typography Slug', '--gctd--')}
                    </h2>
                </div>
                <div className={'variable-input-wrapper'}>
                    {slugLock ? <>
                        <div className={'variable-input'}>
                            <input type="text" value={value.id} readOnly />
                        </div>
                        <div className={'variable-input-lock'} onClick={() => setEditorWarn(true)}>
                            <Tooltip placement="bottom" text={__('Unlock to edit slug', '--gctd--')}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.83268 5.83464C5.83268 3.53297 7.69768 1.66797 9.99935 1.66797C12.301 1.66797 14.166 3.53297 14.166 5.83464V8.33464H14.4993C15.2327 8.33464 15.8327 8.93464 15.8327 9.66797V15.5013C15.8327 16.6013 14.9327 17.5013 13.8327 17.5013H6.16602C5.06602 17.5013 4.16602 16.6013 4.16602 15.5013V9.66797C4.16602 8.93464 4.76602 8.33464 5.49935 8.33464H5.83268V5.83464ZM12.4993 5.83464V8.33464H7.49935V5.83464C7.49935 4.45297 8.61768 3.33464 9.99935 3.33464C11.381 3.33464 12.4993 4.45297 12.4993 5.83464ZM9.99935 10.2096C9.66796 10.2093 9.34634 10.3218 9.08746 10.5287C8.82858 10.7356 8.64787 11.0244 8.5751 11.3477C8.50232 11.671 8.54183 12.0095 8.68711 12.3073C8.83239 12.6051 9.07478 12.8446 9.37435 12.9863V15.0013C9.37435 15.1671 9.4402 15.326 9.55741 15.4432C9.67462 15.5605 9.83359 15.6263 9.99935 15.6263C10.1651 15.6263 10.3241 15.5605 10.4413 15.4432C10.5585 15.326 10.6243 15.1671 10.6243 15.0013V12.9863C10.9239 12.8446 11.1663 12.6051 11.3116 12.3073C11.4569 12.0095 11.4964 11.671 11.4236 11.3477C11.3508 11.0244 11.1701 10.7356 10.9112 10.5287C10.6524 10.3218 10.3307 10.2093 9.99935 10.2096Z" fill="#FFB200" />
                                </svg>
                            </Tooltip>
                        </div>
                    </> : <>
                        <div className={'variable-input'}>
                            <input type="text" value={value.id} onChange={e => editSlug(e)} />
                        </div>
                        <div className={'variable-input-lock'} onClick={() => setSlugLock(true)}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.83268 5.83258C5.83128 4.81744 6.20053 3.8367 6.87108 3.07455C7.54164 2.31239 8.46736 1.82125 9.47442 1.69336C10.4815 1.56547 11.5006 1.80963 12.3404 2.37998C13.1801 2.95033 13.7828 3.80764 14.0352 4.79091C14.0904 5.00497 14.0584 5.2322 13.9461 5.42263C13.8338 5.61305 13.6505 5.75108 13.4364 5.80633C13.2224 5.86158 12.9951 5.82954 12.8047 5.71725C12.6143 5.60497 12.4763 5.42163 12.421 5.20758C12.2697 4.61747 11.9081 4.1029 11.4042 3.76056C10.9003 3.41822 10.2887 3.27165 9.6844 3.3484C9.08005 3.42514 8.52452 3.71992 8.12218 4.17735C7.71983 4.63478 7.49835 5.22338 7.49935 5.83258V8.33258H14.4993C15.2327 8.33258 15.8327 8.93258 15.8327 9.66591V15.4992C15.8327 16.5992 14.9327 17.4992 13.8327 17.4992H6.16602C5.06602 17.4992 4.16602 16.5992 4.16602 15.4992V9.66591C4.16602 8.93258 4.76602 8.33258 5.49935 8.33258H5.83268V5.83258ZM9.99935 10.2076C9.66796 10.2072 9.34634 10.3198 9.08746 10.5266C8.82858 10.7335 8.64787 11.0224 8.5751 11.3457C8.50232 11.669 8.54183 12.0074 8.68711 12.3052C8.83239 12.6031 9.07478 12.8426 9.37435 12.9842V14.9992C9.37435 15.165 9.4402 15.324 9.55741 15.4412C9.67462 15.5584 9.83359 15.6242 9.99935 15.6242C10.1651 15.6242 10.3241 15.5584 10.4413 15.4412C10.5585 15.324 10.6243 15.165 10.6243 14.9992V12.9842C10.9239 12.8426 11.1663 12.6031 11.3116 12.3052C11.4569 12.0074 11.4964 11.669 11.4236 11.3457C11.3508 11.0224 11.1701 10.7335 10.9112 10.5266C10.6524 10.3198 10.3307 10.2072 9.99935 10.2076Z" fill="#12B76A" />
                            </svg>
                        </div>
                    </>}
                </div>
            </div>
        </div>}
        <ThePrompt openPopup={openPopup} closePopup={() => setOpenPopup(false)} deleteColor={() => deleteFont(value.id)} value={value} />
        {editorWarn && createPortal(<Notice
            icon={<svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.83268 5.83464C5.83268 3.53297 7.69768 1.66797 9.99935 1.66797C12.301 1.66797 14.166 3.53297 14.166 5.83464V8.33464H14.4993C15.2327 8.33464 15.8327 8.93464 15.8327 9.66797V15.5013C15.8327 16.6013 14.9327 17.5013 13.8327 17.5013H6.16602C5.06602 17.5013 4.16602 16.6013 4.16602 15.5013V9.66797C4.16602 8.93464 4.76602 8.33464 5.49935 8.33464H5.83268V5.83464ZM12.4993 5.83464V8.33464H7.49935V5.83464C7.49935 4.45297 8.61768 3.33464 9.99935 3.33464C11.381 3.33464 12.4993 4.45297 12.4993 5.83464ZM9.99935 10.2096C9.66796 10.2093 9.34634 10.3218 9.08746 10.5287C8.82858 10.7356 8.64787 11.0244 8.5751 11.3477C8.50232 11.671 8.54183 12.0095 8.68711 12.3073C8.83239 12.6051 9.07478 12.8446 9.37435 12.9863V15.0013C9.37435 15.1671 9.4402 15.326 9.55741 15.4432C9.67462 15.5605 9.83359 15.6263 9.99935 15.6263C10.1651 15.6263 10.3241 15.5605 10.4413 15.4432C10.5585 15.326 10.6243 15.1671 10.6243 15.0013V12.9863C10.9239 12.8446 11.1663 12.6051 11.3116 12.3073C11.4569 12.0095 11.4964 11.671 11.4236 11.3477C11.3508 11.0244 11.1701 10.7356 10.9112 10.5287C10.6524 10.3218 10.3307 10.2093 9.99935 10.2096Z" fill="#FFB200" />
            </svg>}
            title={__('Font Slug Edit is Locked', '--gctd--')}
            description={__('Warning: All blocks assigned to this will lose their font. Only unlock if you understand the consequences', '--gctd--')}
            buttonText={__('Unlock Slug', '--gctd--')}
            onClick={() => {
                setSlugLock(false);
                setEditorWarn(false);
            }}
            onClose={() => setEditorWarn(false)}
            scheme="danger"
        />, document.getElementById('gutenverse-root'))}
    </div>;
};

const GlobalVariableFont = (props) => {
    let { variableFont, addFontVar, editFontVar, deleteFontVar, addFont } = props;

    if (typeof variableFont === 'object') {
        variableFont = Object.values(variableFont);
    }

    const addVariableFont = () => {
        const newFont = {
            id: cryptoRandomString({ length: 6, type: 'alphanumeric' }),
            name: __('Variable Font', '--gctd--'),
            font: {}
        };

        addFontVar(newFont);
    };

    const updateVariableFont = (font, index) => {
        editFontVar(font, index);

        if (font.font) {
            handleFont(font.font, { addFont: addFont }, font.id);
        }
    };

    const deleteVariableFont = id => {
        deleteFontVar(id);
    };

    const checkDoubleSlug = (slug, idx, fonts) => {
        let doubleFlag = false;
        fonts.forEach((item, index) => {
            if (index !== idx && item.id === slug) {
                doubleFlag = true;
            }
        });

        if (doubleFlag) {
            const newSlug = `${slug}-${Math.floor(Math.random() * 100)}`;
            return checkDoubleSlug(newSlug, idx, fonts);
        } else {
            return slug;
        }
    };

    return <>
        <PanelTutorial
            style={{ margin: '0 0 15px' }}
            title={__('Font Variable', '--gctd--')}
            list={[
                {
                    title: __('Where it shown?', '--gctd--'),
                    description: __('All Font Registered on this panel, will shown on each typography option of block.', '--gctd--')
                },
                {
                    title: __('What happened if i change this option.', '--gctd--'),
                    description: __('By Changing this option, you will also change every block typograhpy assigned to this option.', '--gctd--')
                },
                {
                    title: __('Save Behaviour', '--gctd--'),
                    description: __('Option will automatically saved after you change it.', '--gctd--')
                }
            ]}
        />
        {isEmpty(variableFont) ? <div className={'font-variable-wrapper'}>
            <div className="empty-variable" onClick={() => addVariableFont()}>
                {__('Empty Variable Font', '--gctd--')}
            </div>
            <div className={'font-variable-add'}>
                <div onClick={() => addVariableFont()} >
                    {__('Create Font', '--gctd--')}
                </div>
            </div>
        </div> : <div className={'font-variable-wrapper'}>
            {variableFont.map((value, index) => {
                return <SingleVariableFont
                    key={index}
                    value={value}
                    updateFont={(font) => updateVariableFont(font, index)}
                    deleteFont={deleteVariableFont}
                    checkDoubleSlug={slug => checkDoubleSlug(slug, index, variableFont)}
                />;
            })}
            <div className={'font-variable-add'}>
                <div onClick={() => addVariableFont()}>
                    {__('Add Font', '--gctd--')}
                </div>
            </div>
        </div>}
    </>;
};

export default GlobalVariableFont;
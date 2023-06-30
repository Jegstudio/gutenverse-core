import { Tooltip } from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import cryptoRandomString from 'crypto-random-string';
import { Edit2, RefreshCw, Trash } from 'react-feather';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import { PanelTutorial, SelectControl } from 'gutenverse-core/controls';
import { Prompt, PromptContent, PromptHeader} from 'gutenverse-core/components';
import { IconCloseSVG } from 'gutenverse-core/icons';
import { FontControl, RangeControl, SizeControl } from 'gutenverse-core/controls';
import { injectFont } from 'gutenverse-core/controls';

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
                <h3>{__('Delete Font Variable', 'gutenverse')}</h3>
                <div className={'gutenverse-close'} onClick={() => closePopup()}>
                    <IconCloseSVG size={20} />
                </div>
            </>
        </PromptHeader>
        <PromptContent>
            <>
                <p>{__('You are about to delete one of your Font Variable. If you are assign this variable to blocks, it will lost the typography.', 'gutenverse')}</p>
                <div className={'prompt-buttons'}>
                    <div className={'prompt-button cancel'} onClick={() => closePopup()}>
                        {__('Cancel', 'gutenverse')}
                    </div>
                    <div className={'prompt-button submit'} onClick={() => deleteColor(value.id)}>
                        {__('Delete', 'gutenverse')}
                    </div>
                </div>
            </>
        </PromptContent>
    </Prompt> : null;
};

const SingleVariableFont = ({ value, updateFont, deleteFont }) => {
    const [open, setControlOpen] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    const wrapperRef = useRef();
    const fontRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if ((wrapperRef.current && !wrapperRef.current.contains(event.target)) &&
                (fontRef.current && !fontRef.current.contains(event.target))) {
                setControlOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

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

    const onTypographyChange = font => updateFont({ ...value, font });

    return <div className={classnames('gutenverse-control-wrapper', 'gutenverse-control-typography')}>
        <div className={'single-variable-font-wrapper'}>
            <div className={'single-variable-item-wrapper'}>
                <Tooltip text={__('Edit', 'gutenverse')}>
                    <div className={toggleClass} onClick={() => toggleOpen()} ref={fontRef}>
                        <Edit2 size={12} />
                    </div>
                </Tooltip>
                <input type="text" value={value.name} onChange={editName} className={'font-name'} />
            </div>
            <Tooltip text={__('Delete', 'gutenverse')}>
                <div className={'font-delete'} onClick={() => setOpenPopup(true)}>
                    <Trash size={12} />
                </div>
            </Tooltip>
        </div>
        {open && <div className={bodyClass} ref={wrapperRef}>
            <div className={'gutenverse-control-heading'}>
                <h2>
                    {__('Typography', 'gutenverse')}
                </h2>
                <Tooltip text={__('Refresh', 'gutenverse')} key={'reset'}>
                    <span>
                        <RefreshCw onClick={() => onTypographyChange({})} />
                    </span>
                </Tooltip>
            </div>
            <>
                <FontControl
                    label={__('Font Family', 'gutenverse')}
                    value={value.font.font}
                    onValueChange={font => onTypographyChange({ ...value.font, font })}
                    onStyleChange={() => { }}
                />
                <div className={'font-value-wrapper'}>
                    <div>
                        <SizeControl
                            label={__('Size', 'gutenverse')}
                            value={value.font.size}
                            allowDeviceControl={true}
                            hideRange={true}
                            onValueChange={size => onTypographyChange({ ...value.font, size })}
                            onStyleChange={() => { }}
                        />
                        <SelectControl
                            label={__('Weight', 'gutenverse')}
                            value={value.font.weight}
                            onValueChange={weight => onTypographyChange({ ...value.font, weight })}
                            onStyleChange={() => { }}
                            options={[
                                {
                                    label: __('Default', 'gutenverse'),
                                    value: 'default'
                                },
                                {
                                    label: __('Normal', 'gutenverse'),
                                    value: 'normal'
                                },
                                {
                                    label: __('Bold', 'gutenverse'),
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
                            label={__('Style', 'gutenverse')}
                            value={value.font.style}
                            onValueChange={style => onTypographyChange({ ...value.font, style })}
                            onStyleChange={() => { }}
                            options={[
                                {
                                    label: __('Default', 'gutenverse'),
                                    value: 'default'
                                },
                                {
                                    label: __('Normal', 'gutenverse'),
                                    value: 'normal'
                                },
                                {
                                    label: __('Italic', 'gutenverse'),
                                    value: 'italic'
                                },
                                {
                                    label: __('Oblique', 'gutenverse'),
                                    value: 'oblique'
                                },
                            ]}
                        />
                    </div>
                    <div>
                        <SizeControl
                            label={__('Line Height', 'gutenverse')}
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
                            onStyleChange={() => { }}
                        />
                        <SelectControl
                            label={__('Transform', 'gutenverse')}
                            value={value.font.transform}
                            onValueChange={transform => onTypographyChange({ ...value.font, transform })}
                            onStyleChange={() => { }}
                            options={[
                                {
                                    label: __('Default', 'gutenverse'),
                                    value: 'default'
                                },
                                {
                                    label: __('Uppercase', 'gutenverse'),
                                    value: 'uppercase'
                                },
                                {
                                    label: __('Lowercase', 'gutenverse'),
                                    value: 'lowercase'
                                },
                                {
                                    label: __('Capitalize', 'gutenverse'),
                                    value: 'capitalize'
                                },
                                {
                                    label: __('Normal', 'gutenverse'),
                                    value: 'normal'
                                },
                            ]}
                        />
                        <SelectControl
                            label={__('Decoration', 'gutenverse')}
                            value={value.font.decoration}
                            onValueChange={decoration => onTypographyChange({ ...value.font, decoration })}
                            onStyleChange={() => { }}
                            options={[
                                {
                                    label: __('Default', 'gutenverse'),
                                    value: 'default'
                                },
                                {
                                    label: __('Underline', 'gutenverse'),
                                    value: 'underline'
                                },
                                {
                                    label: __('Overline', 'gutenverse'),
                                    value: 'overline'
                                },
                                {
                                    label: __('Line Through', 'gutenverse'),
                                    value: 'line-through'
                                },
                                {
                                    label: __('None', 'gutenverse'),
                                    value: 'none'
                                },
                            ]}
                        />
                    </div>
                </div>
                <RangeControl
                    label={__('Letter Spacing', 'gutenverse')}
                    min={-10}
                    max={10}
                    step={0.1}
                    value={value.font.spacing}
                    allowDeviceControl={true}
                    onValueChange={spacing => onTypographyChange({ ...value.font, spacing })}
                    onStyleChange={() => { }}
                />
            </>
        </div>}
        <ThePrompt openPopup={openPopup} closePopup={() => setOpenPopup(false)} deleteColor={() => deleteFont(value.id)} value={value} />
    </div>;
};

const GlobalVariableFont = (props) => {
    const { variableFont, addFontVar, editFontVar, deleteFontVar, addFont } = props;

    const addVariableFont = () => {
        const newFont = {
            id: cryptoRandomString({ length: 6, type: 'alphanumeric' }),
            name: __('Variable Font', 'gutenverse'),
            font: {}
        };

        addFontVar(newFont);
    };

    const updateVariableFont = font => {
        editFontVar(font);
        if (font.font) {
            handleFont(font.font, { addFont: addFont }, font.id);
        }
    };

    const deleteVariableFont = id => {
        deleteFontVar(id);
    };

    // const [importFonts, setImportFonts] = useState('');

    // const onImportFonts = () => {
    //     JSON.parse(importFonts).map(item => {
    //         addFontVar(item);
    //     });
    // };

    return <>
        <PanelTutorial
            style={{ margin: '0 0 15px' }}
            title={__('Font Variable', 'gutenverse')}
            list={[
                {
                    title: __('Where it shown?', 'gutenverse'),
                    description: __('All Font Registered on this panel, will shown on each typography option of block.', 'gutenverse')
                },
                {
                    title: __('What happened if i change this option.', 'gutenverse'),
                    description: __('By Changing this option, you will also change every block typograhpy assigned to this option.', 'gutenverse')
                },
                {
                    title: __('Save Behaviour', 'gutenverse'),
                    description: __('Option will automatically saved after you change it.', 'gutenverse')
                }
            ]}
        />
        {isEmpty(variableFont) ? <div className={'font-variable-wrapper'}>
            <div className="empty-variable" onClick={() => addVariableFont()}>
                {__('Empty Variable Font', 'gutenverse')}
            </div>
            <div className={'font-variable-add'}>
                <div onClick={() => addVariableFont()} >
                    {__('Create Font', 'gutenverse')}
                </div>
            </div>
        </div> : <div className={'font-variable-wrapper'}>
            {variableFont.map(value => {
                return <SingleVariableFont key={value.id} value={value} updateFont={updateVariableFont} deleteFont={deleteVariableFont} />;
            })}
            <div className={'font-variable-add'}>
                <div onClick={() => addVariableFont()}>
                    {__('Add Font', 'gutenverse')}
                </div>
            </div>
        </div>}
        {/* {isTools && <div className="guten-dev-tools">
            <textarea id="global-fonts" name="global-fonts" rows="4" cols="50" value={importFonts} onChange={e => setImportFonts(e.target.value)}>
            </textarea>
            <div className={'variable-import'}>
                <div onClick={() => onImportFonts()}>
                    {__('Import Fonts', 'gutenverse')}
                </div>
            </div>
        </div>} */}
    </>;
};

export default GlobalVariableFont;
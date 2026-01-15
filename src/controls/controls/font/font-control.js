
import { useInstanceId } from '@wordpress/compose';
import ControlHeadingSimple from '../part/control-heading-simple';
import Select from 'react-select';
import classnames from 'classnames';
import { useVisibility } from 'gutenverse-core/hooks';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import isEmpty from 'lodash/isEmpty';
import { __ } from '@wordpress/i18n';
import ProLock from '../pro-lock';
import { applyFilters } from '@wordpress/hooks';
import { useState, useEffect, useRef } from '@wordpress/element';
import { getWindow } from 'gutenverse-core/styling/styling/styling-helper';


const toSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};

const injectControlFont = (iframeDoc, font) => {
    const head = iframeDoc.head || iframeDoc.getElementByTagName('head')[0];
    let googleTag = iframeDoc.getElementById('gutenverse-google-font-control-editor-' + toSlug(font));
    if (!googleTag) {
        googleTag = document.createElement('link');
        googleTag.rel = 'stylesheet';
        googleTag.type = 'text/css';
        googleTag.id = 'gutenverse-google-font-control-editor-' + toSlug(font);
        googleTag.href = 'https://fonts.googleapis.com/css?family=' + font;
        head.appendChild(googleTag);
    }
};

const injectControlCustomFont = (iframeDoc, font) => {
    const { uploadPath } = window['GutenverseConfig'];
    const head = iframeDoc.head || iframeDoc.getElementByTagName('head')[0];
    let customTag = iframeDoc.getElementById('gutenverse-pro-custom-font-control-editor-' + toSlug(font));
    let customFont = applyFilters(
        'gutenverse.v3.apply-custom-font',
        [font],
        uploadPath
    );
    if ( !customTag && customFont.length === 1 ) {
        customTag = document.createElement('link');
        customTag.rel = 'stylesheet';
        customTag.type = 'text/css';
        customTag.id = 'gutenverse-pro-custom-font-control-editor-' + toSlug(font);
        customTag.href = customFont[0];
        head.appendChild(customTag);
    }
};

const FontComponent = (props) => {
    const { innerProps, isSelected, isFocused, isDisabled } = props;
    const [isVisible, currentElement] = useVisibility(250, 10);
    const fontControlRef = useRef(null);
    const fontClass = classnames(
        'font-option',
        {
            'selected': isSelected,
            'focused': isFocused,
            'disabled': isDisabled,
        },
        props.data.pro && `select-option${props.data.pro && ' pro'}`
    );

    useEffect(() => {
        let theWindow = getWindow(fontControlRef);
        let iframeDoc = theWindow.document;
        if (theWindow && !theWindow.gutenverseControlFont) {
            theWindow.gutenverseControlFont = [];
        }
        if (isVisible) {
            if (props.data.type === 'google' && !isEmpty(props.data.value)) {
                if (theWindow && theWindow.gutenverseControlFont && !theWindow.gutenverseControlFont.includes(props.data.value)) {
                    theWindow.gutenverseControlFont.push(props.data.value);
                    injectControlFont(iframeDoc, props.data.value);
                }
            } else if (props.data.type === 'custom_font_pro' && !isEmpty(props.data.value)) {
                if (theWindow && theWindow.gutenverseControlFont && !theWindow.gutenverseControlFont.includes(props.data.value)) {
                    theWindow.gutenverseControlFont.push(props.data.value);
                    injectControlCustomFont(iframeDoc, props.data.value);
                }
            }
        }
    }, [isVisible]);

    return <>
        <div ref={fontControlRef} className="gutenverse-control-font-load">
        </div>
        <div {...innerProps} ref={currentElement} className={fontClass} style={{ fontFamily: props.data.value }}>
            {props.data.label}
            {props.data.pro && <ProLock
                title={props.data.label}
                description={props.data.description}
            />}
        </div>
    </>;
};

const FontControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = allowDeviceControl ? {} : '',
        onValueChange,
        isMulti = false,
        description = '',
    } = props;

    const { fonts: fontsData, customFonts } = window['GutenverseConfig'];
    const [fonts, setFonts] = useState({});
    const fontControlRef = useRef(null);
    const onChange = value => {
        onValueChange(value);
    };

    useEffect(() => {
        setFonts(applyFilters('gutenverse.custom-font', fontsData, customFonts));
    }, []);

    useEffect(() => {
        let theWindow = getWindow(fontControlRef);
        let iframeDoc = theWindow.document;
        if (theWindow && !theWindow.gutenverseControlFont) {
            theWindow.gutenverseControlFont = [];
        }
        if (value?.type === 'google' && !isEmpty(value.value)) {
            injectControlFont(iframeDoc, value.value);
            theWindow.gutenverseControlFont.push(value.value);
        } else if (value.type === 'custom_font_pro' && !isEmpty(value.value)) {
            injectControlFont(iframeDoc, value.value);
            theWindow.gutenverseControlFont.push(value.value);
        }
        return (() => {
            if (theWindow && theWindow.gutenverseControlFont && theWindow.gutenverseControlFont.length > 0) {
                theWindow.gutenverseControlFont.forEach(font => {
                    let googleTag = iframeDoc.getElementById('gutenverse-google-font-control-editor-' + toSlug(font));
                    if (googleTag) {
                        googleTag.remove();
                    }
                });
                theWindow.gutenverseControlFont = null;
            }
        });
    }, [value]);

    const customStyles = {
        input: (provided) => {
            return {
                ...provided,
                padding: 0,
                margin: 0
            };
        },
        control: (provided) => {
            let style = {
                ...provided,
                borderRadius: '1px',
            };

            if (value !== undefined) {
                style = {
                    ...style,
                    fontFamily: value.value
                };
            }

            return style;
        }
    };

    const fontOptions = fonts?.groups?.map(group => {
        let options = fonts.fonts.filter(item => item.class === group.value).map(font => {
            return {
                label: font.name,
                value: font.value,
                type: font.class
            };
        });

        if (group.label === 'Custom Font' && options.length === 0) {
            options = [{
                label: 'Custom Font',
                value: 'Custom Font',
                type: 'custom_font_pro',
                pro: true,
                description: __('Lorem Ipsum...', '--gctd--')
            }];
        }
        return {
            label: group.label,
            options
        };
    });
    const id = useInstanceId(FontControl, 'inspector-font-control');
    return <div id={id} ref={fontControlRef} className={'gutenverse-control-wrapper gutenverse-control-font'}>
        <ControlHeadingSimple
            id={`${id}-font`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'control-font'}>
                <Select
                    isMulti={isMulti}
                    styles={customStyles}
                    value={value}
                    onChange={onChange}
                    options={fontOptions}
                    isOptionDisabled={(option) => option.disabled || option.pro}
                    components={{
                        Option: FontComponent,
                    }}
                />
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(FontControl);
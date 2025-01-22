import { useEffect, useMemo, useState } from '@wordpress/element';
import cryptoRandomString from 'crypto-random-string';
import { dispatch, select, useSelect } from '@wordpress/data';
import { determineLocation, getGoogleFontParams, recursiveDuplicateCheck, theDeviceType } from 'gutenverse-core/helper';
import isEmpty from 'lodash/isEmpty';
import { setControlStyle, signal } from 'gutenverse-core/editor-helper';
import { Helmet, u } from 'gutenverse-core/components';
import { applyFilters } from '@wordpress/hooks';

const renderStyleCustomDeps = (props) => {
    const { attributes, name } = props;

    switch (name) {
        case 'gutenverse/column':
            return [attributes.sectionVerticalAlign];
        case 'gutenverse/mega-menu':
            return [attributes.breakpoint, attributes.orientation];
        case 'gutenverse/mega-menu-item':
            return [attributes.breakpoint, attributes.orientation];
        default:
            return [];
    }
};

/**
 * Note :
 *  Force Refresh style bakalan tertrigger kalau:
 *      1. Kalau dari luar element, setAttribute dengan client element ini dengan attribute refreshStyleId
 *      2. Kalua dari element ini sendiri, bisa dengan refreshStyle();
 *      3. refreshSignal bakal merefresh semua block dalam page.
 *
 * @param {*} panelList.
 * @returns
 */
export const withCustomStyle = panelList => BlockElement => {
    return (props) => {
        const { clientId, attributes, setAttributes } = props;
        const { gtniconURL, fontawesomeURL } = window['GutenverseConfig'];
        const { elementId, refreshStyleId } = attributes;
        const gutenverse = dispatch('gutenverse/style');
        const gutenverseSelector = select('gutenverse/style');
        const [adminStyles, setAdminStyle] = useState({});
        const [totalChild, setTotalChild] = useState(0);
        const [switcher, setSwitcher] = useState({});
        const [refresh, setRefresh] = useState(null);
        const [hasIcon, setHasIcon] = useState(false);
        const [confirmSignal, setConfirmSignal] = useState(false);
        const [elementRef, setElementRef] = useState(null);
        const [headElement, setHeadElement] = useState(null);
        const [refreshId, setRefreshId] = useState(null);
        const [additionalAttribute, setAdditionalAttribute] = useState(null);
        const controls = panelList();
        const { uploadPath } = window['GutenverseConfig'];

        // keep this using useSelect instead of getDevice, to trigger changes
        const {
            deviceType,
        } = useSelect(
            () => {
                const location = determineLocation();
                return {
                    deviceType: theDeviceType(location)
                };
            },
            []
        );

        const refreshStyle = () => {
            const uniqueId = 'refresh-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
            setRefreshId(uniqueId);
        };

        const refreshSignal = (key) => {
            setRefresh(key);
        };

        const addStyle = (id, adminStyle) => {
            setAdminStyle(prevStyles => ({
                ...prevStyles,
                [id]: adminStyle
            }));
        };

        const addFont = (id, font, weight) => {
            const fontId = `${elementId}-${id}`;

            if (font !== undefined && font.type === 'google') {
                gutenverse.setGoogleFonts(fontId, {
                    ...font,
                    weight
                });
            } else if (font !== undefined && font.type === 'custom_font_pro') {
                gutenverse.setCustomFonts(fontId, {
                    ...font,
                    weight
                });
            }
        };

        const renderGoogleFont = () => {
            const googleFont = gutenverseSelector.getGoogleFonts();
            return !isEmpty(googleFont) &&
                <link
                    href={`https://fonts.googleapis.com/css?family=${getGoogleFontParams(googleFont)}`}
                    rel="stylesheet" type="text/css" />;
        };

        const renderCustomFont = () => {
            const customFont = gutenverseSelector.getCustomFonts();
            let customFontData = Object.keys(customFont).map((value) => {
                return customFont[value].value;
            });
            let uniqueFont = customFontData.filter((value, index, array) => array.indexOf(value) === index);
            return !isEmpty(customFont) &&
                applyFilters(
                    'gutenverse.apply-custom-font',
                    uniqueFont,
                    uploadPath
                );
        };

        const removeStyle = (id) => {
            setAdminStyle(prevStyles => {
                const { [id]: omit, ...newStyles } = prevStyles;
                return newStyles;
            });
        };

        const buildStyle = (styles) => {
            return Object.keys(styles).map(key => styles[key]).join(' ');
        };

        // Control Props
        const panelProps = {
            clientId,
            addStyle,
            addFont,
            removeStyle,
            switcher,
            setSwitcher,
            setAttributes,
            refreshStyle,
            ...attributes,
            ...additionalAttribute
        };

        const registerElement = (uniqueId) => {
            const data = {
                elementId: uniqueId
            };

            if (props.name === 'gutenverse/column' || props.name === 'gutenverse/accordion') {
                data.addStyle = addStyle;
            }

            if (props.name === 'gutenverse/section') {
                data.setTotalChild = setTotalChild;
            }

            if (props.name === 'gutenverse/accordion') {
                data.removeStyle = removeStyle;
            }

            gutenverse.registerElement(clientId, data);
        };

        const renderStyle = () => {
            controls.map(data => {
                let newControls = Object.keys(attributes).reduce((acc, key) => {
                    if (!isEmpty(attributes[key])) {
                        let option = data.panelArray(panelProps).find((el) => el.id === key);
                        if (option) {
                            acc.push(option);
                        }
                    }
                    return acc;
                }, []);
                if(newControls.length > 0){
                    newControls.map(control => {
                        const { id, style, allowDeviceControl, onChange, options } = control;
                        if (!isEmpty(style)) {
                            style.map((item, index) => setControlStyle({
                                ...panelProps,
                                id: item.updateID ? item.updateID : `${id}-style-${index}`,
                                value: panelProps[id],
                                style: item,
                                allowDeviceControl
                            }));
                        }
                        !!onChange && onChange(panelProps);
                        !isEmpty(options) && options.map(option => {
                            const { id: optionId, style: repeaterStyle, onChange, allowDeviceControl } = option;
                            if (!isEmpty(repeaterStyle)) {
                                panelProps[id] && panelProps[id].map((value, valueIndex) => {
                                    const theStyle = repeaterStyle.map(item => {
                                        const { selector } = item;
                                        let theSelector = typeof selector === 'string' || selector instanceof String ? selector : selector(valueIndex, { props: value });
                                        return {
                                            ...item,
                                            selector: theSelector
                                        };
                                    });
    
                                    theStyle.map((item, index) => {
                                        const styleId = `${id}-style-${valueIndex}-${optionId}-style-${index}`;
                                        return setControlStyle({
                                            ...panelProps,
                                            id: item.updateID ? item.updateID : styleId,
                                            value: value[optionId],
                                            style: item,
                                            allowDeviceControl
                                        });
                                    });
                                });
                            }
    
                            !!onChange && onChange(panelProps);
                        });
                    });
                }
                
            });
        };

        const createElementId = () => {
            const uniqueId = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
            setAttributes({
                elementId: uniqueId,
            });
            registerElement(uniqueId);
        };

        useEffect(() => {
            const binding = signal.refreshSignal.add(refreshSignal);
            const bindStyling = signal.afterFilterSignal.add(() => setConfirmSignal(true));

            Object.keys(attributes).map(key => {
                if (typeof attributes[key] === 'string' && (
                    attributes[key].indexOf('gtn gtn-') > -1
                    || attributes[key].indexOf('fas fa-') > -1
                    || attributes[key].indexOf('fab fa-') > -1
                    || attributes[key].indexOf('far fa-') > -1
                )) {
                    setHasIcon(true);
                }
            });

            return () => {
                binding.detach();
                bindStyling.detach();
            };
        }, []);

        /**
         * On mount, set elementId if undefined,
         * and set controlValues for the first time.
         */
        useEffect(() => {
            if (elementRef) {
                if (elementId === undefined) {
                    createElementId();
                } else {
                    const { getBlocks } = select('core/block-editor');
                    const flag = recursiveDuplicateCheck(getBlocks(), clientId, elementId);
                    const parent = u(elementRef).closest('html');
                    if (flag && !parent.hasClass('block-editor-block-preview__content-iframe')) {
                        createElementId();
                    } else {
                        registerElement(elementId);
                    }
                }

                if (elementRef.ownerDocument) {
                    setTimeout(() => {
                        const windowEl = elementRef.ownerDocument.defaultView || elementRef.ownerDocument.parentWindow;
                        if (windowEl?.document) {
                            const headEl = windowEl.document.getElementsByTagName('head')[0];
                            setHeadElement(headEl);
                        }
                    }, 1);
                }
            }
        }, [elementRef]);

        const customDeps = useMemo(() => renderStyleCustomDeps(props), [props]);

        useEffect(() => {
            const styleTimeoout = setTimeout(() => {
                refreshStyle();
            }, 100);

            return () => clearTimeout(styleTimeoout);
        }, [attributes]);

        /**
         * Render style on event change
         */
        useEffect(() => {
            if (elementId !== undefined) {
                renderStyle();
            }
        }, [
            elementId,
            refreshStyleId,
            refreshId,
            confirmSignal,
            deviceType,
            additionalAttribute,
            ...customDeps,
        ]);

        return <>
            {hasIcon && (
                <Helmet head={headElement}>
                    <link rel="stylesheet" href={gtniconURL} media="all"></link>
                    <link rel="stylesheet" href={fontawesomeURL} media="all"></link>
                </Helmet>
            )}
            <Helmet device={deviceType} head={headElement}>
                {elementId !== undefined && renderGoogleFont()}
                {elementId !== undefined && renderCustomFont()}
            </Helmet>
            {elementId !== undefined && <style id={elementId}>{buildStyle(adminStyles)}</style>}
            <BlockElement
                {...props}
                addStyle={addStyle}
                removeStyle={removeStyle}
                panelProps={panelProps}
                totalChild={totalChild}
                deviceType={deviceType}
                setElementRef={setElementRef}
                elementRef={elementRef}
                refreshStyle={refreshStyle}
                setAdditionalAttribute={setAdditionalAttribute}
            />
        </>;
    };
};

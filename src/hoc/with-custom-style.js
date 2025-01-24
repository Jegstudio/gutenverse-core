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
        case 'gutenverse/mega-menu-item':
            return [attributes.breakpoint, attributes.orientation];
        default:
            return [];
    }
};

export const withCustomStyle = panelList => BlockElement => {
    return (props) => {
        const { clientId, attributes, setAttributes } = props;
        const { gtniconURL, fontawesomeURL, uploadPath } = window['GutenverseConfig'];
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

        const { deviceType } = useSelect(() => ({
            deviceType: theDeviceType(determineLocation())
        }), []);

        const refreshStyle = () => {
            const uniqueId = 'refresh-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
            setRefreshId(uniqueId);
        };

        const refreshSignal = (key) => setRefresh(key);

        const addStyle = (id, adminStyle) => setAdminStyle(prevStyles => ({
            ...prevStyles,
            [id]: adminStyle
        }));

        const addFont = (id, font, weight) => {
            const fontId = `${elementId}-${id}`;
            if (font) {
                const fontData = { ...font, weight };
                if (font.type === 'google') {
                    gutenverse.setGoogleFonts(fontId, fontData);
                } else if (font.type === 'custom_font_pro') {
                    gutenverse.setCustomFonts(fontId, fontData);
                }
            }
        };

        const renderGoogleFont = () => {
            const googleFont = gutenverseSelector.getGoogleFonts();
            return !isEmpty(googleFont) && <link href={`https://fonts.googleapis.com/css?family=${getGoogleFontParams(googleFont)}`} rel="stylesheet" type="text/css" />;
        };

        const renderCustomFont = () => {
            const customFont = gutenverseSelector.getCustomFonts();
            const uniqueFonts = [...new Set(Object.values(customFont).map(value => value.value))];
            return !isEmpty(customFont) && applyFilters('gutenverse.apply-custom-font', uniqueFonts, uploadPath);
        };

        const removeStyle = (id) => {
            setAdminStyle(prevStyles => {
                const { [id]: omit, ...newStyles } = prevStyles;
                return newStyles;
            });
        };

        const buildStyle = (styles) => Object.values(styles).join(' ');

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
            const data = { elementId: uniqueId };
            if (['gutenverse/column', 'gutenverse/accordion'].includes(props.name)) {
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
            controls.forEach(control => {
                control.panelArray(panelProps).forEach(data => {
                    const { id, style, allowDeviceControl, onChange, options } = data;
                    if (style?.length) {
                        style.forEach((item, index) => {
                            setControlStyle({
                                ...panelProps,
                                id: item.updateID || `${id}-style-${index}`,
                                value: panelProps[id],
                                style: item,
                                allowDeviceControl
                            });
                        });
                    }

                    if (onChange) onChange(panelProps);

                    if (options?.length) {
                        options.forEach(option => {
                            const { id: optionId, style: repeaterStyle, onChange, allowDeviceControl } = option;

                            if (repeaterStyle?.length) {
                                const panelData = panelProps[id];
                                panelData?.forEach((value, valueIndex) => {
                                    const theStyle = repeaterStyle.map(item => ({
                                        ...item,
                                        selector: typeof item.selector === 'string' || item.selector instanceof String
                                            ? item.selector
                                            : item.selector(valueIndex, { props: value })
                                    }));

                                    theStyle.forEach((item, index) => {
                                        const styleId = `${id}-style-${valueIndex}-${optionId}-style-${index}`;
                                        setControlStyle({
                                            ...panelProps,
                                            id: item.updateID || styleId,
                                            value: value[optionId],
                                            style: item,
                                            allowDeviceControl
                                        });
                                    });
                                });
                            }

                            if (onChange) onChange(panelProps);
                        });
                    }
                });
            });
        };

        const createElementId = () => {
            const uniqueId = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
            setAttributes({ elementId: uniqueId });
            registerElement(uniqueId);
        };

        useEffect(() => {
            const binding = signal.refreshSignal.add(refreshSignal);
            const bindStyling = signal.afterFilterSignal.add(() => setConfirmSignal(true));

            Object.keys(attributes).forEach(key => {
                if (typeof attributes[key] === 'string' && /gtn\s|fas\s|fab\s|far\s/.test(attributes[key])) {
                    setHasIcon(true);
                }
            });

            return () => {
                binding.detach();
                bindStyling.detach();
            };
        }, [attributes]);

        useEffect(() => {
            if (elementRef) {
                if (!elementId) {
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

                setTimeout(() => {
                    const windowEl = elementRef?.ownerDocument?.defaultView || elementRef?.ownerDocument?.parentWindow;
                    if (windowEl?.document) {
                        const headEl = windowEl.document.getElementsByTagName('head')[0];
                        setHeadElement(headEl);
                    }
                }, 1);
            }
        }, [elementRef, elementId]);

        const customDeps = useMemo(() => renderStyleCustomDeps(props), [props]);

        useEffect(() => {
            const styleTimeout = setTimeout(() => refreshStyle(), 100);
            return () => clearTimeout(styleTimeout);
        }, [attributes]);

        useEffect(() => {
            if (elementId) renderStyle();
        }, [
            elementId,
            refreshStyleId,
            refreshId,
            confirmSignal,
            ...customDeps,
        ]);

        return <>
            {hasIcon && (
                <Helmet head={headElement}>
                    <link rel="stylesheet" href={gtniconURL} media="all" />
                    <link rel="stylesheet" href={fontawesomeURL} media="all" />
                </Helmet>
            )}
            <Helmet device={deviceType} head={headElement}>
                {elementId && renderGoogleFont()}
                {elementId && renderCustomFont()}
            </Helmet>
            {elementId && <style id={elementId}>{buildStyle(adminStyles)}</style>}
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
            />
        </>;
    };
};

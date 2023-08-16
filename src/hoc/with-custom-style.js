import { useEffect, useState } from '@wordpress/element';
import cryptoRandomString from 'crypto-random-string';
import { dispatch, select, useSelect } from '@wordpress/data';
import { determineLocation, getGoogleFontParams, recursiveDuplicateCheck } from 'gutenverse-core/helper';
import isEmpty from 'lodash/isEmpty';
import { setControlStyle, signal } from 'gutenverse-core/editor-helper';
import { Helmet } from 'gutenverse-core/components';

const renderStyleCustomDeps = (props) => {
    const { attributes } = props;

    if (props.name === 'gutenverse/column') {
        return [attributes.sectionVerticalAlign];
    } else if (props.name === 'gutenverse/mega-menu') {
        return [attributes.breakpoint, attributes.orientation];
    } else if (props.name === 'gutenverse/mega-menu-item') {
        return [attributes.breakpoint, attributes.orientation];
    }

    return [];
};

export const withCustomStyle = panelList => BlockElement => {
    return (props) => {
        const { clientId, attributes, setAttributes } = props;
        const { gtniconURL, fontawesomeURL } = window['GutenverseConfig'];
        const { elementId } = attributes;
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
        const controls = panelList();

        const refreshSignal = (key) => {
            setRefresh(key);
        };

        useEffect(() => {
            const binding = signal.refreshSignal.add(refreshSignal);
            const bindStyling = signal.afterFilterSignal.add(() => setConfirmSignal(true));

            return () => {
                binding.detach();
                bindStyling.detach();
            };
        }, []);

        // keep this using useSelect instead of getDevice, to trigger changes
        const {
            deviceType,
        } = useSelect(
            (select) => {
                const location = determineLocation();
                let deviceType = 'Desktop';

                switch (location) {
                    case 'editor':
                        deviceType = select('core/edit-site').__experimentalGetPreviewDeviceType();
                        break;
                    case 'post':
                        deviceType = select('core/edit-post').__experimentalGetPreviewDeviceType();
                        break;
                    default:
                        deviceType = 'Desktop';
                }

                return {
                    deviceType: deviceType
                };
            },
            []
        );

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
            }
        };

        const renderFont = () => {
            const googleFont = gutenverseSelector.getGoogleFonts();
            return !isEmpty(googleFont) && <link
                href={`https://fonts.googleapis.com/css?family=${getGoogleFontParams(googleFont)}`}
                rel="stylesheet" type="text/css" />;
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
            ...attributes
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
                data.panelArray(panelProps).map(data => {
                    const { id, style, allowDeviceControl, onChange } = data;

                    !isEmpty(style) && style.map((item, index) => setControlStyle({
                        ...panelProps,
                        id: item.updateID ? item.updateID : `${id}-style-${index}`,
                        value: panelProps[id],
                        style: item,
                        allowDeviceControl
                    }));

                    !!onChange && onChange(panelProps);
                });
            });
        };

        const createElementId = () => {
            const uniqueId = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
            setAttributes({
                elementId: uniqueId,
            });
            registerElement(uniqueId);
        };

        /**
         * On mount, set elementId if undefined,
         * and set controlValues for the first time.
         */
        useEffect(() => {
            if (elementId === undefined) {
                createElementId();
            } else {
                const { getBlocks } = select('core/block-editor');
                const flag = recursiveDuplicateCheck(getBlocks(), clientId, elementId);

                if (flag) {
                    createElementId();
                } else {
                    registerElement(elementId);
                }
            }
        }, []);

        useEffect(() => {
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
        }, []);

        /**
         * Refresh if there is change.
         */
        useEffect(() => {
            /*  */
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
            confirmSignal,
            deviceType,
            ...renderStyleCustomDeps(props),
        ]);

        useEffect(() => {
            if (elementRef && elementRef.ownerDocument) {
                setTimeout(() => {
                    const windowEl = elementRef.ownerDocument.defaultView || elementRef.ownerDocument.parentWindow;
                    if (windowEl?.document) {
                        const headEl = windowEl.document.getElementsByTagName('head')[0];
                        setHeadElement(headEl);
                    }
                }, 1);
            }
        }, [elementRef]);

        return <>
            {hasIcon && (
                <Helmet head={headElement}>
                    <link rel="stylesheet" href={gtniconURL} media="all"></link>
                    <link rel="stylesheet" href={fontawesomeURL} media="all"></link>
                </Helmet>
            )}
            <Helmet device={deviceType} head={headElement}>
                {elementId !== undefined && renderFont()}
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
            />
        </>;
    };
};

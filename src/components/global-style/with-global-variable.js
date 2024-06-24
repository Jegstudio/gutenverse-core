import { useSelect } from '@wordpress/data';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useEffect, useState } from '@wordpress/element';
import { useSetting } from '@wordpress/block-editor';
import { Helmet } from 'gutenverse-core/components';

import {
    getGoogleFontDatas,
    getGoogleFontParams,
    variableColorName,
    variableFontName,
    responsiveBreakpoint,
    determineLocation
} from 'gutenverse-core/helper';
import {
    renderColor,
    useGlobalStylesConfig,
    hexToRgb
} from 'gutenverse-core/editor-helper';
import {
    injectFont,
    normalAppender,
    responsiveAppender,
    deviceStyleValue,
    DeviceLoop,
    elementVar
} from 'gutenverse-core/styling';
import { modifyGlobalVariable } from 'gutenverse-core/requests';
import elementChange from 'element-change';
import { applyFilters } from '@wordpress/hooks';

const withGlobalVariable = GlobalStyle => {
    return props => {
        const { variable, googleFont, initFontVar, setGoogleFonts, customFont, setCustomFonts } = props;
        const [adminStyles, setAdminStyles] = useState('');
        const { tabletBreakpoint, mobileBreakpoint } = responsiveBreakpoint();
        const [headElement, setHeadElement] = useState(null);
        const { uploadPath } = window['GutenverseConfig'];

        const setWindow = () => {
            setTimeout(() => {
                const canvas = document.querySelector('[name=\'editor-canvas\']');
                const wrapper = !canvas ? window : canvas.contentWindow;
                setHeadElement(wrapper.document.getElementsByTagName('head')[0]);
            }, 500);
        };

        elementChange('#editor', setWindow);
        elementChange('#site-editor', setWindow);

        // Get global settings from wp
        const { userConfig } = useGlobalStylesConfig();

        // Get global color from settings
        const themePalette = useSetting('color.palette.theme');

        // Keep this using useSelect instead of getDeviceType, to trigger changes
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

        const debounceSave = useCallback(
            debounce((params) => modifyGlobalVariable(params), 200),
            []
        );

        const pointCheck = (deviceType, value) => {
            let _value = deviceStyleValue(deviceType, value);

            if (!isEmpty(_value.point)) {
                return _value;
            }

            switch (deviceType) {
                case 'Mobile':
                    _value = pointCheck('Tablet', value);
                    break;
                case 'Tablet':
                    _value = pointCheck('Desktop', value);
                    break;
                default:
                    break;
            }

            return _value;
        };

        const buildStyle = (variable) => {
            let variableStyle = elementVar();
            const { fonts, userConfig } = variable;
            fonts?.map(item => {
                const { id, font: typography } = item;
                if (typography) {
                    const { font, size, weight, transform, style, decoration, lineHeight, spacing } = typography;

                    if (font) {
                        normalAppender({
                            style: `${variableFontName(id, 'family')} : "${font.value}";`,
                            elementStyle: variableStyle
                        });
                    }

                    if (size) {
                        DeviceLoop(device => {
                            const _size = pointCheck(device, size);

                            if (_size && !isEmpty(_size.point)) {
                                const unit = _size.unit ? _size.unit : 'px';
                                responsiveAppender({
                                    style: `${variableFontName(id, 'size')} : ${_size.point}${unit};`,
                                    device,
                                    elementStyle: variableStyle
                                });
                            }
                        });
                    }

                    if (weight) {
                        const checkWeight = weight === 'default' ? '400' : weight;
                        normalAppender({
                            style: `${variableFontName(id, 'weight')} : ${checkWeight};`,
                            elementStyle: variableStyle
                        });
                    }

                    if (transform && transform !== 'default') {
                        normalAppender({
                            style: `${variableFontName(id, 'transform')} : ${transform};`,
                            elementStyle: variableStyle
                        });
                    }

                    if (style && style !== 'default') {
                        normalAppender({
                            style: `${variableFontName(id, 'style')} : ${style};`,
                            elementStyle: variableStyle
                        });
                    }

                    if (decoration && decoration !== 'default') {
                        normalAppender({
                            style: `${variableFontName(id, 'decoration')} : ${decoration};`,
                            elementStyle: variableStyle
                        });
                    }

                    if (lineHeight) {
                        DeviceLoop(device => {
                            const _lineHeight = pointCheck(device, lineHeight);

                            if (_lineHeight && !isEmpty(_lineHeight.point)) {
                                const unit = _lineHeight.unit ? _lineHeight.unit : 'px';
                                responsiveAppender({
                                    style: `${variableFontName(id, 'lineHeight')} : ${_lineHeight.point}${unit};`,
                                    device,
                                    elementStyle: variableStyle
                                });
                            }
                        });
                    }

                    if (spacing) {
                        DeviceLoop(device => {
                            const _spacing = deviceStyleValue(device, spacing);

                            if (_spacing) {
                                responsiveAppender({
                                    style: `${variableFontName(id, 'spacing')} : ${_spacing}em;`,
                                    device,
                                    elementStyle: variableStyle
                                });
                            }
                        });
                    }
                }
            });

            if (userConfig?.settings?.color?.palette) {

                // render non fullsite editor themes colors
                isEmpty(userConfig.settings.color.palette.theme) && !isEmpty(themePalette) && themePalette.map(item => {
                    const { slug, color } = item;
                    const property = variableColorName(slug);

                    normalAppender({
                        style: `${property} : ${renderColor(hexToRgb(color))};`,
                        elementStyle: variableStyle
                    });
                });

                // render custom colors
                userConfig.settings.color.palette.custom && userConfig.settings.color.palette.custom.map(item => {
                    const { slug, color } = item;
                    const property = variableColorName(slug);

                    normalAppender({
                        style: `${property} : ${renderColor(hexToRgb(color))};`,
                        elementStyle: variableStyle
                    });
                });
            }

            return `body { ${variableStyle.adminStyle['Desktop']}; } @media only screen and (max-width: ${tabletBreakpoint}px) { body { ${variableStyle.adminStyle['Tablet']} }; } @media only screen and (max-width: ${mobileBreakpoint}px) { body { ${variableStyle.adminStyle['Mobile']} };}`;
        };

        const addFont = (id, font, weight) => {
            if (font?.type === 'google') {
                setGoogleFonts(id, {
                    ...font,
                    weight
                });
            }else if(font?.type === 'custom_font_pro'){
                setCustomFonts(id, {
                    ...font,
                    weight
                });
            }
        };

        const renderFont = () => {
            return !isEmpty(googleFont) && <link
                href={`https://fonts.googleapis.com/css?family=${getGoogleFontParams(googleFont)}`}
                rel="stylesheet" type="text/css" />;
        };
        const renderCustomFont = () => {
            let customFontData = Object.keys(customFont).map((value) => {
                return customFont[value].value;
            });
            let uniqueFont = customFontData.filter((value,index,array) => array.indexOf(value) === index);
            return !isEmpty(uniqueFont) &&
                applyFilters(
                    'gutenverse.apply-custom-font',
                    uniqueFont,
                    uploadPath
                );
        };

        const handleFont = (typography, addFont, id) => {
            const weight = typography?.weight && typography?.style === 'italic' ? `${typography?.weight}italic` : typography?.weight;
            injectFont({
                controlId: id,
                addFont: addFont,
                font: typography.font,
                weight
            });
        };

        useEffect(() => {
            if (window?.GutenverseConfig?.globalVariable?.fonts) {
                const fonts = window?.GutenverseConfig?.globalVariable?.fonts;
                // Init Global Font Variables
                initFontVar(fonts);

                // Set Google Fonts
                fonts.map(({ id, font }) => font && handleFont(font, addFont, id));

                setAdminStyles(buildStyle({
                    fonts,
                    userConfig
                }));
            }
        }, []);

        useEffect(() => {
            setAdminStyles(buildStyle({
                ...variable,
                userConfig
            }));

            debounceSave({
                variable: variable,
                colors: variable?.colors,
                fonts: variable?.fonts,
                googlefont: getGoogleFontDatas(googleFont)
            });
        }, [userConfig, variable, deviceType]);

        return <>
            <Helmet device={deviceType} head={headElement}>
                {<style id="global-variable-style">{adminStyles}</style>}
                {renderFont()}
                {renderCustomFont()}
            </Helmet>
            <GlobalStyle
                {...props}
                addFont={addFont}
            />
        </>;
    };
};

export default withGlobalVariable;
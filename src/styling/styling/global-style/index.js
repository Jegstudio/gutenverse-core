import { isNotEmpty, responsiveBreakpoint, variableColorName, variableFontName } from 'gutenverse-core/helper';
import { DeviceLoop, deviceStyleValue, elementVar, injectFont, normalAppender, responsiveAppender } from '../styling-utility';
import { isEmpty } from 'gutenverse-core/helper';
import { hexToRgb, renderColor } from 'gutenverse-core/editor-helper';
import { dispatch, select } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { applyFilters } from '@wordpress/hooks';

export const buildGlobalStyle = (variable) => {

    let variableStyle = elementVar();
    const { tabletBreakpoint, mobileBreakpoint } = responsiveBreakpoint();
    const { fonts, colors } = variable;

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

                    if (_size && isNotEmpty(_size.point)) {

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
                    style: `${variableFontName(id, 'transform')} : ${transform === 'normal' ? 'none' : transform};`,
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

    // render non fullsite editor themes colors
    colors?.theme && colors?.theme.map(item => {

        const { slug, color } = item;
        const property = variableColorName(slug);
        normalAppender({
            style: `${property} : ${renderColor(hexToRgb(color))};`,
            elementStyle: variableStyle
        });
    });

    // render custom colors
    colors?.custom && colors?.custom.map(item => {

        const { slug, color } = item;
        const property = variableColorName(slug);

        normalAppender({
            style: `${property} : ${renderColor(hexToRgb(color))};`,
            elementStyle: variableStyle
        });
    });
    return `:root :where(.editor-styles-wrapper) { -with-gutenverse: red;${variableStyle.adminStyle['Desktop']}; } @media only screen and (max-width: ${tabletBreakpoint}px) { :root :where(.editor-styles-wrapper) { ${variableStyle.adminStyle['Tablet']} }; } @media only screen and (max-width: ${mobileBreakpoint}px) { :root :where(.editor-styles-wrapper) { ${variableStyle.adminStyle['Mobile']} };}`;
};

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

export const getGlobalVariable = () => {

    const {
        getGoogleFont,
        getCustomFont,
        getVariable,
    } = select('gutenverse/global-style');

    const {
        setGoogleFonts,
        setCustomFonts,
    } = dispatch('gutenverse/global-style');

    let variable = getVariable();
    const { uploadPath } = window['GutenverseConfig'];

    const addFont = (id, font, weight) => {

        if (font?.type === 'google') {

            setGoogleFonts(id, {
                ...font,
                weight
            });

        } else if (font?.type === 'custom_font_pro') {

            setCustomFonts(id, {
                ...font,
                weight
            });
        }
    };

    let fonts = [];

    if (variable?.fonts) {
        fonts = variable?.fonts;
        if(typeof fonts === 'object'){
            fonts = Object.values(fonts);
        }
        fonts.map(({ id, font }) => font && handleFont(font, addFont, id));
    }

    const googleFont = getGoogleFont();
    const googleMap = new Map();

    Object.values(googleFont).forEach(({ value, weight }) => {
        if (!googleMap.has(value)) {
            googleMap.set(value, new Set());
        }
        googleMap.get(value).add(weight);
    });

    // Convert back to an object if needed
    const googleArr = Object.fromEntries(
        Array.from(googleMap, ([key, set]) => [key, Array.from(set)])
    );

    const customFont = getCustomFont();
    const customSet = new Set();

    Object.values(customFont).forEach(({ value }) => {
        customSet.add(value);
    });

    const customArr = Array.from(customSet);

    let newCustomArr = isNotEmpty(customArr) && applyFilters(
        'gutenverse.v3.apply-custom-font',
        customArr,
        uploadPath
    );

    // Get global settings from wp
    const _globalStylesId = select(
        coreStore
    ).__experimentalGetCurrentGlobalStylesId();

    const record = _globalStylesId
        ? select(coreStore).getEditedEntityRecord(
            'root',
            'globalStyles',
            _globalStylesId
        )
        : undefined;

    let colors = record?.settings?.color?.palette;

    return {
        colors,
        googleArr,
        customArr: newCustomArr,
        fonts
    };
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

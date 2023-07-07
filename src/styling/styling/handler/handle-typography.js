import { isEmpty } from 'lodash';
import { variableFontName } from 'gutenverse-core/helper';
import { DeviceLoop, deviceStyleValue, elementVar, injectFont, normalAppender, responsiveAppender } from 'gutenverse-core/styling';

const handleFont = (typography, props, id) => {
    const weight = typography.weight && typography.style === 'italic' ? `${typography.weight}italic` : typography.weight;
    injectFont({
        controlId: id,
        addFont: props.addFont,
        font: typography.font,
        weight
    });
};

export const handleTypography = (typography, props, id) => {
    const elementStyle = elementVar();

    if (typography.type === 'variable') {

        normalAppender({
            style: `font-family: var(${variableFontName(typography.id, 'family')});`,
            elementStyle
        });

        DeviceLoop(device => {
            responsiveAppender({
                style: `font-size: var(${variableFontName(typography.id, 'size')});`,
                device,
                elementStyle
            });
        });

        normalAppender({
            style: `font-weight: var(${variableFontName(typography.id, 'weight')});`,
            elementStyle
        });

        normalAppender({
            style: `text-transform: var(${variableFontName(typography.id, 'transform')});`,
            elementStyle
        });

        normalAppender({
            style: `font-style: var(${variableFontName(typography.id, 'style')});`,
            elementStyle
        });

        normalAppender({
            style: `text-decoration: var(${variableFontName(typography.id, 'decoration')});`,
            elementStyle
        });

        DeviceLoop(device => {
            responsiveAppender({
                style: `line-height: var(${variableFontName(typography.id, 'lineHeight')});`,
                device,
                elementStyle
            });
        });

        DeviceLoop(device => {
            responsiveAppender({
                style: `letter-spacing: var(${variableFontName(typography.id, 'spacing')});`,
                device,
                elementStyle
            });
        });

        return elementStyle;
    }

    if (typography && Object.keys(typography).length > 0) {
        const {
            font,
            size,
            weight,
            transform,
            style,
            decoration,
            lineHeight,
            spacing
        } = typography;

        handleFont(typography, props, id);

        if(font) {
            normalAppender({
                style: `font-family: "${font.value}";`,
                elementStyle
            });
        }

        if (size) {
            DeviceLoop(device => {
                const _size = deviceStyleValue(device, size);

                if (_size && ! isEmpty( _size.point ) ) {
                    const unit = _size.unit ? _size.unit : 'px';

                    responsiveAppender({
                        style: `font-size: ${_size.point}${unit};`,
                        device,
                        elementStyle
                    });
                }
            });
        }

        if (weight) {
            const checkWeight = weight === 'default' ? '400' : weight;

            normalAppender({
                style: `font-weight: ${checkWeight};`,
                elementStyle
            });
        }

        if (transform && transform !== 'default') {
            normalAppender({
                style: `text-transform: ${transform};`,
                elementStyle
            });
        }

        if (style && style !== 'default') {
            normalAppender({
                style: `font-style: ${style};`,
                elementStyle
            });
        }

        if (decoration && decoration !== 'default') {
            normalAppender({
                style: `text-decoration: ${decoration};`,
                elementStyle
            });
        }

        if (lineHeight) {
            DeviceLoop(device => {
                const _lineHeight = deviceStyleValue(device, lineHeight);

                if (_lineHeight && ! isEmpty( _lineHeight.point ) ) {
                    const unit = _lineHeight.unit ? _lineHeight.unit : 'px';

                    responsiveAppender({
                        style: `line-height: ${_lineHeight.point}${unit};`,
                        device,
                        elementStyle
                    });
                }
            });
        }

        if (spacing) {
            DeviceLoop(device => {
                const _spacing = deviceStyleValue(device, spacing);

                if (_spacing) {
                    responsiveAppender({
                        style: `letter-spacing: ${_spacing}em;`,
                        device,
                        elementStyle
                    });
                }
            });
        }

        return elementStyle;
    }

    return {};
};
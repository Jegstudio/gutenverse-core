import { getUnitPoint } from 'gutenverse-core/styling';
import isEmpty from 'lodash/isEmpty';

export const maskCSS = (props) => {
    const mask = {
        Desktop: [],
        Tablet: [],
        Mobile: [],
    };

    const { shape, size, scale, position, xposition = {}, yposition = {}, repeat } = props;
    const { imgDir } = window['GutenverseConfig'];

    let svgImage = '';

    if (shape !== '') {
        switch (shape) {
            case 'circle':
                svgImage = imgDir + '/mask/circle.svg';
                break;
            case 'triangle':
                svgImage = imgDir + '/mask/triangle.svg';
                break;
            case 'blob':
                svgImage = imgDir + '/mask/blob.svg';
                break;
            case 'custom':
                const { svg } = props;
                if (svg) {
                    const { image } = svg;
                    svgImage = image;
                }
                break;
        }

        if (!isEmpty(svgImage)) {
            mask.Desktop.push(`-webkit-mask-image: url('${svgImage}'); mask-image: url('${svgImage}');`);
            mask.Tablet.push(`-webkit-mask-image: url('${svgImage}'); mask-image: url('${svgImage}');`);
            mask.Mobile.push(`-webkit-mask-image: url('${svgImage}'); mask-image: url('${svgImage}');`);
        }

        if (size) {
            if (size.Desktop && size.Desktop !== 'custom') {
                mask.Desktop.push(`-webkit-mask-size: ${size.Desktop};`);
            }
            if (size.Tablet && size.Tablet !== 'custom') {
                mask.Tablet.push(`-webkit-mask-size: ${size.Tablet};`);
            }
            if (size.Mobile && size.Mobile !== 'custom') {
                mask.Mobile.push(`-webkit-mask-size: ${size.Mobile};`);
            }

            if (size?.Desktop === 'custom' && scale) {
                mask.Desktop.push(`-webkit-mask-size: ${getUnitPoint(scale.Desktop)};`);
            }
            if (size?.Tablet === 'custom' && scale) {
                mask.Tablet.push(`-webkit-mask-size: ${getUnitPoint(scale.Tablet)};`);
            }
            if (size?.Mobile === 'custom' && scale) {
                mask.Mobile.push(`-webkit-mask-size: ${getUnitPoint(scale.Mobile)};`);
            }
        }

        if (position) {
            if (position.Desktop && position.Desktop !== 'default' && position.Desktop !== 'custom') {
                mask.Desktop.push(`-webkit-mask-position: ${position.Desktop};`);
            }
            if (position.Tablet && position.Tablet !== 'default' && position.Tablet !== 'custom') {
                mask.Tablet.push(`-webkit-mask-position: ${position.Tablet};`);
            }
            if (position.Mobile && position.Mobile !== 'default' && position.Mobile !== 'custom') {
                mask.Mobile.push(`-webkit-mask-position: ${position.Mobile};`);
            }

            if (position?.Desktop === 'custom' || position?.Tablet === 'custom' || position?.Mobile === 'custom') {
                const addCustomPosition = (device) => {
                    const xPos = xposition?.[device] ? getUnitPoint(xposition[device]) : 0;
                    const yPos = yposition?.[device] ? getUnitPoint(yposition[device]) : 0;
                    if (xPos || yPos) {
                        mask[device].push(`-webkit-mask-position: ${xPos} ${yPos};`);
                    }
                };

                if (position?.Desktop === 'custom') addCustomPosition('Desktop');
                if (position?.Tablet === 'custom') addCustomPosition('Tablet');
                if (position?.Mobile === 'custom') addCustomPosition('Mobile');
            }
        }

        if (repeat) {
            if (repeat.Desktop && repeat.Desktop !== 'default') {
                mask.Desktop.push(`-webkit-mask-repeat: ${repeat.Desktop};`);
            }
            if (repeat.Tablet && repeat.Tablet !== 'default') {
                mask.Tablet.push(`-webkit-mask-repeat: ${repeat.Tablet};`);
            }
            if (repeat.Mobile && repeat.Mobile !== 'default') {
                mask.Mobile.push(`-webkit-mask-repeat: ${repeat.Mobile};`);
            }
        }
    }

    return mask;
};

export const maskGenerator = (props, style, css) => {
    const { selector } = style;

    const mask = maskCSS(props);

    if (mask.Desktop.length) {
        css.Desktop = `${selector} { ` + mask.Desktop.join(' ') + ' }';
    }

    if (mask.Tablet.length) {
        css.Tablet = `${selector} { ` + mask.Tablet.join(' ') + ' }';
    }

    if (mask.Mobile.length) {
        css.Mobile = `${selector} { ` + mask.Mobile.join(' ') + ' }';
    }

    return css;
};

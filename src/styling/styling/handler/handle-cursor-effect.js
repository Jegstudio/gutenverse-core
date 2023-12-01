import { DeviceLoop, deviceStyleValue, elementVar, normalAppender, responsiveAppender } from '../styling-utility';
import { handleBackground } from './handle-background';
import { handleBorder } from './handle-border';
import { getColor } from './handle-color';
import { handleTypography } from './handle-typography';

export const handleCursorEffect = (style, props, id) => {
    let elementStyle = elementVar();

    const {
        primaryColor,
        primarySize,
        type,
        textColor,
        background,
        padding,
        iconColor,
        iconSize,
        imageSize,
        textBorder,
        typography,
    } = style;

    switch (type) {
        case 'text':
            if(textColor){
                normalAppender({
                    style: `color: ${getColor(textColor)};`,
                    elementStyle
                });
            }
            if(background){
                const newElementStyle = handleBackground(background);
                elementStyle.adminStyle = {...elementStyle.adminStyle,
                    Desktop: `${elementStyle.adminStyle.Desktop} ${newElementStyle.adminStyle.Desktop}`,
                    Mobile: `${elementStyle.adminStyle.Tablet} ${newElementStyle.adminStyle.Tablet}`,
                    Tablet: `${elementStyle.adminStyle.Mobile} ${newElementStyle.adminStyle.Mobile}`,
                };
            }
            if(padding){
                DeviceLoop(device => {
                    const _dimension = deviceStyleValue(device, padding);
                    if(_dimension && _dimension.dimension){
                        responsiveAppender({
                            style: `padding-top: ${_dimension?.dimension.top}${_dimension?.unit}; padding-right: ${_dimension?.dimension.right}${_dimension?.unit}; padding-bottom: ${_dimension?.dimension.bottom}${_dimension?.unit}; padding-left: ${_dimension?.dimension.left}${_dimension?.unit};`,
                            device,
                            elementStyle
                        });
                    }
                });
            }
            if(textBorder){
                DeviceLoop(device => {
                    const _border = deviceStyleValue(device, textBorder);
                    const newElementStyle = handleBorder(_border);
                    elementStyle.adminStyle = {...elementStyle.adminStyle,
                        Desktop: `${elementStyle.adminStyle.Desktop} ${newElementStyle.adminStyle.Desktop}`,
                        Mobile: `${elementStyle.adminStyle.Tablet} ${newElementStyle.adminStyle.Tablet}`,
                        Tablet: `${elementStyle.adminStyle.Mobile} ${newElementStyle.adminStyle.Mobile}`,
                    };
                });
            }
            if(typography){
                const newElementStyle = handleTypography(typography, props, id);
                elementStyle.adminStyle = {...elementStyle.adminStyle,
                    Desktop: `${elementStyle.adminStyle.Desktop} ${newElementStyle.adminStyle.Desktop}`,
                    Mobile: `${elementStyle.adminStyle.Tablet} ${newElementStyle.adminStyle.Tablet}`,
                    Tablet: `${elementStyle.adminStyle.Mobile} ${newElementStyle.adminStyle.Mobile}`,
                };
            }
            break;

        case 'icon':
            if(iconColor){
                normalAppender({
                    style: `color: ${getColor(iconColor)};`,
                    elementStyle
                });
            }
            if(iconSize?.point){
                normalAppender({
                    style: `width: ${iconSize.point}${iconSize.unit};height: ${iconSize.point}${iconSize.unit};`,
                    elementStyle
                });
            }
            break;
        case 'image':
            if(imageSize?.point){
                normalAppender({
                    style: `width: ${imageSize.point}${imageSize.unit};height: ${imageSize.point}${imageSize.unit};`,
                    elementStyle
                });
            }
            break;

        default:
            if(primaryColor){
                normalAppender({
                    style: `border: 4px solid ${getColor(primaryColor)};`,
                    elementStyle
                });
            }
            if (primarySize?.point){
                normalAppender({
                    style: `
                        width: ${primarySize.point}${primarySize.unit};
                        height: ${primarySize.point}${primarySize.unit};
                    `,
                    elementStyle
                });
            }
            break;
    }
    return elementStyle;
};

export const handleInnerCursorEffect = (style) => {
    const elementStyle = elementVar();

    const {
        secondaryColor,
        secondarySize,
        defaultStyle
    } = style;

    if (secondaryColor){
        if(defaultStyle === 'style2'){
            normalAppender({
                style: `
                    &::before,
                    &::after {
                        background-color: ${getColor(secondaryColor)};
                    }
                `,
                elementStyle
            });
        }else {
            normalAppender({
                style: `background-color: ${getColor(secondaryColor)};`,
                elementStyle
            });
        }
    }
    if (secondarySize?.point){
        normalAppender({
            style: `
                width: ${secondarySize.point}${secondarySize.unit};
                height: ${secondarySize.point}${secondarySize.unit};
            `,
            elementStyle
        });
    }
    return elementStyle;
};
export const handleIconCursorEffect = (style) =>{
    const elementStyle = elementVar();

    const {
        iconSize,
    } = style;

    if(iconSize?.point){
        normalAppender({
            style: `font-size:${iconSize.point}${iconSize.unit};`,
            elementStyle
        });
    }
    return elementStyle;
};
export const handleImageCursorEffect = (style) =>{
    const elementStyle = elementVar();

    const {
        imageBorder,
    } = style;
    if(imageBorder){
        DeviceLoop(device => {
            const _imageBorder = deviceStyleValue(device, imageBorder);
            const newElementStyle = handleBorder(_imageBorder);
            elementStyle.adminStyle = {...elementStyle.adminStyle,
                Desktop: `${elementStyle.adminStyle.Desktop} ${newElementStyle.adminStyle.Desktop}`,
                Mobile: `${elementStyle.adminStyle.Tablet} ${newElementStyle.adminStyle.Tablet}`,
                Tablet: `${elementStyle.adminStyle.Mobile} ${newElementStyle.adminStyle.Mobile}`,
            };
        });
    }
    return elementStyle;
};
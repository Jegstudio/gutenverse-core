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
        imageHeight,
        imageWidth,
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
                normalAppender({
                    style: `padding-top: ${padding?.dimension?.top}${padding?.unit}; padding-right: ${padding?.dimension?.right}${padding?.unit}; padding-bottom: ${padding?.dimension?.bottom}${padding?.unit}; padding-left: ${padding?.dimension?.left}${padding?.unit};`,
                    elementStyle
                });
            }
            if(textBorder){
                const newElementStyle = handleBorder(textBorder);
                elementStyle.adminStyle = {...elementStyle.adminStyle,
                    Desktop: `${elementStyle.adminStyle.Desktop} ${newElementStyle.adminStyle.Desktop}`,
                    Mobile: `${elementStyle.adminStyle.Tablet} ${newElementStyle.adminStyle.Tablet}`,
                    Tablet: `${elementStyle.adminStyle.Mobile} ${newElementStyle.adminStyle.Mobile}`,
                };
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
            if(imageHeight?.point){
                normalAppender({
                    style: `height: ${imageHeight.point}${imageHeight.unit};`,
                    elementStyle
                });
            }
            if(imageWidth?.point){
                normalAppender({
                    style: `width: ${imageWidth.point}${imageWidth.unit};`,
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
    let elementStyle = elementVar();

    const {
        imageBorder,
    } = style;
    elementStyle = imageBorder? handleBorder(imageBorder): elementStyle;
    return elementStyle;
};
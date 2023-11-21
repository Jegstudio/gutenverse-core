import { elementVar, normalAppender } from '../styling-utility';
import { handleBackground } from './handle-background';
import { getColor } from './handle-color';

export const handleCursorEffect = (style) => {
    let elementStyle = elementVar();

    const {
        primaryColor,
        primarySize,
        type,
        textColor,
        background
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
                elementStyle = handleBackground(background);
            }
            break;

        case 'icon':
            
            break;

        case 'image':
            
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
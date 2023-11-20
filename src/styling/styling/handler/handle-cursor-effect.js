import { elementVar, normalAppender } from '../styling-utility';
import { getColor } from './handle-color';

export const handleCursorEffect = (style) => {
    const elementStyle = elementVar();

    const {
        primaryColor,
        primarySize,
        type
    } = style;

    if (type === 'default'){
        if(primaryColor){
            normalAppender({
                style: `border: 4px solid ${getColor(primaryColor)};`,
                elementStyle
            });
        }
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
import { elementVar, normalAppender } from '../styling-utility';

export const handleBackgroundEffect = (style) => {
    let elementStyle = elementVar();

    const {
        backgroundEffectSize = {point: 100, unit: 'px'},
    } = style;

    if(backgroundEffectSize){
        normalAppender({
            style: `width: ${backgroundEffectSize.point}${backgroundEffectSize.unit}; height: ${backgroundEffectSize.point}${backgroundEffectSize.unit};`,
            elementStyle
        });
    }
    return elementStyle;
};
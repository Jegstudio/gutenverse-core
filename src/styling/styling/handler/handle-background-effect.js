import { getDevice } from 'gutenverse-core/helper';
import { elementVar, normalAppender } from '../styling-utility';

export const handleBackgroundEffect = (style) => {
    let elementStyle = elementVar();
    const device = getDevice();

    const {
        backgroundEffectSize,
    } = style;

    if(backgroundEffectSize){
        normalAppender({
            style: `width: ${backgroundEffectSize[device]?.point}${backgroundEffectSize[device]?.unit}; height: ${backgroundEffectSize[device]?.point}${backgroundEffectSize[device]?.unit};`,
            elementStyle
        });
    }
    return elementStyle;
};
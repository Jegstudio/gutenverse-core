import { isEmpty } from 'lodash';
import { getColor } from 'gutenverse-core/controls';

export const handleTextShadow = (value) => {
    const { color, horizontal = 0, vertical = 0, blur = 0, spread } = value;
    const shadowColor = getColor(color);

    //check in case there is empty string as value (e.g. '')
    const horizontalValue = ! isEmpty(horizontal) ? horizontal : 0;
    const verticalValue = ! isEmpty(vertical) ? vertical : 0;
    const blurValue = ! isEmpty(blur) ? blur : 0;
    const isSpread = ! isEmpty(spread) ? `${spread}px` : '';

    return `text-shadow: ${horizontalValue}px ${verticalValue}px ${blurValue}px ${isSpread} ${shadowColor};`;
};

export const allowRenderTextShadow = (value) => {
    const { color } = value;
    return color && Object.keys(color).length !== 0;
};
import isEmpty from 'lodash/isEmpty';
import { getColor } from 'gutenverse-core/styling';

export const handleTextShadow = (value) => {
    const { color, horizontal = 0, vertical = 0, blur = 0 } = value;
    const shadowColor = getColor(color);

    //check in case there is empty string as value (e.g. '')
    const horizontalValue = ! isEmpty(horizontal) ? horizontal : 0;
    const verticalValue = ! isEmpty(vertical) ? vertical : 0;
    const blurValue = ! isEmpty(blur) ? blur : 0;

    return `text-shadow: ${horizontalValue}px ${verticalValue}px ${blurValue}px ${shadowColor};`;
};

export const allowRenderTextShadow = (value) => {
    const { color } = value;
    return color && Object.keys(color).length !== 0;
};
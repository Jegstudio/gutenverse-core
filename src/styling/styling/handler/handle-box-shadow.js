import isEmpty from 'lodash/isEmpty';
import { getColor } from 'gutenverse-core/styling';

export const handleBoxShadow = (value) => {
    const { color = {}, horizontal= 0, vertical = 0, blur = 0, spread, position } = value;
    const shadowColor = getColor(color);

    //check in case there is empty string as value (e.g. '')
    const horizontalValue = ! isEmpty(horizontal) ? horizontal : 0;
    const verticalValue = ! isEmpty(vertical) ? vertical : 0;
    const blurValue = ! isEmpty(blur) ? blur : 0;
    const isSpread = ! isEmpty(spread) ? `${spread}px` : '';

    return `box-shadow: ${position === 'inset' ? position : ''} ${horizontalValue}px ${verticalValue}px ${blurValue}px ${isSpread} ${shadowColor};`;
};

export const allowRenderBoxShadow = (value = {}) => {
    const { color } = value;
    return color && Object.keys(color).length !== 0;
};
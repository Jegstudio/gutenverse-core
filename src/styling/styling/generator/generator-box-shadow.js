import isEmpty from 'lodash/isEmpty';
import { getColor } from 'gutenverse-core/styling';

export const boxShadowCSS = (attribute) => {
    const { color = {r: 1, g: 1, b: 1, a: 0.5}, horizontal = 0, vertical = 0, blur = 10, spread, position } = attribute;
    const shadowColor = getColor(color);

    const horizontalValue = !isEmpty(horizontal) ? horizontal : 0;
    const verticalValue = !isEmpty(vertical) ? vertical : 0;
    const blurValue = !isEmpty(blur) ? blur : 0;
    const isSpread = !isEmpty(spread) ? `${spread}px` : '';

    return `${position === 'inset' ? position : ''} ${horizontalValue}px ${verticalValue}px ${blurValue}px ${isSpread} ${shadowColor}`;
};

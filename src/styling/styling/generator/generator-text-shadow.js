import isEmpty from 'lodash/isEmpty';
import { getColor } from 'gutenverse-core/styling';

export const textShadowCSS = (attribute) => {
    const { color, horizontal = 0, vertical = 0, blur = 0 } = attribute;
    if( ! color || Object.keys(color).length === 0 ){
        return null;
    }
    const shadowColor = getColor(color);

    //check in case there is empty string as value (e.g. '')
    const horizontalValue = ! isEmpty(horizontal) ? horizontal : 0;
    const verticalValue = ! isEmpty(vertical) ? vertical : 0;
    const blurValue = ! isEmpty(blur) ? blur : 0;

    return `${horizontalValue}px ${verticalValue}px ${blurValue}px ${shadowColor};`;
};

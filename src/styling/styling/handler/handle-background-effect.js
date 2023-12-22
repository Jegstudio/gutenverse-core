import { elementVar, normalAppender } from '../styling-utility';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const handleBackgroundEffect = (style) => {
    let elementStyle = elementVar();

    const {
        hiddenOverflow,
    } = style;
    if ( hiddenOverflow ) {
        normalAppender({
            style: `overflow: ${hiddenOverflow ? 'hidden' : 'visible'};`,
            elementStyle
        });
    }
    return elementStyle;
};

export const handleInnerBackgroundEffect = (style) => {
    let elementStyle = elementVar();

    const {
        boxShadow
    } = style;
    if ( boxShadow ) {
        const style = handleBoxShadow(boxShadow);
        normalAppender({
            style: style,
            elementStyle
        });
    }
    return elementStyle;
};
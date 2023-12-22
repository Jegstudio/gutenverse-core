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

// export const handleOrientationBackgroundEffect = (style) => {
//     let elementStyle = elementVar();

//     const {
//         leftOrientation,
//         topOrientation,
//     } = style;
//     if(topOrientation){
//         DeviceLoop(device => {
//             const _top = deviceStyleValue(device, topOrientation);

//             if (_top) {
//                 responsiveAppender({
//                     style: `${};`,
//                     device,
//                     elementStyle: elementStyle
//                 });
//             }
//         });
//     }
//     if(leftOrientation){
//         DeviceLoop(device => {
//             const _left = deviceStyleValue(device, leftOrientation);

//             if (_left) {
//                 responsiveAppender({
//                     style: `${}`,
//                     device,
//                     elementStyle: elementStyle
//                 });
//             }
//         });
//     }
//     return elementStyle;
// };
import { elementVar, normalAppender } from '../styling-utility';

export const handleBackgroundEffect = (style) => {
    let elementStyle = elementVar();

    const {
        hiddenOverflow,
    } = style;
    if(hiddenOverflow){
        normalAppender({
            style: `overflow: ${hiddenOverflow ? 'hidden' : 'visible'};`,
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
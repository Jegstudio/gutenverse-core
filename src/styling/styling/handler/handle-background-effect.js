import { elementVar, normalAppender, responsiveAppender, DeviceLoop, deviceStyleValue } from '../styling-utility';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const handleBackgroundEffect = (style) => {
    let elementStyle = elementVar();

    const {
        hiddenOverflow,
        opacity
    } = style;
    if ( hiddenOverflow ) {
        normalAppender({
            style: `overflow: ${hiddenOverflow ? 'hidden' : 'visible'};`,
            elementStyle
        });
    }
    if ( opacity ) {
        DeviceLoop(device => {
            const _opacity = deviceStyleValue(device, opacity);

            if (_opacity) {
                responsiveAppender({
                    style: `opacity: ${_opacity};`,
                    device,
                    elementStyle: elementStyle
                });
            }
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
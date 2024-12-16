import { handleColor, DeviceLoop, deviceStyleValue, elementVar, normalAppender, responsiveAppender } from 'gutenverse-core/styling';

export const handleTextStroke = (props) => {
    const {
        color,
        width,
    } = props;
    const elementStyle = elementVar();

    if (color) {
        const result = handleColor(color, '-webkit-text-stroke-color');
        const result2 = handleColor(color, 'stroke');
        normalAppender({
            style: `${result} ${result2}`,
            elementStyle
        });
    }

    if (width) {
        DeviceLoop(device => {
            const _width = deviceStyleValue(device, width);
            responsiveAppender({
                style: `-webkit-text-stroke-width: ${_width.point}${_width.unit}; stroke-width: ${_width.point}${_width.unit};`,
                device,
                elementStyle
            });
        });
    }
};
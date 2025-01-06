import { handleColor, elementVar, normalAppender} from 'gutenverse-core/styling';

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
            elementStyle: elementStyle
        });
    }

    if (width) {
        normalAppender({
            style: ` -webkit-text-stroke-width: ${width.point}${width.unit}; stroke-width: ${width.point}${width.unit};`,
            elementStyle: elementStyle
        });
    }

    return elementStyle;
};
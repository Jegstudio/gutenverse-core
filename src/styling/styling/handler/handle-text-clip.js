import isEmpty from 'lodash/isEmpty';
import { getUnitPoint, elementVar, normalAppender} from 'gutenverse-core/styling';

export const handleTextClip = (background) => {
    const { type } = background;
    const elementStyle = elementVar();

    if (type !== '') {
        normalAppender({
            style: '-webkit-background-clip: text !important; -webkit-text-fill-color: transparent;',
            elementStyle
        });
    }

    if (type === 'image') {
        const {
            image,
            position,
            xposition = {},
            yposition = {},
            repeat,
            size,
            width,
            blendMode,
            fixed
        } = background;

        if (image) {
            normalAppender({
                style: `background-image: url(${image.image});`,
                elementStyle
            });
        }

        if (position) {
            if (position && position !== 'default' && position !== 'custom') {
                normalAppender({
                    style: `background-position: ${position};`,
                    elementStyle
                });
            } else if (position && position === 'custom' && (xposition || yposition)) {
                const xFinalPosition = xposition && !isEmpty(getUnitPoint(xposition)) ? `background-position-x: ${getUnitPoint(xposition)};` : '';
                const yFinalPosition = yposition && !isEmpty(getUnitPoint(yposition)) ? `background-position-y: ${getUnitPoint(yposition)};` : '';

                normalAppender({
                    style: `${xFinalPosition} ${yFinalPosition}`,
                    elementStyle
                });
            }
        }

        if (repeat) {
            if (repeat && repeat !== 'default') {
                normalAppender({
                    style: `background-repeat: ${repeat};`,
                    elementStyle
                });
            }
        }

        if (size) {
            if (size && size !== 'default' && size !== 'custom') {
                normalAppender({
                    style: `background-size: ${size};`,
                    elementStyle
                });
            } else if (size && size === 'custom' && width) {
                normalAppender({
                    style: `background-size: ${width.point}${width.unit};`,
                    elementStyle
                });
            }
        }

        if (blendMode) {
            normalAppender({
                style: `background-blend-mode: ${blendMode};`,
                elementStyle
            });
        }


        if (fixed) {
            const fixedValue = fixed ? 'fixed' : 'scroll';

            if (fixedValue) {
                normalAppender({
                    style: `background-attachment: ${fixedValue};`,
                    elementStyle
                });
            }
        }

        return elementStyle;
    } else if (type === 'gradient') {
        const {
            gradientColor,
            gradientType = 'linear',
            gradientAngle = 180,
            gradientRadial = 'center center'
        } = background;

        if (gradientColor !== undefined) {
            const colors = gradientColor.map(gradient => `${gradient.color} ${gradient.offset * 100}%`);

            if (gradientType === 'radial') {
                normalAppender({
                    style: `background: radial-gradient(at ${gradientRadial}, ${colors.join(',')});`,
                    elementStyle
                });
            } else {
                normalAppender({
                    style: `background: linear-gradient(${gradientAngle}deg, ${colors.join(',')});`,
                    elementStyle
                });
            }
        }

        return elementStyle;
    } else {
        return elementVar();
    }
};
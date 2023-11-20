import isEmpty from 'lodash/isEmpty';
import { handleColor, handleDimension, DeviceLoop, deviceStyleValue, elementVar, responsiveAppender } from 'gutenverse-core/styling';

export const handleBorder = (value) => {
    const elementStyle = elementVar();

    DeviceLoop((device) => {
        const border = deviceStyleValue(device, value);

        if (isEmpty(border)) {
            return;
        }

        const keys = Object.keys(border);
        const sortedKeys = [
            ...keys.filter(key => key === 'all'),
            ...keys.filter(key => key !== 'all'),
        ];

        // console.log(border);

        sortedKeys.map((pos) => {
            if (!isEmpty(border[pos]) && border[pos].type && border[pos].type !== 'default') {
                const position = 'all' === pos ? '' : `${pos}-`;

                responsiveAppender({
                    style: `border-${position}style: ${border[pos].type};`,
                    device,
                    elementStyle,
                });

                if (border[pos].width) {
                    responsiveAppender({
                        style: `border-${position}width: ${border[pos].width}px;`,
                        device,
                        elementStyle,
                    });
                }

                if (border[pos].color) {
                    responsiveAppender({
                        style: `${handleColor(border[pos].color, `border-${position}color`)}`,
                        device,
                        elementStyle,
                    });
                }
            }

            if (!isEmpty(border['radius'])) {
                responsiveAppender({
                    style: `${handleDimension(border['radius'], 'border-radius', false)}`,
                    device,
                    elementStyle,
                });
            }
        });
    });

    return elementStyle;
};

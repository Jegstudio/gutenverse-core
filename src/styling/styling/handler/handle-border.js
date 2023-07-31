import { isEmpty } from 'lodash';
import { handleColor, handleDimension, DeviceLoop, deviceStyleValue, elementVar, normalAppender, responsiveAppender } from 'gutenverse-core/styling';

export const handleBorder = (value) => {
    const elementStyle = elementVar();
    const keys = Object.keys(value);
    const sortedKeys = [
        ...keys.filter(key => key === 'all'),
        ...keys.filter(key => key !== 'all'),
    ];

    sortedKeys.map((pos) => {
        if (pos === 'radius') {
            DeviceLoop((device) => {
                const _radius = deviceStyleValue(device, value[pos]);

                responsiveAppender({
                    style: `${handleDimension(_radius, 'border-radius', false)}`,
                    device,
                    elementStyle,
                });
            });
        } else if (!isEmpty(value[pos]) && value[pos].type && value[pos].type !== 'default') {
            const position = 'all' === pos ? '' : `${pos}-`;

            normalAppender({
                style: `border-${position}style: ${value[pos].type};`,
                elementStyle,
            });

            if (value[pos].width) {
                normalAppender({
                    style: `border-${position}width: ${value[pos].width}px;`,
                    elementStyle,
                });
            }

            if (value[pos].color) {
                normalAppender({
                    style: `${handleColor(value[pos].color, `border-${position}color`)}`,
                    elementStyle,
                });
            }
        }
    });

    return elementStyle;
};

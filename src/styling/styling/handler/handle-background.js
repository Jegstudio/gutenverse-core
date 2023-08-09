import isEmpty from 'lodash/isEmpty';
import { handleColor, getUnitPoint, DeviceLoop, deviceStyleValue, elementVar, normalAppender, responsiveAppender } from 'gutenverse-core/styling';

export const handleBackground = (background) => {
    const { type } = background;
    const elementStyle = elementVar();

    if (type === 'default') {
        const {
            color,
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

        if (color) {
            const result = handleColor(color, 'background-color');

            normalAppender({
                style: result,
                elementStyle
            });
        }

        if (image) {
            DeviceLoop(device => {
                const _image = deviceStyleValue(device, image);

                if (_image && _image.image) {
                    responsiveAppender({
                        style: `background-image: url(${_image.image});`,
                        device,
                        elementStyle
                    });
                }
            });
        }

        if (position) {
            DeviceLoop(device => {
                const _position = deviceStyleValue(device, position);
                const _xposition = deviceStyleValue(device, xposition);
                const _yposition = deviceStyleValue(device, yposition);

                if (_position && _position !== 'default' && _position !== 'custom') {
                    responsiveAppender({
                        style: `background-position: ${_position};`,
                        device,
                        elementStyle
                    });
                } else if (_position && _position === 'custom' && ( _xposition || _yposition ) ) {
                    const xFinalPosition = _xposition && ! isEmpty(getUnitPoint( _xposition )) ? `background-position-x: ${getUnitPoint( _xposition )};` : '';
                    const yFinalPosition = _yposition && ! isEmpty(getUnitPoint( _yposition )) ? `background-position-y: ${getUnitPoint( _yposition )};` : '';

                    responsiveAppender({
                        style: `${xFinalPosition} ${yFinalPosition}`,
                        device,
                        elementStyle
                    });
                }
            });
        }

        if (repeat) {
            DeviceLoop(device => {
                const _repeat = deviceStyleValue(device, repeat);

                if (_repeat && _repeat !== 'default') {
                    responsiveAppender({
                        style: `background-repeat: ${_repeat};`,
                        device,
                        elementStyle
                    });
                }
            });
        }

        if (size) {
            DeviceLoop(device => {
                const _size = deviceStyleValue(device, size);

                if (_size && _size !== 'default' && _size !== 'custom') {
                    responsiveAppender({
                        style: `background-size: ${_size};`,
                        device,
                        elementStyle
                    });
                } else if (_size && _size === 'custom' && width) {
                    const _width = deviceStyleValue(device, width);

                    responsiveAppender({
                        style: `background-size: ${_width.point}${_width.unit};`,
                        device,
                        elementStyle
                    });
                }
            });
        }

        if (blendMode) {
            DeviceLoop(device => {
                const _blend = deviceStyleValue(device, blendMode);

                if (_blend) {
                    responsiveAppender({
                        style: `background-blend-mode: ${_blend};`,
                        device,
                        elementStyle
                    });
                }
            });
        }

        if (fixed) {
            DeviceLoop(device => {
                const _fixed = deviceStyleValue(device, fixed);
                const _fixedValue = _fixed ? 'fixed': 'scroll';

                if (_fixedValue) {
                    responsiveAppender({
                        style: `background-attachment: ${_fixedValue};`,
                        device,
                        elementStyle
                    });
                }
            });
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
    } else if (type === 'video') {
        const {
            videoImage = {}
        } = background;

        DeviceLoop(device => {
            const _videoImage = deviceStyleValue(device, videoImage);

            if (_videoImage) {
                responsiveAppender({
                    style: `background-image: url(${_videoImage.image}); background-size: cover; background-position: center;`,
                    device,
                    elementStyle
                });
            }
        });

        return elementStyle;
    } else {
        return elementVar();
    }
};
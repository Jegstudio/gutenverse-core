import { DeviceLoop, deviceStyleValue, elementVar, normalAppender, responsiveAppender } from 'gutenverse-core/styling';
import isEmpty from 'lodash/isEmpty';

export const handleTransform = (values) => {
    if (values === undefined) return;

    const elementStyle = elementVar();
    const {
        duration,
        ease,
        perspective,
        transformOrigin,
        rotateZ,
        rotateX,
        rotateY,
        scaleX,
        scaleY,
        moveX,
        moveY,
        moveZ,
        skewX,
        skewY,
        opacity,
    } = values;

    const duration_ = ! isEmpty(duration) ? duration: '0.4';
    normalAppender({
        style: `transition: transform ${duration_}s, opacity ${duration_}s;`,
        elementStyle
    });

    if (ease) {
        normalAppender({
            style: `transition-timing-function: ${ease};`,
            elementStyle
        });
    }

    if (transformOrigin) {
        DeviceLoop(device => {
            const _transformOrigin = deviceStyleValue(device, transformOrigin);

            if (_transformOrigin) {
                responsiveAppender({
                    style: `transform-origin: ${_transformOrigin};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    const transformStyle = elementVar();

    if (perspective) {
        DeviceLoop(device => {
            const _perspective = deviceStyleValue(device, perspective);

            if (_perspective && _perspective.point) {
                responsiveAppender({
                    style: `perspective(${_perspective.point}${_perspective.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (rotateZ) {
        DeviceLoop(device => {
            const _rotateZ = deviceStyleValue(device, rotateZ);

            if (_rotateZ && _rotateZ.point) {
                responsiveAppender({
                    style: `rotate(${_rotateZ.point}${_rotateZ.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (rotateX) {
        DeviceLoop(device => {
            const _rotateX = deviceStyleValue(device, rotateX);

            if (_rotateX && _rotateX.point) {
                responsiveAppender({
                    style: `rotateX(${_rotateX.point}${_rotateX.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (rotateY) {
        DeviceLoop(device => {
            const _rotateY = deviceStyleValue(device, rotateY);

            if (_rotateY && _rotateY.point) {
                responsiveAppender({
                    style: `rotateY(${_rotateY.point}${_rotateY.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (scaleX) {
        DeviceLoop(device => {
            const _scaleX = deviceStyleValue(device, scaleX);

            if (_scaleX) {
                responsiveAppender({
                    style: `scaleX(${_scaleX}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (scaleY) {
        DeviceLoop(device => {
            const _scaleY = deviceStyleValue(device, scaleY);

            if (_scaleY) {
                responsiveAppender({
                    style: `scaleY(${_scaleY}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (moveZ) {
        DeviceLoop(device => {
            const _moveZ = deviceStyleValue(device, moveZ);

            if (_moveZ && _moveZ.point) {
                responsiveAppender({
                    style: `translate(${_moveZ.point}${_moveZ.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (moveX) {
        DeviceLoop(device => {
            const _moveX = deviceStyleValue(device, moveX);

            if (_moveX && _moveX.point) {
                responsiveAppender({
                    style: `translateX(${_moveX.point}${_moveX.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (moveY) {
        DeviceLoop(device => {
            const _moveY = deviceStyleValue(device, moveY);

            if (_moveY && _moveY.point) {
                responsiveAppender({
                    style: `translateY(${_moveY.point}${_moveY.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (skewX) {
        DeviceLoop(device => {
            const _skewX = deviceStyleValue(device, skewX);

            if (_skewX && _skewX.point) {
                responsiveAppender({
                    style: `skewX(${_skewX.point}${_skewX.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (skewY) {
        DeviceLoop(device => {
            const _skewY = deviceStyleValue(device, skewY);

            if (_skewY && _skewY.point) {
                responsiveAppender({
                    style: `skewY(${_skewY.point}${_skewY.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (opacity) {
        const opacity_ = ! isEmpty(opacity) ? opacity: '1';

        normalAppender({
            style: `opacity: ${opacity_};`,
            elementStyle
        });
    }

    return {
        adminStyle: {
            Desktop: `${elementStyle?.adminStyle?.Desktop} transform: ${transformStyle?.adminStyle?.Desktop};`,
            Tablet: `${elementStyle?.adminStyle?.Tablet} transform: ${transformStyle?.adminStyle?.Tablet};`,
            Mobile: `${elementStyle?.adminStyle?.Mobile} transform: ${transformStyle?.adminStyle?.Mobile};`
        }
    };
};

export const handleTransformHover = (values) => {
    if (values === undefined) return;

    const elementStyle = elementVar();
    const {
        rotateZHover,
        rotateXHover,
        rotateYHover,
        scaleXHover,
        scaleYHover,
        moveXHover,
        moveYHover,
        moveZHover,
        skewXHover,
        skewYHover,
        opacityHover
    } = values;

    const transformStyle = elementVar();

    if (rotateZHover) {
        DeviceLoop(device => {
            const _rotateZ = deviceStyleValue(device, rotateZHover);

            if (_rotateZ && _rotateZ.point) {
                responsiveAppender({
                    style: `rotate(${_rotateZ.point}${_rotateZ.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (rotateXHover) {
        DeviceLoop(device => {
            const _rotateX = deviceStyleValue(device, rotateXHover);

            if (_rotateX && _rotateX.point) {
                responsiveAppender({
                    style: `rotateX(${_rotateX.point}${_rotateX.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (rotateYHover) {
        DeviceLoop(device => {
            const _rotateY = deviceStyleValue(device, rotateYHover);

            if (_rotateY && _rotateY.point) {
                responsiveAppender({
                    style: `rotateY(${_rotateY.point}${_rotateY.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (scaleXHover) {
        DeviceLoop(device => {
            const _scaleX = deviceStyleValue(device, scaleXHover);

            if (_scaleX) {
                responsiveAppender({
                    style: `scaleX(${_scaleX}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (scaleYHover) {
        DeviceLoop(device => {
            const _scaleY = deviceStyleValue(device, scaleYHover);

            if (_scaleY) {
                responsiveAppender({
                    style: `scaleY(${_scaleY}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (moveZHover) {
        DeviceLoop(device => {
            const _moveZ = deviceStyleValue(device, moveZHover);

            if (_moveZ && _moveZ.point) {
                responsiveAppender({
                    style: `translate(${_moveZ.point}${_moveZ.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (moveYHover) {
        DeviceLoop(device => {
            const _moveY = deviceStyleValue(device, moveYHover);

            if (_moveY && _moveY.point) {
                responsiveAppender({
                    style: `translateY(${_moveY.point}${_moveY.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (moveXHover) {
        DeviceLoop(device => {
            const _moveX = deviceStyleValue(device, moveXHover);

            if (_moveX && _moveX.point) {
                responsiveAppender({
                    style: `translateX(${_moveX.point}${_moveX.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (skewXHover) {
        DeviceLoop(device => {
            const _skewX = deviceStyleValue(device, skewXHover);

            if (_skewX && _skewX.point) {
                responsiveAppender({
                    style: `skewX(${_skewX.point}${_skewX.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (skewYHover) {
        DeviceLoop(device => {
            const _skewY = deviceStyleValue(device, skewYHover);

            if (_skewY && _skewY.point) {
                responsiveAppender({
                    style: `skewY(${_skewY.point}${_skewY.unit}) `,
                    device,
                    elementStyle: transformStyle
                });
            }
        });
    }

    if (opacityHover) {
        const opacity_ = ! isEmpty(opacityHover) ? opacityHover: '1';

        normalAppender({
            style: `opacity: ${opacity_};`,
            elementStyle
        });
    }

    return {
        adminStyle: {
            Desktop: `${elementStyle?.adminStyle?.Desktop} transform: ${transformStyle?.adminStyle?.Desktop};`,
            Tablet: `${elementStyle?.adminStyle?.Tablet} transform: ${transformStyle?.adminStyle?.Tablet};`,
            Mobile: `${elementStyle?.adminStyle?.Mobile} transform: ${transformStyle?.adminStyle?.Mobile};`
        }
    };
};

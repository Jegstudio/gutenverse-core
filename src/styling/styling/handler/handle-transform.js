import { DeviceLoop, deviceStyleValue, elementVar, normalAppender, responsiveAppender } from 'gutenverse-core/styling';

export const handleTransform = (values) => {
    if (values === undefined) return;

    const elementStyle = elementVar();
    const {
        duration,
        ease,
        perspective,
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

    if (duration) {
        normalAppender({
            style: `--gutenverse-transform-transition-duration: ${duration}s;`,
            elementStyle
        });
    }

    if (ease) {
        normalAppender({
            style: `--gutenverse-transform-timing-function: ${ease};`,
            elementStyle
        });
    }

    if (perspective) {
        DeviceLoop(device => {
            const _perspective = deviceStyleValue(device, perspective);

            if (_perspective && _perspective.point) {
                responsiveAppender({
                    style: `--guten-transform-perspective: ${_perspective.point}${_perspective.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (rotateZ) {
        DeviceLoop(device => {
            const _rotateZ = deviceStyleValue(device, rotateZ);

            if (_rotateZ && _rotateZ.point) {
                responsiveAppender({
                    style: `--guten-transform-rotateZ: ${_rotateZ.point}${_rotateZ.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (rotateX) {
        DeviceLoop(device => {
            const _rotateX = deviceStyleValue(device, rotateX);

            if (_rotateX && _rotateX.point) {
                responsiveAppender({
                    style: `--guten-transform-rotateX: ${_rotateX.point}${_rotateX.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (rotateY) {
        DeviceLoop(device => {
            const _rotateY = deviceStyleValue(device, rotateY);

            if (_rotateY && _rotateY.point) {
                responsiveAppender({
                    style: `--guten-transform-rotateY: ${_rotateY.point}${_rotateY.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (scaleX) {
        DeviceLoop(device => {
            const _scaleX = deviceStyleValue(device, scaleX);

            if (_scaleX) {
                responsiveAppender({
                    style: `--guten-transform-scaleX: ${_scaleX};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (scaleY) {
        DeviceLoop(device => {
            const _scaleY = deviceStyleValue(device, scaleY);

            if (_scaleY) {
                responsiveAppender({
                    style: `--guten-transform-scaleY: ${_scaleY};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (moveZ) {
        DeviceLoop(device => {
            const _moveZ = deviceStyleValue(device, moveZ);

            if (_moveZ && _moveZ.point) {
                responsiveAppender({
                    style: `--guten-transform-moveZ: ${_moveZ.point}${_moveZ.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (moveX) {
        DeviceLoop(device => {
            const _moveX = deviceStyleValue(device, moveX);

            if (_moveX && _moveX.point) {
                responsiveAppender({
                    style: `--guten-transform-moveX: ${_moveX.point}${_moveX.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (moveY) {
        DeviceLoop(device => {
            const _moveY = deviceStyleValue(device, moveY);

            if (_moveY && _moveY.point) {
                responsiveAppender({
                    style: `--guten-transform-moveY: ${_moveY.point}${_moveY.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (skewX) {
        DeviceLoop(device => {
            const _skewX = deviceStyleValue(device, skewX);

            if (_skewX && _skewX.point) {
                responsiveAppender({
                    style: `--guten-transform-skewX: ${_skewX.point}${_skewX.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (skewY) {
        DeviceLoop(device => {
            const _skewY = deviceStyleValue(device, skewY);

            if (_skewY && _skewY.point) {
                responsiveAppender({
                    style: `--guten-transform-skewY: ${_skewY.point}${_skewY.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (opacity) {
        normalAppender({
            style: `--gutenverse-transform-opacity: ${opacity};`,
            elementStyle
        });
    }

    return elementStyle;
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

    if (rotateZHover) {
        DeviceLoop(device => {
            const _rotateZ = deviceStyleValue(device, rotateZHover);

            if (_rotateZ && _rotateZ.point) {
                responsiveAppender({
                    style: `--guten-transform-rotateZ: ${_rotateZ.point}${_rotateZ.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (rotateXHover) {
        DeviceLoop(device => {
            const _rotateX = deviceStyleValue(device, rotateXHover);

            if (_rotateX && _rotateX.point) {
                responsiveAppender({
                    style: `--guten-transform-rotateX: ${_rotateX.point}${_rotateX.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (rotateYHover) {
        DeviceLoop(device => {
            const _rotateY = deviceStyleValue(device, rotateYHover);

            if (_rotateY && _rotateY.point) {
                responsiveAppender({
                    style: `--guten-transform-rotateY: ${_rotateY.point}${_rotateY.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (scaleXHover) {
        DeviceLoop(device => {
            const _scaleX = deviceStyleValue(device, scaleXHover);

            if (_scaleX) {
                responsiveAppender({
                    style: `--guten-transform-scaleX: ${_scaleX};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (scaleYHover) {
        DeviceLoop(device => {
            const _scaleY = deviceStyleValue(device, scaleYHover);

            if (_scaleY) {
                responsiveAppender({
                    style: `--guten-transform-scaleY: ${_scaleY};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (moveZHover) {
        DeviceLoop(device => {
            const _moveZ = deviceStyleValue(device, moveZHover);

            if (_moveZ && _moveZ.point) {
                responsiveAppender({
                    style: `--guten-transform-moveZ: ${_moveZ.point}${_moveZ.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (moveYHover) {
        DeviceLoop(device => {
            const _moveY = deviceStyleValue(device, moveYHover);

            if (_moveY && _moveY.point) {
                responsiveAppender({
                    style: `--guten-transform-moveY: ${_moveY.point}${_moveY.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (moveXHover) {
        DeviceLoop(device => {
            const _moveX = deviceStyleValue(device, moveXHover);

            if (_moveX && _moveX.point) {
                responsiveAppender({
                    style: `--guten-transform-moveX: ${_moveX.point}${_moveX.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (skewXHover) {
        DeviceLoop(device => {
            const _skewX = deviceStyleValue(device, skewXHover);

            if (_skewX && _skewX.point) {
                responsiveAppender({
                    style: `--guten-transform-skewX: ${_skewX.point}${_skewX.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (skewYHover) {
        DeviceLoop(device => {
            const _skewY = deviceStyleValue(device, skewYHover);

            if (_skewY && _skewY.point) {
                responsiveAppender({
                    style: `--guten-transform-skewY: ${_skewY.point}${_skewY.unit};`,
                    device,
                    elementStyle
                });
            }
        });
    }

    if (opacityHover) {
        normalAppender({
            style: `--gutenverse-transform-opacity: ${opacityHover};`,
            elementStyle
        });
    }

    return elementStyle;
};

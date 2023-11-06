import { DeviceLoop, deviceStyleValue, elementVar, getUnitPoint, normalAppender, responsiveAppender } from 'gutenverse-core/styling';
import isEmpty from 'lodash/isEmpty';

export const handleMask = (props) => {
    const elementStyle = elementVar();
    const { shape } = props;
    const { imgDir } = window['GutenverseConfig'];

    if ('' !== shape) {
        const { size, scale, position, xposition = {}, yposition = {}, repeat } = props;
        let svgImage = '';

        switch (shape) {
            case 'circle':
                svgImage = imgDir + '/mask/circe.svg';
                break;
            case 'triangle':
                svgImage = imgDir + '/mask/triangle.svg';
                break;
            case 'blob':
                svgImage = imgDir + '/mask/blob.svg';
                break;
            case 'custom':
                const { svg } = props;
                if (svg) {
                    const { image } = svg;
                    svgImage = image;
                }
                break;
        }

        if (!isEmpty(svgImage)) {
            normalAppender({
                style: `-webkit-mask-image: url('${svgImage}'); mask-image: url('${svgImage}');`,
                elementStyle
            });
        }


        if (size) {
            DeviceLoop(device => {
                const _size = deviceStyleValue(device, size);

                if (_size && _size !== 'custom') {
                    responsiveAppender({
                        style: `-webkit-mask-size: ${_size};`,
                        device,
                        elementStyle
                    });
                } else {
                    if (scale) {
                        const _scale = deviceStyleValue(device, scale);
                        responsiveAppender({
                            style: `-webkit-mask-size: ${getUnitPoint(_scale)};`,
                            device,
                            elementStyle
                        });
                    }
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
                        style: `-webkit-mask-position: ${_position};`,
                        device,
                        elementStyle
                    });
                } else if (_position && _position === 'custom' && (_xposition || _yposition)) {
                    const xFinalPosition = _xposition && !isEmpty(getUnitPoint(_xposition)) ? getUnitPoint(_xposition) : 0;
                    const yFinalPosition = _yposition && !isEmpty(getUnitPoint(_yposition)) ? getUnitPoint(_yposition) : 0;

                    responsiveAppender({
                        style: `-webkit-mask-position: ${xFinalPosition} ${yFinalPosition};`,
                        device,
                        elementStyle
                    });
                }
            });
        }

        if (repeat) {
            DeviceLoop(device => {
                const _repeat = deviceStyleValue(device, repeat);

                responsiveAppender({
                    style: `-webkit-mask-repeat: ${_repeat};`,
                    device,
                    elementStyle
                });
            });
        }
    }

    return elementStyle;
};
import { DeviceLoop, deviceStyleValue, elementVar, responsiveAppender } from '../styling-utility';

export const handlePointerEvent = (props) => {
    const elementStyle = elementVar();

    const { pointer } = props;

    if (pointer) {
        DeviceLoop( device => {
            const _pointer = deviceStyleValue(device, pointer);

            if ( _pointer ) {
                responsiveAppender({
                    style: `pointer-events: ${_pointer} !important;`,
                    device,
                    elementStyle
                });
            }
        });
    }

    return elementStyle;
};
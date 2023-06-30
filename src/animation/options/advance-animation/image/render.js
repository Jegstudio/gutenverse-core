import { getDimension } from 'gutenverse-core/controls';
import { getFilter } from 'gutenverse-core/controls';
import { DeviceLoop, deviceStyleValue } from 'gutenverse-core/controls';

export const renderBorderRadius = ({ action, from, to, device, elementId }) => {
    const {
        imageBorderRadiusFrom = {},
        imageBorderRadiusTo = {}
    } = action;

    let animation = {};
    let dFrom = {};
    let dTo = { ...to };

    if (device) {
        from['borderRadius'] = getDimension(deviceStyleValue(device, imageBorderRadiusFrom));
        to['borderRadius'] = getDimension(deviceStyleValue(device, imageBorderRadiusTo));

        animation[device] = { from, to };
    } else {
        DeviceLoop(device => {
            dFrom = {};
            dTo = { ...to };

            dFrom['borderRadius'] = getDimension(deviceStyleValue(device, imageBorderRadiusFrom));
            dTo['borderRadius'] = getDimension(deviceStyleValue(device, imageBorderRadiusTo));

            animation[device] = { from: dFrom, to: dTo };
        });
    }

    return [{ selector: `.${elementId} img`, ...animation }];
};

export const renderFilter = ({ action, from, to, elementId }) => {
    const {
        imageFilterFrom = {},
        imageFilterTo = {}
    } = action;

    from['filter'] = getFilter(imageFilterFrom);
    to['filter'] = getFilter(imageFilterTo);

    return [{ selector: `.${elementId} img`, from, to }];
};
import { getUnitPoint } from 'gutenverse-core/styling';
import { DeviceLoop, deviceStyleValue } from 'gutenverse-core/styling';

export const renderWidth = ({ action, from, to, device, elementId }) => {
    const {
        bgScrollWidthFrom = {},
        bgScrollWidthTo = {}
    } = action;

    const dataId = elementId ? elementId.split('-')[1] : '';

    let animation = {};
    let dFrom = {};
    let dTo = { ...to };

    if (device) {
        from['width'] = getUnitPoint(deviceStyleValue(device, bgScrollWidthFrom));
        to['width'] = getUnitPoint(deviceStyleValue(device, bgScrollWidthTo));

        animation[device] = { from, to };
    } else {
        DeviceLoop(device => {
            dFrom = {};
            dTo = { ...to };

            dFrom['width'] = getUnitPoint(deviceStyleValue(device, bgScrollWidthFrom));
            dTo['width'] =  getUnitPoint(deviceStyleValue(device, bgScrollWidthTo));

            animation[device] = { from: dFrom, to: dTo };
        });
    }

    return [{ selector: `.guten-section .animated-layer.animated-${dataId}`, ...animation }];
};

export const renderHeight = ({ action, from, to, device, elementId }) => {
    const {
        bgScrollHeightFrom = {},
        bgScrollHeightTo = {}
    } = action;

    const dataId = elementId ? elementId.split('-')[1] : '';

    let animation = {};
    let dFrom = {};
    let dTo = { ...to };

    if (device) {
        from['height'] = getUnitPoint(deviceStyleValue(device, bgScrollHeightFrom));
        to['height'] = getUnitPoint(deviceStyleValue(device, bgScrollHeightTo));

        animation[device] = { from, to };
    } else {
        DeviceLoop(device => {
            dFrom = {};
            dTo = { ...to };

            dFrom['height'] = getUnitPoint(deviceStyleValue(device, bgScrollHeightFrom));
            dTo['height'] = getUnitPoint(deviceStyleValue(device, bgScrollHeightTo));

            animation[device] = { from: dFrom, to: dTo };
        });
    }

    return [{ selector: `.guten-section .animated-layer.animated-${dataId}`, ...animation }];
};
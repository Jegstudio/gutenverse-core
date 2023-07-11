import { getColor } from 'gutenverse-core/styling';
import { DeviceLoop, deviceStyleValue } from 'gutenverse-core/styling';

export const handleAdanimDividerWidth = ({ action, from, to, device, elementId }) => {
    const {
        dividerWidthFrom = {},
        dividerWidthTo = {}
    } = action;

    let animation = {};
    let dFrom = {};
    let dTo = { ...to };

    if (device) {
        from['width'] = `${deviceStyleValue(device, dividerWidthFrom)}%`;
        to['width'] = `${deviceStyleValue(device, dividerWidthTo)}%`;

        animation[device] = { from, to };
    } else {
        DeviceLoop(device => {
            dFrom = {};
            dTo = { ...to };

            dFrom['width'] = `${deviceStyleValue(device, dividerWidthFrom)}%`;
            dTo['width'] = `${deviceStyleValue(device, dividerWidthTo)}%`;

            animation[device] = { from: dFrom, to: dTo };
        });
    }

    return [{ selector: `.${elementId} .guten-divider-wrapper`, ...animation }];
};

export const handleAdanimDividerSize = ({ action, to, device, elementId }) => {
    const {
        dividerSizeFrom = {},
        dividerSizeTo = {}
    } = action;

    let animationLine = {};
    let animationStyle = {};
    let valueFrom, valueTo;

    if (device) {
        valueFrom = deviceStyleValue(device, dividerSizeFrom);
        valueTo = deviceStyleValue(device, dividerSizeTo);

        animationLine[device] = { from: { borderWidth: `${valueFrom}px` }, to: { ...to, borderWidth: `${valueTo}px` } };
        animationStyle[device] = { from: { ['--divider-pattern-height']: `${valueFrom}px` }, to: { ...to, ['--divider-pattern-height']: `${valueTo}px` } };
    } else {
        DeviceLoop(device => {
            valueFrom = deviceStyleValue(device, dividerSizeFrom);
            valueTo = deviceStyleValue(device, dividerSizeTo);

            animationLine[device] = { from: { borderWidth: `${valueFrom}px` }, to: { ...to, borderWidth: `${valueTo}px` } };
            animationStyle[device] = { from: { ['--divider-pattern-height']: `${valueFrom}px` }, to: { ...to, ['--divider-pattern-height']: `${valueTo}px` } };
        });
    }

    return [
        { selector: `.${elementId} .guten-divider-line`, ...animationLine },
        { selector: `.${elementId} .guten-divider-style`, ...animationStyle }
    ];
};

export const handleAdanimDividerColor = ({ action, to, elementId }) => {
    const {
        dividerColorFrom = {},
        dividerColorTo = {}
    } = action;

    const colorFrom  = getColor(dividerColorFrom);
    const colorTo = getColor(dividerColorTo);

    return [
        {
            selector: `.${elementId} .guten-divider-line`,
            from: {
                borderColor: colorFrom,
            },
            to: {
                ...to,
                borderColor: colorTo,
            }
        },
        {
            selector: `.${elementId} .guten-divider-style`,
            from: {
                backgroundColor: colorFrom,
            },
            to: {
                ...to,
                backgroundColor: colorTo,
            }
        },
    ];
};

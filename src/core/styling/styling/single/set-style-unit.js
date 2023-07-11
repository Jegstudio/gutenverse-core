import { BuildAdminStyle, DeviceLoop, deviceStyleValue, elementVar, normalAppender, responsiveAppender } from 'gutenverse-core/styling';

export const setStyleUnit = ({
    attribute,
    selector,
    styleId,
    adminClass,
    addStyle,
    removeStyle,
    multiDevice = false,
    unit = 'px'
}) => {
    if (attribute && selector) {
        const elementStyle = elementVar();

        if (multiDevice) {
            DeviceLoop(device => {
                const _attribute = deviceStyleValue(device, attribute);

                if (_attribute) {
                    responsiveAppender({
                        style: `${selector}: ${_attribute}${unit};`,
                        device,
                        elementStyle
                    });
                }
            });
        } else {
            normalAppender({
                style: `${selector}: ${attribute}${unit};`,
                elementStyle
            });
        }

        addStyle(
            styleId,
            BuildAdminStyle(elementStyle.adminStyle, adminClass)
        );
    } else {
        removeStyle(styleId);
    }
};

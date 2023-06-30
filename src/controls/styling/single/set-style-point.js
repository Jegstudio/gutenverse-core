import { BuildAdminStyle, DeviceLoop, deviceStyleValue, elementVar, normalAppender, responsiveAppender } from 'gutenverse-core/controls';

export const setStylePoint = ({
    attribute,
    selector,
    styleId,
    adminClass,
    addStyle,
    removeStyle,
    multiDevice = false
}) => {
    if (attribute && selector) {
        const elementStyle = elementVar();

        if (multiDevice) {
            DeviceLoop(device => {
                const _attribute = deviceStyleValue(device, attribute);

                if (_attribute && _attribute['point']) {
                    responsiveAppender({
                        style: `${selector}: ${_attribute['point']}${_attribute['unit']};`,
                        device,
                        elementStyle
                    });
                }
            });
        } else {
            if (attribute['point']) {
                normalAppender({
                    style: `${selector}: ${attribute['point']}${attribute['unit']};`,
                    elementStyle
                });
            }
        }

        addStyle(
            styleId,
            BuildAdminStyle(elementStyle.adminStyle, adminClass)
        );
    } else {
        removeStyle(styleId);
    }
};

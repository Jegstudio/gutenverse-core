import { checkEmpty, responsiveBreakpoint } from 'gutenverse-core/helper';

export const elementVar = () => ({
    adminStyle: {
        'Desktop': '',
        'Tablet': '',
        'Mobile': ''
    }
});

export const DeviceLoop = (callback) => {
    ['Desktop', 'Tablet', 'Mobile'].forEach(device => callback(device));
};

export const BuildColumnWidthStyle = (style, selector) => {
    let theStyle = [];
    const { tabletBreakpoint, mobileBreakpoint } = responsiveBreakpoint();

    DeviceLoop(device => {
        if (style[device]) {
            switch (device) {
                case 'Desktop':
                    theStyle.push(`${selector} { width: ${style[device]}% }`);
                    break;
                case 'Tablet':
                    theStyle.push(`@media only screen and (max-width: ${tabletBreakpoint}px) { ${selector} { width: ${style[device]}% } }`);
                    break;
                case 'Mobile':
                    theStyle.push(`@media only screen and (max-width: ${mobileBreakpoint}px) { .guten-section ${selector}.guten-column { width: ${style[device]}% } }`);
                    break;
            }
        }
    });

    return theStyle.join(' ');
};

export const BuildAdminStyle = (style, selector) => {
    let theStyle = [];
    const { tabletBreakpoint, mobileBreakpoint } = responsiveBreakpoint();

    DeviceLoop(device => {
        if (style[device]) {
            switch (device) {
                case 'Desktop':
                    theStyle.push(`${selector} { ${style[device]} }`);
                    break;
                case 'Tablet':
                    theStyle.push(`@media only screen and (max-width: ${tabletBreakpoint}px) { ${selector} { ${style[device]} } }`);
                    break;
                case 'Mobile':
                    theStyle.push(`@media only screen and (max-width: ${mobileBreakpoint}px) { ${selector} { ${style[device]} } }`);
                    break;
            }
        }
    });

    return theStyle.join(' ');
};

export const responsiveAppender = ({ style, device, elementStyle }) => {
    elementStyle.adminStyle[device] += style;
};

export const normalAppender = ({ style, elementStyle }) => {
    elementStyle.adminStyle['Desktop'] += style;
};

export const injectFont = (props) => {
    const { addFont, controlId, font, weight } = props;
    if (font !== null) {
        addFont(controlId, font, weight);
    }
};

export const setDeviceClasses = (attribute, prefix) => {
    const classes = [];

    if (attribute === undefined) {
        return '';
    }

    Object.keys(attribute).map(index => {
        if (attribute[index] && attribute[index] !== 'default') {
            classes.push(`${prefix}-${attribute[index]}-${index.toLowerCase()}`);
        }
    });

    return classes;
};

/* check styling, use previous device value if current value is empty */
export const deviceStyleValue = (device, value) => {
    const check = (val) => typeof val === 'object' ? !checkEmpty(val) : val === false || !!val;
    const devices = [];

    switch (device) {
        case 'Desktop':
            devices.push('Desktop');
            break;
        case 'Tablet':
            devices.push('Tablet', 'Desktop');
            break;
        case 'Mobile':
            devices.push('Mobile', 'Tablet', 'Desktop');
            break;
    }

    for (const _device of devices) {
        if (check(value[_device])) {
            return value[_device];
        }
    }

    return false;
};
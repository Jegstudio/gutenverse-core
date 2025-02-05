import { skipDevice, handleAlignV} from 'gutenverse-core/styling';
import isEmpty from 'lodash/isEmpty';

export const positioningCSS = (property, values, attributeType, skipDeviceType, id) => {
    const positioning = {
        Desktop: [],
        Tablet: [],
        Mobile: [],
    };

    const setPositioning = (value, width = false, inBlock = true) => {
        switch (value) {
            case 'full':
                return 'width: 100%!important;';
            case 'inline':
                return `width: auto!important; display: ${ inBlock ? 'inline-block' : 'inline-flex' }!important;`;
            case 'custom':
                return `${width.unit && width.point ? `width: ${width.point}${width.unit} !important;` : ''}  display: ${ inBlock ? 'inline-block' : 'inline-flex' }!important;`;
        }
    };

    // if (!isEmpty(positioningAlign)) {
    //     let alignVertical = '';
    //     if (positioningAlign.Desktop) {
    //         switch (positioningAlign.Desktop) {
    //             case 'flex-start':
    //                 alignVertical =  'top';
    //                 break;
    //             case 'center':
    //                 alignVertical = 'middle';
    //                 break;
    //             case 'flex-end':
    //                 alignVertical = 'bottom';
    //                 break;
    //             default:
    //                 alignVertical = positioningAlign.Desktop;
    //                 break;
    //         }
    //         positioning.Desktop.push(`align-self: ${positioningAlign.Desktop}; vertical-align: ${alignVertical};`);
    //     }

    //     if (positioningAlign.Tablet) {
    //         switch (positioningAlign.Tablet) {
    //             case 'flex-start':
    //                 alignVertical =  'top';
    //                 break;
    //             case 'center':
    //                 alignVertical = 'middle';
    //                 break;
    //             case 'flex-end':
    //                 alignVertical = 'bottom';
    //                 break;
    //             default:
    //                 alignVertical = positioningAlign.Tablet;
    //                 break;
    //         }
    //         positioning.Tablet.push(`align-self: ${positioningAlign.Tablet}; vertical-align: ${alignVertical};`);
    //     }

    //     if (positioningAlign.Mobile) {
    //         switch (positioningAlign.Mobile) {
    //             case 'flex-start':
    //                 alignVertical =  'top';
    //                 break;
    //             case 'center':
    //                 alignVertical = 'middle';
    //                 break;
    //             case 'flex-end':
    //                 alignVertical = 'bottom';
    //                 break;
    //             default:
    //                 alignVertical = positioningAlign.Mobile;
    //                 break;
    //         }
    //         positioning.Mobile.push(`align-self: ${positioningAlign.Mobile}; vertical-align: ${alignVertical};`);
    //     }
    // }
    switch (attributeType) {
        case 'custom' :
            if (!isEmpty(values)) {
                ['Desktop', 'Tablet', 'Mobile'].forEach(device => {
                    if (!isEmpty(values[device])) {
                        const { unit, point } = values[device];
                        positioning[device].push(`${property[0]}: ${point}${unit};`);
                    }
                });
            }
            break;
        case 'type': {
            const firstSkip = skipDevice(values, 'positioningType', (attr, device) =>
                ['full', 'inline'].includes(attr['positioningType'][device])
            );
            const secondSkip = skipDevice(values, 'positioningType', (attr, device) =>
                !isEmpty(attr['positioningWidth']) && attr['positioningWidth'][device] && attr['positioningType'][device] === 'custom'
            );

            if (!isEmpty(values[id])) {
                const devices = ['Desktop', 'Tablet', 'Mobile'];
                let skip = skipDeviceType === 'first' ? firstSkip : secondSkip;

                for (let i = 0; i < devices.length; i++) {
                    let device = devices[i];
                    if (device !== skip && !isEmpty(values[id][device])) {
                        const pos = setPositioning(
                            values[id][device],
                            skipDeviceType === 'second' ? values['positioningWidth'][device] : false,
                            values['inBlock']
                        );
                        positioning[device].push(pos);
                    }
                }
            }
            break;
        }
        case 'width': {
            const firstSkip = skipDevice(values, 'positioningType', (attr, device) =>
                attr['positioningType'] && attr['positioningType'][device] === 'custom'
            );

            if (!isEmpty(values[id])) {
                const devices = ['Desktop', 'Tablet', 'Mobile'];
                let skip = firstSkip;

                for (let i = 0; i < devices.length; i++) {
                    let device = devices[i];
                    if (device !== skip && !isEmpty(values[id][device])) {
                        const pos = setPositioning(
                            values['positioningType'][device],
                            values[id][device],
                            values['inBlock']
                        );
                        positioning[device].push(pos);
                    }
                }
            }
            break;
        }
        case 'align': {
            if (!isEmpty(values)) {
                const devices = ['Desktop', 'Tablet', 'Mobile'];

                for (let i = 0; i < devices.length; i++) {
                    let device = devices[i];
                    if (!isEmpty(values[device])) {
                        const pos = `${property}: ${handleAlignV(values[device])};`;
                        positioning[device].push(pos);
                    }
                }
            }
            break;
        }
        default :
            break;
    }

    return positioning;
};

export const positioningGenerator = (props, style, css) => {
    const {selector, property = [], attributeType, skipDeviceType, id} = style;

    // const blockName = select('core/block-editor').getBlockName(clientId);
    // const checkSelector = !isEmpty(selector) ? selector : `.${elementId}.guten-element`;
    // const customSelector = blockName !== 'gutenverse/section' ? checkSelector : `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`;

    const positioning = positioningCSS(property, props, attributeType, skipDeviceType, id);

    if (positioning.Desktop.length) {
        css.Desktop = `${selector} { ` + positioning.Desktop.join(' ') + ' }';
    }

    if (positioning.Tablet.length) {
        css.Tablet = `${selector} { ` + positioning.Tablet.join(' ') + ' }';
    }

    if (positioning.Mobile.length) {
        css.Mobile = `${selector} { ` + positioning.Mobile.join(' ') + ' }';
    }

    return css;
};
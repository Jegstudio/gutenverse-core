import { skipDevice, handleAlignV} from 'gutenverse-core/styling';
import isEmpty from 'lodash/isEmpty';

export const positioningCSS = (properties, values, attributeType, skipDeviceType, multiAttr) => {
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

    switch (attributeType) {
        case 'custom' :
            if (!isEmpty(values)) {
                ['Desktop', 'Tablet', 'Mobile'].forEach(device => {
                    if (!isEmpty(values[device])) {
                        const { unit, point } = values[device];
                        if(point){
                            positioning[device].push(`${properties[0].name}: ${point}${unit};`);
                        }
                    }
                });
            }
            break;
        case 'type': {
            const firstSkip = skipDevice(multiAttr, 'positioningType', (attr, device) =>
                ['full', 'inline'].includes(attr['positioningType'][device])
            );
            const secondSkip = skipDevice(multiAttr, 'positioningType', (attr, device) =>
                !isEmpty(attr['positioningWidth']) && attr['positioningWidth'][device] && attr['positioningType'][device] === 'custom'
            );

            if (!isEmpty(values)) {
                const devices = ['Desktop', 'Tablet', 'Mobile'];
                let skip = skipDeviceType === 'first' ? firstSkip : secondSkip;

                for (let i = 0; i < devices.length; i++) {
                    let device = devices[i];
                    if (device !== skip && !isEmpty(values[device])) {
                        const pos = setPositioning(
                            values[device],
                            skipDeviceType === 'second' ? multiAttr['positioningWidth'][device] : false,
                            multiAttr['inBlock']
                        );
                        positioning[device].push(pos);
                    }
                }
            }
            break;
        }
        case 'width': {
            const firstSkip = skipDevice(multiAttr, 'positioningType', (attr, device) =>
                attr['positioningType'] && attr['positioningType'][device] === 'custom'
            );

            if (!isEmpty(values)) {
                const devices = ['Desktop', 'Tablet', 'Mobile'];
                let skip = firstSkip;

                for (let i = 0; i < devices.length; i++) {
                    let device = devices[i];
                    if (device !== skip && !isEmpty(values[device])) {
                        const pos = setPositioning(
                            multiAttr['positioningType'][device],
                            values[device],
                            multiAttr['inBlock']
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
                        const pos = `${properties.name}: ${handleAlignV(values[device])};`;
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
    const {selector, properties = [], attributeType, skipDeviceType, multiAttr} = style;

    // const blockName = select('core/block-editor').getBlockName(clientId);
    // const checkSelector = !isEmpty(selector) ? selector : `.${elementId}.guten-element`;
    // const customSelector = blockName !== 'gutenverse/section' ? checkSelector : `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`;

    const positioning = positioningCSS(properties, props, attributeType, skipDeviceType, multiAttr);

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
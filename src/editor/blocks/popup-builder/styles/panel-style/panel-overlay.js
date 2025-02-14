import { isNotEmpty } from 'gutenverse-core/helper';

const panelOverlayStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['overlayColor']) && data.push({
        'type': 'background',
        'id': 'overlayColor',
        'selector': `.${elementId} .guten-popup-overlay`,
    });
    return data;
};

export default panelOverlayStyle;
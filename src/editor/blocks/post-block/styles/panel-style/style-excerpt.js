import { isNotEmpty } from 'gutenverse-core/helper';

const panelExcerptStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['overlayColor']) && data.push({
        'type': 'background',
        'id': 'overlayColor',
        'selector': `.${elementId}.guten-popup-builder .guten-popup-overlay`,
    });
    return data;
};

export default panelExcerptStyle;
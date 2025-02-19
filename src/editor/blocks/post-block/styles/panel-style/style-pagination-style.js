import { isNotEmpty } from 'gutenverse-core/helper';

const panelPaginationStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['overlayColor']) && data.push({
        'type': 'background',
        'id': 'overlayColor',
        'selector': `.${elementId}.guten-popup-builder .guten-popup-overlay`,
    });
    return data;
};

export default panelPaginationStyle;
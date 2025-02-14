import { isNotEmpty } from 'gutenverse-core/helper';

const panelPopupStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['width']) && data.push({
        'type': 'unitPoint',
        'id': 'width',
        'responsive' : true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct',
            }
        ],
        'selector': `.guten-popup-builder.${elementId} .guten-popup .guten-popup-content`,
    });

    isNotEmpty(attributes['maxHeight']) && attributes['position'] === 'center' && data.push({
        'type': 'unitPoint',
        'id': 'maxHeight',
        'responsive' : true,
        'properties': [
            {
                'name': 'max-height',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .guten-popup-center .guten-popup-content`,
    });

    isNotEmpty(attributes['backgroundColor']) && data.push({
        'type': 'background',
        'id': 'backgroundColor',
        'selector': `.${elementId} .guten-popup .guten-popup-content`,
    });
    return data;
};

export default panelPopupStyle;
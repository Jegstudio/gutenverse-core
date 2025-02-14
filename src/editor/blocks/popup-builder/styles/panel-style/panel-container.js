import { isNotEmpty } from 'gutenverse-core/helper';

const panelContainerStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['containerPadding']) && data.push({
        'type': 'dimension',
        'id': 'containerPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-popup .guten-popup-content`,
    });

    isNotEmpty(attributes['containerPadding']) && data.push({
        'type': 'plain',
        'id': 'containerPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'min-height',
                'valueType': 'function',
                'functionName': 'handleContainerPaddingPopup'
            }
        ],
        'selector': `.${elementId} .guten-popup .guten-popup-content`,
    });

    isNotEmpty(attributes['backgroundColor']) && data.push({
        'type': 'background',
        'id': 'backgroundColor',
        'selector': `.${elementId} .guten-popup .guten-popup-content`,
    });

    isNotEmpty(attributes['containerBorder']) && data.push({
        'type': 'border',
        'id': 'containerBorder',
        'selector': `.${elementId} .guten-popup .guten-popup-content`,
    });

    isNotEmpty(attributes['containerBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'containerBorderResponsive',
        'selector': `.${elementId} .guten-popup .guten-popup-content`,
    });

    isNotEmpty(attributes['containerBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'containerBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-popup .guten-popup-content`,
    });
    return data;
};

export default panelContainerStyle;
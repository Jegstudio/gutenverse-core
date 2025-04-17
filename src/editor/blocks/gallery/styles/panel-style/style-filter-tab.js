import { isNotEmpty } from 'gutenverse-core/helper';

const panelFilterTabStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['filterTabPadding']) && data.push({
        'type': 'dimension',
        'id': 'filterTabPadding',
        'responsive': true,
        'selector': `.${elementId} .filter-controls .guten-gallery-control`,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterTabMargin']) && data.push({
        'type': 'dimension',
        'id': 'filterTabMargin',
        'responsive': true,
        'selector': `.${elementId} .filter-controls .guten-gallery-control`,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterTabTypography']) && data.push({
        'type': 'typography',
        'id': 'filterTabTypography',
        'selector': `.${elementId} .filter-controls .guten-gallery-control`,
    });

    isNotEmpty(attributes['filterTabTextColor']) && data.push({
        'type': 'color',
        'id': 'filterTabTextColor',
        'responsive': true,
        'selector': `.${elementId} .filter-controls .guten-gallery-control`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterTabTextColorActive']) && data.push({
        'type': 'color',
        'id': 'filterTabTextColorActive',
        'responsive': true,
        'selector': `.${elementId} .filter-controls .guten-gallery-control.active`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterTabBackground']) && data.push({
        'type': 'background',
        'id': 'filterTabBackground',
        'selector': `.${elementId} .filter-controls .guten-gallery-control`,
    });

    isNotEmpty(attributes['filterTabBackgroundActive']) && data.push({
        'type': 'background',
        'id': 'filterTabBackgroundActive',
        'selector': `.${elementId} .filter-controls .guten-gallery-control.active`,
    });

    isNotEmpty(attributes['filterTabBorder']) && data.push({
        'type': 'border',
        'id': 'filterTabBorder',
        'selector': `.${elementId} .filter-controls .guten-gallery-control`,
    });

    isNotEmpty(attributes['filterTabBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'filterTabBorderResponsive',
        'selector': `.${elementId} .filter-controls .guten-gallery-control`,
    });

    isNotEmpty(attributes['filterTabBorderActive']) && data.push({
        'type': 'border',
        'id': 'filterTabBorderActive',
        'selector': `.${elementId} .filter-controls .guten-gallery-control.active`,
    });

    isNotEmpty(attributes['filterTabBorderResponsiveActive']) && data.push({
        'type': 'borderResponsive',
        'id': 'filterTabBorderResponsiveActive',
        'selector': `.${elementId} .filter-controls .guten-gallery-control.active`,
    });

    isNotEmpty(attributes['filterTabBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'filterTabBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .filter-controls .guten-gallery-control`,
    });

    isNotEmpty(attributes['filterTabBoxShadowActive']) && data.push({
        'type': 'boxShadow',
        'id': 'filterTabBoxShadowActive',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .filter-controls .guten-gallery-control.active`,
    });

    return data;
};

export default panelFilterTabStyle;
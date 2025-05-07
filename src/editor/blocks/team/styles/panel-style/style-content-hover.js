import { isNotEmpty } from 'gutenverse-core/helper';

const contentHoverStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['hoverPadding']) && data.push({
        'type': 'dimension',
        'id': 'hoverPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-hover:hover .profile-body`,
    });

    isNotEmpty(attributes['hoverMargin']) && data.push({
        'type': 'dimension',
        'id': 'hoverMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-hover:hover .profile-body`,
    });

    isNotEmpty(attributes['hoverContentBgColor']) && data.push({
        'type': 'background',
        'id': 'hoverContentBgColor',
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-hover .profile-body:before`,
    });

    isNotEmpty(attributes['hoverContentBorder']) && data.push({
        'type': 'border',
        'id': 'hoverContentBorder',
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-hover .profile-body:before`,
    });

    isNotEmpty(attributes['hoverContentBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'hoverContentBorderResponsive',
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-hover .profile-body:before`,
    });

    isNotEmpty(attributes['hoverContentShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'hoverContentShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-hover .profile-body:before`,
    });
    return data;
};

export default contentHoverStyle;
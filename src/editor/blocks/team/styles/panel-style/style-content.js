import { isNotEmpty } from 'gutenverse-core/helper';

const contentStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['alignment']) && data.push({
        'type': 'plain',
        'id': 'alignment',
        'responsive': true,
        'selector': `.${elementId} .profile-box .profile-card`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['profilePadding']) && data.push({
        'type': 'dimension',
        'id': 'profilePadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .profile-box .profile-card.card-default, 
                    .${elementId} .profile-box .profile-card.card-overlay,
                    .${elementId} .profile-box .profile-card.card-hover`,
    });

    isNotEmpty(attributes['detailsPadding']) && data.push({
        'type': 'dimension',
        'id': 'detailsPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .profile-box .profile-card.card-default .profile-body,
                    .${elementId} .profile-box .profile-card.card-overlay .profile-body,
                    .${elementId} .profile-box .profile-card.card-hover .profile-body`,
    });

    isNotEmpty(attributes['profileBorderRadius']) && data.push({
        'type': 'dimension',
        'id': 'profileBorderRadius',
        'responsive': true,
        'properties': [
            {
                'name': 'border-radius',
                'valueType': 'direct',
                'multiDimension' : false
            }
        ],
        'selector': `.${elementId} .profile-box .profile-card.card-default,
                    .${elementId} .profile-box .profile-card.card-overlay,
                    .${elementId} .profile-box .profile-card.card-hover,
                    .${elementId} .profile-box .profile-card.card-overlay.scale:hover:before`,
    });

    isNotEmpty(attributes['profileBackground']) && data.push({
        'type': 'background',
        'id': 'profileBackground',
        'selector': `.${elementId} .profile-box .profile-card`,
    });

    isNotEmpty(attributes['profileBackgroundHover']) && data.push({
        'type': 'background',
        'id': 'profileBackgroundHover',
        'selector': `.${elementId} .profile-box .profile-card:hover`,
    });

    isNotEmpty(attributes['profileBorder']) && data.push({
        'type': 'border',
        'id': 'profileBorder',
        'selector': `.${elementId} .profile-box .profile-card`,
    });

    isNotEmpty(attributes['profileBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'profileBorderResponsive',
        'selector': `.${elementId} .profile-box .profile-card`,
    });

    isNotEmpty(attributes['profileBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'profileBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .profile-box .profile-card`,
    });

    isNotEmpty(attributes['profileBorderHover']) && data.push({
        'type': 'border',
        'id': 'profileBorderHover',
        'selector': `.${elementId} .profile-box .profile-card:hover`,
    });

    isNotEmpty(attributes['profileBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'profileBorderHoverResponsive',
        'selector': `.${elementId} .profile-box .profile-card:hover`,
    });

    isNotEmpty(attributes['profileBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'profileBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .profile-box .profile-card:hover`,
    });
    return data;
};

export default contentStyle;
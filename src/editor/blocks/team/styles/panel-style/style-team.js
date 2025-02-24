import { isNotEmpty } from 'gutenverse-core/helper';

const teamStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['overlayProfilePosition']) && data.push({
        'type': 'unitPoint',
        'id': 'overlayProfilePosition',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-overlay:hover .profile-body `,
        'properties': [
            {
                'name': 'margin-bottom',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['titleHorizontal']) && data.push({
        'type': 'unitPoint',
        'id': 'titleHorizontal',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-title`,
        'properties': [
            {
                'name': 'left',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['titleVertical']) && data.push({
        'type': 'unitPoint',
        'id': 'titleVertical',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-title`,
        'properties': [
            {
                'name': 'bottom',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['titleOpacity']) && data.push({
        'type': 'plain',
        'id': 'titleOpacity',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-title`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['titleHorizontalHover']) && data.push({
        'type': 'unitPoint',
        'id': 'titleHorizontalHover',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-title`,
        'properties': [
            {
                'name': 'left',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['titleVerticalHover']) && data.push({
        'type': 'unitPoint',
        'id': 'titleVerticalHover',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-title`,
        'properties': [
            {
                'name': 'bottom',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['titleOpacityHover']) && data.push({
        'type': 'plain',
        'id': 'titleOpacityHover',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-title`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['jobHorizontal']) && data.push({
        'type': 'unitPoint',
        'id': 'jobHorizontal',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-sub`,
        'properties': [
            {
                'name': 'right',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['jobVertical']) && data.push({
        'type': 'unitPoint',
        'id': 'jobVertical',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-sub`,
        'properties': [
            {
                'name': 'top',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['jobOpacity']) && data.push({
        'type': 'plain',
        'id': 'jobOpacity',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-sub`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['jobHorizontalHover']) && data.push({
        'type': 'unitPoint',
        'id': 'jobHorizontalHover',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-sub`,
        'properties': [
            {
                'name': 'right',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['jobVerticalHover']) && data.push({
        'type': 'unitPoint',
        'id': 'jobVerticalHover',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-sub`,
        'properties': [
            {
                'name': 'top',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['jobOpacityHover']) && data.push({
        'type': 'plain',
        'id': 'jobOpacityHover',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-sub`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['descHorizontal']) && data.push({
        'type': 'unitPoint',
        'id': 'descHorizontal',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-desc`,
        'properties': [
            {
                'name': 'left',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['descVertical']) && data.push({
        'type': 'unitPoint',
        'id': 'descVertical',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-desc`,
        'properties': [
            {
                'name': 'top',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['descOpacity']) && data.push({
        'type': 'plain',
        'id': 'descOpacity',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-desc`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['descHorizontalHover']) && data.push({
        'type': 'unitPoint',
        'id': 'descHorizontalHover',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-desc`,
        'properties': [
            {
                'name': 'left',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['descVerticalHover']) && data.push({
        'type': 'unitPoint',
        'id': 'descVerticalHover',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-desc`,
        'properties': [
            {
                'name': 'top',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['descOpacityHover']) && data.push({
        'type': 'plain',
        'id': 'descOpacityHover',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-desc`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['socialHorizontal']) && data.push({
        'type': 'unitPoint',
        'id': 'socialHorizontal',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .socials-wrapper`,
        'properties': [
            {
                'name': 'right',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['socialVertical']) && data.push({
        'type': 'unitPoint',
        'id': 'socialVertical',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .socials-wrapper`,
        'properties': [
            {
                'name': 'bottom',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['socialOpacity']) && data.push({
        'type': 'plain',
        'id': 'socialOpacity',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .socials-wrapper`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['socialHorizontalHover']) && data.push({
        'type': 'unitPoint',
        'id': 'socialHorizontalHover',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .socials-wrapper`,
        'properties': [
            {
                'name': 'right',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['socialVerticalHover']) && data.push({
        'type': 'unitPoint',
        'id': 'socialVerticalHover',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .socials-wrapper`,
        'properties': [
            {
                'name': 'bottom',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['socialOpacityHover']) && data.push({
        'type': 'plain',
        'id': 'socialOpacityHover',
        'responsive': true,
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .socials-wrapper`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['hoverBottomColor']) && data.push({
        'type': 'color',
        'id': 'hoverBottomColor',
        'selector': `.${elementId} .border-bottom .animated`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['hoverBottomHeight']) && data.push({
        'type': 'unitPoint',
        'id': 'hoverBottomHeight',
        'responsive': true,
        'selector': `.${elementId} .border-bottom, .${elementId} .border-bottom .animated `,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct',
            }
        ]
    });
    return data;
};

export default teamStyle;
import { isNotEmpty } from 'gutenverse-core/helper';

const contentOverlayStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['hoverBgColor']) && data.push({
        'type': 'background',
        'id': 'hoverBgColor',
        'selector': `.${elementId}.guten-team .profile-box .profile-card.card-overlay:before, .${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:before`,
    });

    return data;
};

export default contentOverlayStyle;
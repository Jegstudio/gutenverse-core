import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';

export const descPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'descSpace',
            label: __('Text Space', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'descSpace',
                    'responsive': true,
                    'selector': `.${elementId} .profile-desc, #${elementId} .profile-desc, #${elementId} .profile-phone, #${elementId} .profile-email, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc`,
                    'properties': [
                        {
                            'name': 'margin-bottom',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'descColor',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'descColor',
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .profile-desc, #${elementId} .profile-desc, #${elementId} .profile-phone, #${elementId} .profile-email, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc,
                    .${elementId} .profile-desc> a, #${elementId} .profile-desc> a, #${elementId} .profile-phone> a, #${elementId} .profile-email> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc> a`,
                }
            ]
        },
        {
            id: 'descColorHover',
            label: __('Hover Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'descColorHover',
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}:hover .profile-desc, #${elementId}:hover .profile-desc, #${elementId}:hover .profile-phone, #${elementId}:hover .profile-email, .${elementId}:hover .profile-box .profile-card.card-overlay .profile-body .profile-desc,
                    .${elementId}:hover .profile-desc> a, #${elementId}:hover .profile-desc> a, #${elementId}:hover .profile-phone> a, #${elementId}:hover .profile-email> a, .${elementId}:hover .profile-box .profile-card.card-overlay .profile-body .profile-desc> a`,
                }
            ]
        },
        {
            id: 'descTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'descTextShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'descTextShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .profile-desc, #${elementId} .profile-desc, #${elementId} .profile-phone, #${elementId} .profile-email, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc,
                    .${elementId} .profile-desc> a, #${elementId} .profile-desc> a, #${elementId} .profile-phone> a, #${elementId} .profile-email> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc> a`,
                }
            ]
        }
    ];
};


import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';

export const namePanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'nameSpace',
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
                    'id': 'nameSpace',
                    'responsive': true,
                    'selector': `.${elementId} .profile-title, #${elementId} .profile-title, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title`,
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
            id: 'nameColor',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'nameColor',
                    'selector': `.${elementId} .profile-title, #${elementId} .profile-title, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title,
                    .${elementId} .profile-title> a, #${elementId} .profile-title> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title> a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'nameColorHover',
            label: __('Hover Text Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'nameTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'nameTextShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'nameTextShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .profile-title, #${elementId} .profile-title, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title`,
                }
            ]
        }
    ];
};


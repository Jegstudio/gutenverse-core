import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';

export const jobPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'jobSpace',
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
                    'id': 'jobSpace',
                    'responsive': true,
                    'selector': `.${elementId} .profile-sub, #${elementId} .profile-sub, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub`,
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
            id: 'jobColor',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'jobColor',
                    'selector': `.${elementId} .profile-sub, #${elementId} .profile-sub, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub,
                    .${elementId} .profile-sub> a, #${elementId} .profile-sub> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub> a`,
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
            id: 'jobColorHover',
            label: __('Hover Text Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'jobTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'jobTextShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'jobTextShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .profile-sub, #${elementId} .profile-sub, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub`,
                }
            ]
        }
    ];
};


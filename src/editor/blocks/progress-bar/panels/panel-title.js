
import { __ } from '@wordpress/i18n';
import { ColorControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';

export const titlePanel = ({ elementId }) => {
    return [
        {
            id: 'titleColor',
            label: __('Title color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleColor',
                    'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar-content .skill-title`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'titleTextShadow',
            label: __('Title Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'titleTextShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar-content .skill-title`,
                }
            ]
        }
    ];
};
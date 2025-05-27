import { __ } from '@wordpress/i18n';
import { ColorControl, TextShadowControl, TextStrokeControl, TypographyControl } from 'gutenverse-core/controls';

export const styleTextAnimatedPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'textAnimatedColor',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textAnimatedColor',
                    'selector': `.editor-styles-wrapper .${elementId} .text-content *`,
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
            id: 'textAnimatedTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'textAnimatedShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'textAnimatedShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId} .text-content *`,
                }
            ]
        },
        {
            id: 'textAnimatedStroke',
            label: __('Text Stroke', 'gutenverse'),
            component: TextStrokeControl,
            liveStyle: [
                {
                    'type': 'textStroke',
                    'id': 'textAnimatedStroke',
                    'selector': `.editor-styles-wrapper .${elementId} .text-content *`,
                }
            ]
        }
    ];
};


import { __ } from '@wordpress/i18n';
import { ColorControl, TextShadowControl, TextStrokeControl, TypographyControl } from 'gutenverse-core/controls';

export const styleTextNormalPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'textNormalColor',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textNormalColor',
                    'selector': `.editor-styles-wrapper .${elementId} .non-animated-text`,
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
            id: 'textNormalTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'textNormalShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'textNormalShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId} .non-animated-text`,
                }
            ]
        },
        {
            id: 'textNormalStroke',
            label: __('Text Stroke', 'gutenverse'),
            component: TextStrokeControl,
            liveStyle: [
                {
                    'type': 'textStroke',
                    'id': 'textNormalStroke',
                    'selector': `.editor-styles-wrapper .${elementId} .non-animated-text`,
                }
            ]
        }
    ];
};


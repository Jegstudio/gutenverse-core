import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';

export const panelDescriptionStyle = props => {
    const {
        elementId,
        __descriptionHover,
    } = props;

    return [
        {
            id: 'descriptionMargin',
            label: __('Description Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'descriptionTypography',
            label: __('Description Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: '__descriptionHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
        },
        {
            id: 'descriptionNormalColor',
            show: !__descriptionHover || __descriptionHover === 'normal',
            label: __('Description Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'descriptionNormalColor',
                    'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-inner .body-description`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'descriptionHoverColor',
            show: __descriptionHover === 'hover',
            label: __('Description Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'descriptionHoverColor',
                    'selector': `.${elementId}.gutenverse-image-box:hover .inner-container .image-box-body .body-inner .body-description`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
    ];
};
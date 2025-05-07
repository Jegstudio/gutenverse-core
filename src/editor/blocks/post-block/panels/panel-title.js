import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';

export const titlePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'titleMargin',
            label: __('Margin', 'gutenverse'),
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
            id: '__styleHover',
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
            onChange: ({ __styleHover }) => setSwitcher({ ...switcher, styleHover: __styleHover })
        },
        {
            id: 'titleColor',
            show: !switcher.styleHover || switcher.styleHover === 'normal',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleColor',
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-post-title a`,
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
            show: !switcher.styleHover || switcher.styleHover === 'normal',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'titleColorHover',
            show: switcher.styleHover === 'hover',
            label: __('Hover Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleColorHover',
                    'selector': `.${elementId} .guten-postblock .guten-post:hover .guten-postblock-content .guten-post-title a`,
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
            id: 'titleTypographyHover',
            show: switcher.styleHover === 'hover',
            label: __('Hover Typography', 'gutenverse'),
            component: TypographyControl,
        },
    ];
};
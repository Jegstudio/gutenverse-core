import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, TypographyControl, SelectControl, DimensionControl } from 'gutenverse-core/controls';

export const panelDropcap = (props) => {
    const {
        elementId,
        dropcap,
        dropcapBorderType,
    } = props;


    return [
        {
            id: 'dropcap',
            label: __('Drop Cap', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'dropcapTypography',
            show: dropcap,
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'dropcapColor',
            show: dropcap,
            label: __('Dropcap Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'dropcapColor',
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter, .gutenverse-text-editor.${elementId}.dropcap > div > div > p:first-child:first-letter`
                }
            ]
        },
        {
            id: 'dropcapBgColor',
            show: dropcap,
            label: __('Dropcap Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'dropcapBgColor',
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter, .gutenverse-text-editor.${elementId}.dropcap > div > div > p:first-child:first-letter`
                }
            ]
        },
        {
            id: 'dropcapMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
            },
        },
        {
            id: 'dropcapPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
            },
        },
        {
            id: 'dropcapBorderType',
            show: dropcap,
            label: __('Border Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Default'),
                    value: 'default'
                },
                {
                    label: __('None'),
                    value: 'none'
                },
                {
                    label: __('Solid'),
                    value: 'solid'
                },
                {
                    label: __('Double'),
                    value: 'double'
                },
                {
                    label: __('Dotted'),
                    value: 'dotted'
                },
                {
                    label: __('Dashed'),
                    value: 'dashed'
                },
                {
                    label: __('Groove'),
                    value: 'groove'
                },
            ],
        },
        {
            id: 'dropcapBorderColor',
            label: __('Border Color', 'gutenverse'),
            show: !['default', 'none'].includes(dropcapBorderType) && dropcap,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'dropcapBorderColor',
                    'properties': [
                        {
                            'name': 'border-color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter, .gutenverse-text-editor.${elementId}.dropcap > div > div > p:first-child:first-letter`,
                }
            ]
        },
        {
            id: 'dropcapBorderWidth',
            label: __('Border Width', 'gutenverse'),
            component: DimensionControl,
            show: !['default', 'none'].includes(dropcapBorderType) && dropcap,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
            },
        },
        {
            id: 'dropcapBorderRadius',
            label: __('Border radius', 'gutenverse'),
            component: DimensionControl,
            show: !['default', 'none'].includes(dropcapBorderType) && dropcap,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                '%': {
                    text: '%',
                    unit: '%'
                },
            },
        },
    ];
};
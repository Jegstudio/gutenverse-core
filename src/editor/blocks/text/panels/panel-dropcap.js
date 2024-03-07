import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, TypographyControl, SelectControl, DimensionControl } from 'gutenverse-core/controls';
import { handleTypography, handleColor, handleDimension } from 'gutenverse-core/styling';

export const panelDropcap = (props) => {
    const {
        elementId,
        dropcap,
        dropcapBorderType,
        dropcapBorderColor,
        dropcapBorderWidth,
        dropcapBorderRadius,
        removeStyle,
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
            style: [
                {
                    selector: `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'dropcapColor',
            show: dropcap,
            label: __('Dropcap Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'dropcapBgColor',
            show: dropcap,
            label: __('Dropcap Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter`,
                    render: value => handleColor(value, 'background-color')
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
            style: [
                {
                    selector: `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter`,
                    render: value => handleDimension(value, 'margin', false)
                }
            ]
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
            style: [
                {
                    selector: `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter`,
                    render: value => handleDimension(value, 'padding', false)
                }
            ]
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
            onChange: ({ dropcapBorderType }) => {
                if ('default' === dropcapBorderType || 'none' === dropcapBorderType) {
                    removeStyle('dropcapBorderColor-style-0');
                    removeStyle('dropcapBorderWidth-style-0');
                    removeStyle('dropcapBorderRadius-style-0');
                }
            },
            style: [
                {
                    selector: `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter`,
                    render: value => `border-style: ${value};`
                },
                {
                    selector: `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter`,
                    allowRender: value => !['default', 'none'].includes(value) && dropcap,
                    render: () => handleColor(dropcapBorderColor, 'border-color')
                },
                {
                    selector: `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter`,
                    allowRender: value => !['default', 'none'].includes(value) && dropcap,
                    render: () => handleDimension(dropcapBorderWidth, 'border-width', false)
                },
                {
                    selector: `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter`,
                    allowRender: value => !['default', 'none'].includes(value) && dropcap,
                    render: () => handleDimension(dropcapBorderRadius, 'border-radius', false)
                },
            ]
        },
        {
            id: 'dropcapBorderColor',
            label: __('Border Color', 'gutenverse'),
            show: !['default', 'none'].includes(dropcapBorderType) && dropcap,
            component: ColorControl,
            style: [
                {
                    selector: `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter`,
                    render: value => handleColor(value, 'border-color')
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
            style: [
                {
                    selector: `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter`,
                    render: value => handleDimension(value, 'border-width', false)
                }
            ]
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
            style: [
                {
                    selector: `.gutenverse-text-editor.${elementId}.dropcap > div > p:first-child:first-letter`,
                    render: value => {
                        return handleDimension(value, 'border-radius', false);
                    }
                }
            ]
        },
    ];
};
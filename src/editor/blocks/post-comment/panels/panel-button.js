import { __ } from '@wordpress/i18n';
import { handleBackground, handleBorderV2, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';
import { BackgroundControl, BorderControl, ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';

export const buttonPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'typographyButton',
            label: __('Button Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: '__buttonHoverControl',
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
            onChange: ({ __buttonHoverControl }) => setSwitcher({ ...switcher, buttonHoverControl: __buttonHoverControl })
        },
        {
            id: 'colorButton',
            show: !switcher.buttonHoverControl || switcher.buttonHoverControl === 'normal',
            label: __('Button Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'bgcolorButton',
            show: !switcher.buttonHoverControl || switcher.buttonHoverControl === 'normal',
            label: __('Button Background', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'bggradientButton',
            component: BackgroundControl,
            show: !switcher.buttonHoverControl || switcher.buttonHoverControl === 'normal',
            allowDeviceControl: true,
            options: ['gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'borderButton_v2',
            show: !switcher.buttonHoverControl || switcher.buttonHoverControl === 'normal',
            label: __('Button Border', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'marginButton',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            show: !switcher.buttonHoverControl || switcher.buttonHoverControl === 'normal',
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
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]`,
                    render: value => handleDimension(value, 'margin')
                }
            ],
        },
        {
            id: 'paddingButton',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            show: !switcher.buttonHoverControl || switcher.buttonHoverControl === 'normal',
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
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: 'colorButtonHover',
            show: switcher.buttonHoverControl === 'hover',
            label: __('Button Color Hover', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]:hover`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'bgcolorButtonHover',
            show: switcher.buttonHoverControl === 'hover',
            label: __('Button Background Hover', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]:hover`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'bggradientButtonHover',
            component: BackgroundControl,
            show: switcher.buttonHoverControl === 'hover',
            allowDeviceControl: true,
            options: ['gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]:hover`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'borderButtonHover_v2',
            show: switcher.buttonHoverControl === 'hover',
            label: __('Button Border Hover', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]:hover`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'marginButtonHover',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            show: switcher.buttonHoverControl === 'hover',
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
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]:hover`,
                    render: value => handleDimension(value, 'margin')
                }
            ],
        },
        {
            id: 'paddingButtonHover',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            show: switcher.buttonHoverControl === 'hover',
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
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]:hover`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
    ];
};


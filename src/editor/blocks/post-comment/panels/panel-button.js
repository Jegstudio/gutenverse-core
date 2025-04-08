import { __ } from '@wordpress/i18n';
import { handleBackground, handleBorder, handleBorderResponsive, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';
import { BackgroundControl, BorderControl, BorderResponsiveControl, ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const buttonPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();

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
            id: 'borderButton',
            show: (!switcher.buttonHoverControl || switcher.buttonHoverControl === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'borderButtonResponsive',
            show: (!switcher.buttonHoverControl || switcher.buttonHoverControl === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
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
            id: 'borderButtonHover',
            show: switcher.buttonHoverControl === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]:hover`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'borderButtonHoverResponsive',
            show: switcher.buttonHoverControl === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-post-comment input[type=submit]:hover`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
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


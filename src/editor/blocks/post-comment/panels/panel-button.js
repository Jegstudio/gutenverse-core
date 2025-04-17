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
            liveStyle: {
                'type': 'color',
                'id': 'colorButton',
                'selector': `.${elementId}.guten-post-comment input[type=submit]`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            } 
        },
        {
            id: 'bgcolorButton',
            show: !switcher.buttonHoverControl || switcher.buttonHoverControl === 'normal',
            label: __('Button Background', 'gutenverse'),
            component: ColorControl,
            liveStyle: {
                'type': 'color',
                'id': 'bgcolorButton',
                'selector': `.${elementId}.guten-post-comment input[type=submit]`,
                'properties': [
                    {
                        'name': 'background-color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'bggradientButton',
            component: BackgroundControl,
            show: !switcher.buttonHoverControl || switcher.buttonHoverControl === 'normal',
            allowDeviceControl: true,
            options: ['gradient'],
            liveStyle: {
                'type': 'background',
                'id': 'bggradientButton',
                'selector': `.${elementId}.guten-post-comment input[type=submit]`,
            }
        },
        {
            id: 'borderButton',
            show: (!switcher.buttonHoverControl || switcher.buttonHoverControl === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: {
                'type': 'border',
                'id': 'borderButton',
                'selector': `.${elementId}.guten-post-comment input[type=submit]`,
            }
        },
        {
            id: 'borderButtonResponsive',
            show: (!switcher.buttonHoverControl || switcher.buttonHoverControl === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'borderResponsive',
                'id': 'borderButtonResponsive',
                'selector': `.${elementId}.guten-post-comment input[type=submit]`,
            }
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
        },
        {
            id: 'colorButtonHover',
            show: switcher.buttonHoverControl === 'hover',
            label: __('Button Color Hover', 'gutenverse'),
            component: ColorControl,
            liveStyle: {
                'type': 'color',
                'id': 'colorButtonHover',
                'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'bgcolorButtonHover',
            show: switcher.buttonHoverControl === 'hover',
            label: __('Button Background Hover', 'gutenverse'),
            component: ColorControl,
            liveStyle: {
                'type': 'color',
                'id': 'bgcolorButtonHover',
                'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
                'properties': [
                    {
                        'name': 'background-color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'bggradientButtonHover',
            component: BackgroundControl,
            show: switcher.buttonHoverControl === 'hover',
            allowDeviceControl: true,
            options: ['gradient'],
            liveStyle: {
                'type': 'background',
                'id': 'bggradientButtonHover',
                'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
            }
        },
        {
            id: 'borderButtonHover',
            show: switcher.buttonHoverControl === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: {
                'type': 'border',
                'id': 'borderButtonHover',
                'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
            }
        },
        {
            id: 'borderButtonHoverResponsive',
            show: switcher.buttonHoverControl === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'borderResponsive',
                'id': 'borderButtonHoverResponsive',
                'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
            }
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
        },
    ];
};


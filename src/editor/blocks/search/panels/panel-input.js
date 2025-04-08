import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { handleDimension, handleColor, handleTypography, handleBorderResponsive, allowRenderBoxShadow, handleBoxShadow, handleBorder } from 'gutenverse-core/styling';

export const inputPanel = props => {
    const {
        elementId,
        setSwitcher,
        switcher
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'inputPadding',
            label: __('Input Padding', 'gutenverse'),
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
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input `,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'inputMargin',
            label: __('Input Margin', 'gutenverse'),
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
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'placeholderColor',
            label: __('Input Placeholder Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search-input::placeholder`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'inputTypography',
            label: __('Input Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: '__itemState',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
                {
                    value: 'focus',
                    label: 'Focus'
                },
            ],
            onChange: ({ __itemState }) => setSwitcher({ ...switcher, inputState: __itemState })
        },
        {
            id: 'inputColorNormal',
            show: !switcher.inputState || switcher.inputState === 'normal',
            label: __('Input Color Normal', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'inputBgColorNormal',
            show: !switcher.inputState || switcher.inputState === 'normal',
            label: __('Input Background Color Normal', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'inputBorderNormal',
            show: (!switcher.inputState || switcher.inputState === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'inputBorderNormalResponsive',
            show: (!switcher.inputState || switcher.inputState === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'inputColorHover',
            show: switcher.inputState === 'hover',
            label: __('Input Color Hover', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input:hover`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'inputBgColorHover',
            show: switcher.inputState === 'hover',
            label: __('Input Background Color Hover', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input:hover`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'inputBorderHover',
            show: switcher.inputState === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input:hover`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'inputBorderHoverResponsive',
            show: switcher.inputState === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input:hover`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'inputColorFocus',
            show: switcher.inputState === 'focus',
            label: __('Input Color Focus', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input:focus`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'inputBgColorFocus',
            show: switcher.inputState === 'focus',
            label: __('Input Background Color Focus', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input:focus`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'inputBorderFocus',
            show: (switcher.inputState === 'focus') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input:focus`,
                    hasChild: true,
                    render: value => handleBorder(value)
                },
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input:focus-visible`,
                    render: () => 'outline: none !important'
                }
            ]
        },
        {
            id: 'inputBorderFocusResponsive',
            show: (switcher.inputState === 'focus') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input:focus`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                },
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input:focus-visible`,
                    render: () => 'outline: none !important'
                }
            ]
        },
        {
            id: 'inputAreaBoxShadow',
            show: !switcher.inputState || switcher.inputState === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input, .${elementId} .guten-button-wrapper .guten-button`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'inputAreaBoxShadowHover',
            show: switcher.inputState === 'hover',
            label: __('Hover Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input:hover, .${elementId} .guten-button-wrapper .guten-button:hover`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'inputAreaBoxShadowFocus',
            show: switcher.inputState === 'focus',
            label: __('Focus Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input:hover, .${elementId} .guten-button-wrapper .guten-button:focus`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};
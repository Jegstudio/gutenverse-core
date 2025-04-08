import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { BackgroundControl, BorderResponsiveControl, ColorControl, DimensionControl, IconRadioControl, SizeControl, SwitchControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderResponsive, handleColor, handleDimension, handleTextShadow, handleTypography, handleUnitPoint } from 'gutenverse-core/styling';

export const linkPanel = (props) => {
    const {
        elementId,
        setSwitcher,
        switcher
    } = props;
    return [
        {
            id: 'linkAlignment',
            label: __('Content Alignment', 'gutenverse'),
            component: IconRadioControl,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenver se'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'end',
                    icon: <AlignRight />,
                }
            ],
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-link-wrapper`,
                    render: value => `justify-content: ${value}; `
                }
            ]
        },
        {
            id: 'linkPadding',
            label: __('Link Padding', 'gutenverse'),
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
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-link-wrapper a`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: 'linkMargin',
            label: __('Link Margin', 'gutenverse'),
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
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-link-wrapper a`,
                    render: value => handleDimension(value, 'margin')
                }
            ],
        },
        {
            id: 'linkBackground',
            label: __('Link Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'linkBorder',
            label: __('Link Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'linkTypography',
            label: __('Link Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-link-wrapper a`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'linkIconSpace',
            component: SizeControl,
            label: __('Icon Text Space', 'gutenverse'),
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vh',
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
                    allowRender: () => true,
                    render: value => handleUnitPoint(value, 'gap')
                }
            ]
        },
        {
            id: 'linkIconSize',
            component: SizeControl,
            label: __('Icon Size', 'gutenverse'),
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vh',
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a i`,
                    allowRender: () => true,
                    render: value => handleUnitPoint(value, 'font-size')
                }
            ]
        },
        {
            id: '__hoverSwitch',
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
            onChange: ({ __hoverSwitch }) => setSwitcher({ ...switcher, hoverSwitch: __hoverSwitch })
        },
        {
            id: 'linkColor',
            label: __('Link Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'normal' || !switcher.hoverSwitch,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-link-wrapper a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'linkIconColor',
            label: __('Icon Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'normal' || !switcher.hoverSwitch,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-link-wrapper a i`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'linkTextShadow',
            label: __('Link Text Shadow', 'gutenverse'),
            show: switcher.hoverSwitch === 'normal' || !switcher.hoverSwitch,
            component: TextShadowControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-link-wrapper a`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        },
        {
            id: 'linkColorHover',
            label: __('Link Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'hover',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-link-wrapper:hover a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'linkIconColorHover',
            label: __('Icon Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'hover',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-link-wrapper:hover a i`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'linkTextShadowHover',
            label: __('Link Text Shadow', 'gutenverse'),
            show: switcher.hoverSwitch === 'hover',
            component: TextShadowControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-link-wrapper:hover a`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        }
    ];
};
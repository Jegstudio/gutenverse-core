import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BoxShadowControl, ColorControl, DimensionControl, RangeControl, SelectControl, SwitchControl } from 'gutenverse-core/controls';
import { handleColor, handleDimension, handleBorder, elementVar, normalAppender, allowRenderBoxShadow } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const panelIconStyle = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        iconStyleMode
    } = props;

    /**
     * This is custom to prevent older saved values causing errors because BackgroundControl is used instead of GradientControl
     */
    const customHandleBackground = (background) => {
        const elementStyle = elementVar();
        const {
            gradientColor,
            gradientType = 'linear',
            gradientAngle = 180,
            gradientRadial = 'center center'
        } = background;

        if (gradientColor !== undefined) {
            const colors = gradientColor.map(gradient => `${gradient.color} ${gradient.offset * 100}%`);

            if (gradientType === 'radial') {
                normalAppender({
                    style: `background-image: radial-gradient(at ${gradientRadial}, ${colors.join(',')});`,
                    elementStyle
                });
            } else {
                normalAppender({
                    style: `background-image: linear-gradient(${gradientAngle}deg, ${colors.join(',')});`,
                    elementStyle
                });
            }
        }

        return elementStyle;
    };

    return [
        {
            id: 'iconStyleMode',
            label: __('Color Mode', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'color',
                    label: 'Color'
                },
                {
                    value: 'gradient',
                    label: 'Gradient'
                }
            ],
        },
        {
            id: '__iconHover',
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
            onChange: ({__iconHover}) => setSwitcher({...switcher, icon: __iconHover})
        },
        {
            id: 'iconColor',
            show: (!switcher.icon || switcher.icon === 'normal') && (!iconStyleMode || iconStyleMode === 'color'),
            label: __('Normal Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .icon-box.icon-box-header .icon i`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconHoverColor',
            show: switcher.icon === 'hover' && (!iconStyleMode || iconStyleMode === 'color'),
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}:hover .icon-box.icon-box-header .icon i`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconBgColor',
            show: (!switcher.icon || switcher.icon === 'normal') && (!iconStyleMode || iconStyleMode === 'color'),
            label: __('Normal Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .icon-box.icon-box-header .icon`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'iconHoverBgColor',
            show: switcher.icon === 'hover' && (!iconStyleMode || iconStyleMode === 'color'),
            label: __('Hover Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}:hover .icon-box.icon-box-header .icon`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'iconBackground',
            show: (!switcher.icon || switcher.icon === 'normal') && iconStyleMode === 'gradient',
            component: BackgroundControl,
            options: ['gradient'],
            style: [
                {
                    selector: `.${elementId} .icon-box.icon-box-header .icon.style-gradient`,
                    hasChild: true,
                    render: value => customHandleBackground(value)
                }
            ]
        },
        {
            id: 'iconBackgroundHover',
            show: switcher.icon === 'hover' && iconStyleMode === 'gradient',
            component: BackgroundControl,
            options: ['gradient'],
            style: [
                {
                    selector: `.${elementId}:hover .icon-box.icon-box-header .icon.style-gradient`,
                    hasChild: true,
                    render: value => customHandleBackground(value)
                }
            ]
        },
        {
            id: 'iconBorder',
            show: !switcher.icon || switcher.icon === 'normal',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .icon-box.icon-box-header .icon`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'iconBoxShadow',
            show: !switcher.icon || switcher.icon === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .icon-box.icon-box-header .icon`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'iconBorderHover',
            show: switcher.icon === 'hover',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}:hover .icon-box.icon-box-header .icon`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'iconBoxShadowHover',
            show: switcher.icon === 'hover',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId}:hover .icon-box.icon-box-header .icon`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'iconPadding',
            label: __('Padding', 'gutenverse'),
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
                    selector: `.${elementId} .icon-box.icon-box-header .icon`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: 'iconMargin',
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
            style: [
                {
                    selector: `.${elementId} .icon-box.icon-box-header .icon`,
                    render: value => handleDimension(value, 'margin')
                }
            ],
        },
        {
            id: 'iconRotate',
            label: __('Icon Rotate', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 360,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .icon-box.icon-box-header .icon`,
                    render: value => `transform: rotate(${value}deg);`
                }
            ]
        },
    ];
};
import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { BackgroundControl, ColorControl, DimensionControl, IconRadioControl, SwitchControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, allowRenderTextShadow, handleBackground, handleColor, handleDimension, handleTextShadow, handleTypography } from 'gutenverse-core/styling';

export const contentPanel = (props) => {
    const {
        elementId,
        setSwitcher,
        switcher
    } = props;
    return [
        {
            id: 'activeBackground',
            label: __('Active Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item.current-item`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'contentAlignment',
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
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-item-info`,
                    render: value => `text-align: ${value}; `
                }
            ]
        },
        {
            id: 'contentPadding',
            label: __('Content Padding', 'gutenverse'),
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
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-item-info`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: 'contentBackground',
            label: __('Title Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-item-info::after`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-item-info .info-title`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'subTitleTypography',
            label: __('Sub Title Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-item-info .info-subtitle`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
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
            id: 'titleColor',
            label: __('Title Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'normal' || !switcher.hoverSwitch,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-item-info .info-title`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'subTitleColor',
            label: __('Sub Title Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'normal' || !switcher.hoverSwitch,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-item-info .info-subtitle`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'titleTextShadow',
            label: __('Title Text Shadow', 'gutenverse'),
            show: switcher.hoverSwitch === 'normal' || !switcher.hoverSwitch,
            component: TextShadowControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-item-info .info-title`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        },
        {
            id: 'subTitleTextShadow',
            label: __('Sub Title Text Shadow', 'gutenverse'),
            show: switcher.hoverSwitch === 'normal' || !switcher.hoverSwitch,
            component: TextShadowControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item .row-item-info .info-subtitle`,
                    allowRender: (value) => allowRenderTextShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        },
        {
            id: 'titleColorHover',
            label: __('Title Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'hover',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item:hover .row-item-info .info-title`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'subTitleColorHover',
            label: __('Sub Title Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'hover',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item:hover .row-item-info .info-subtitle`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'titleTextShadowHover',
            label: __('Title Text Shadow', 'gutenverse'),
            show: switcher.hoverSwitch === 'hover',
            component: TextShadowControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item:hover .row-item-info .info-title`,
                    allowRender: (value) => allowRenderTextShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        },
        {
            id: 'subTitleTextShadowHover',
            label: __('Sub Title Text Shadow', 'gutenverse'),
            show: switcher.hoverSwitch === 'hover',
            component: TextShadowControl,
            style: [
                {
                    selector: `.${elementId} .portfolio-gallery-container .row-item:hover .row-item-info .info-subtitle`,
                    allowRender: (value) => allowRenderTextShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        },
    ];
};
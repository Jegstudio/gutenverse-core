import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, IconControl, RangeControl, SizeControl, SelectControl, DimensionControl, BackgroundControl, BorderControl, SwitchControl, BoxShadowControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderResponsive, handleBoxShadow, handleColor, handleDimension, handleUnitPoint } from 'gutenverse-core/styling';

export const closePanel = (props) => {
    const {
        elementId,
        showCloseButton,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'closePopupOverlay',
            label: __('Click overlay to close', 'gutenverse'),
            description: __('Enable this option to close popup when overlay clicked.'),
            component: CheckboxControl,
        },
        {
            id: 'showCloseButton',
            label: __('Show Close Button', 'gutenverse'),
            description: __('Show close button '),
            component: CheckboxControl,
        },
        {
            id: 'closePosition',
            label: __('Close Position', 'gutenverse'),
            show: showCloseButton,
            component: SelectControl,
            options: [
                {
                    label: __('Overlay', 'gutenverse'),
                    value: 'overlay',
                },
                {
                    label: __('Container', 'gutenverse'),
                    value: 'container',
                },
            ],
        },
        {
            id: 'closeIcon',
            label: __('Close Icon', 'gutenverse'),
            show: showCloseButton,
            component: IconControl,
        },
        {
            id: 'closeButtonSize',
            label: __('Close icons size', 'gutenverse'),
            component: RangeControl,
            show: showCloseButton,
            allowDeviceControl: true,
            min: 1,
            max: 200,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-popup-close i`,
                    render: (value) => `font-size: ${value}px;`,
                },
            ],
        },
        {
            id: 'closePositioningLeft',
            label: __('Left Orientation', 'gutenverse'),
            component: SizeControl,
            show: showCloseButton,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-popup-close`,
                    render: (value) => handleUnitPoint(value, 'left'),
                },
            ],
        },
        {
            id: 'closePositioningRight',
            label: __('Right Orientation', 'gutenverse'),
            component: SizeControl,
            show: showCloseButton,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-popup-close`,
                    render: (value) => handleUnitPoint(value, 'right'),
                },
            ],
        },
        {
            id: 'closePositioningTop',
            label: __('Top Orientation', 'gutenverse'),
            component: SizeControl,
            show: showCloseButton,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-popup-close`,
                    render: (value) => handleUnitPoint(value, 'top'),
                },
            ],
        },
        {
            id: 'closePositioningBottom',
            label: __('Bottom Orientation', 'gutenverse'),
            component: SizeControl,
            show: showCloseButton,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-popup-close`,
                    render: (value) => handleUnitPoint(value, 'bottom'),
                },
            ],
        },
        {
            id: 'closePadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            show: showCloseButton,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px',
                },
                em: {
                    text: 'em',
                    unit: 'em',
                },
                ['%']: {
                    text: '%',
                    unit: '%',
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-popup .guten-popup-close`,
                    render: (value) => handleDimension(value, 'padding'),
                },
            ],
        },
        {
            id: '__closeSwitch',
            component: SwitchControl,
            show: showCloseButton,
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
            onChange: ({ __closeSwitch }) => setSwitcher({ ...switcher, closeSwitch: __closeSwitch })
        },
        {
            id: 'closeButtonColor',
            label: __('Close Icon Color', 'gutenverse'),
            show: showCloseButton && (!switcher.closeSwitch || switcher.closeSwitch === 'normal'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-popup .guten-popup-close i`,
                    render: (value) => handleColor(value, 'color'),
                },
            ],
        },
        {
            id: 'closeButtonBgColor',
            component: BackgroundControl,
            show: showCloseButton && (!switcher.closeSwitch || switcher.closeSwitch === 'normal'),
            label: __('Close Icon Background Color', 'gutenverse'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-popup-close`,
                    hasChild: true,
                    render: (value) => handleBackground(value),
                },
            ],
        },
        {
            id: 'closeBorder',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            show: showCloseButton && (!switcher.closeSwitch || switcher.closeSwitch === 'normal'),
            style: [
                {
                    selector: `.${elementId} .guten-popup .guten-popup-close`,
                    render: (value) => handleBorderResponsive(value),
                },
            ],
        },
        {
            id: 'closeBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            show: showCloseButton && (!switcher.closeSwitch || switcher.closeSwitch === 'normal'),
            style: [
                {
                    selector: `.${elementId} .guten-popup .guten-popup-close`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'closeButtonColorHover',
            label: __('Close Icon Color', 'gutenverse'),
            show: showCloseButton && (switcher.closeSwitch && switcher.closeSwitch === 'hover'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-popup .guten-popup-close:hover i`,
                    render: (value) => handleColor(value, 'color'),
                },
            ],
        },
        {
            id: 'closeButtonBgColorHover',
            component: BackgroundControl,
            show: showCloseButton && (switcher.closeSwitch && switcher.closeSwitch === 'hover'),
            label: __('Close Icon Background Color', 'gutenverse'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-popup-close:hover`,
                    hasChild: true,
                    render: (value) => handleBackground(value),
                },
            ],
        },
        {
            id: 'closeBorderHover',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            show: showCloseButton && (switcher.closeSwitch && switcher.closeSwitch === 'hover'),
            style: [
                {
                    selector: `.${elementId} .guten-popup .guten-popup-close:hover`,
                    render: (value) => handleBorderResponsive(value),
                },
            ],
        },
        {
            id: 'closeBoxShadowHover',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            show: showCloseButton && (switcher.closeSwitch && switcher.closeSwitch === 'hover'),
            style: [
                {
                    selector: `.${elementId} .guten-popup .guten-popup-close:hover`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};

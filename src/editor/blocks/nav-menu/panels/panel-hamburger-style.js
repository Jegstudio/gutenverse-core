import { __ } from '@wordpress/i18n';
import { AlignLeft, AlignRight } from 'gutenverse-core/components';
import { IconRadioControl, SizeControl, RangeControl, SwitchControl, BackgroundControl, ColorControl, DimensionControl, HeadingControl, BorderControl } from 'gutenverse-core/controls';
import { handleBackground, handleBorderResponsive, handleColor, handleDimension, handleUnitPoint } from 'gutenverse-core/styling';

export const hamburgerStyle = (props) => {
    const {
        elementId,
        setSwitcher,
        switcher,
    } = props;

    return [
        {
            id: 'hamburgerAlignment',
            label: __('Hamburger Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
            ],
            style: [
                {
                    selector: `.${elementId} .gutenverse-hamburger-wrapper`,
                    render: value => `justify-content: ${value}`
                },
            ]
        },
        {
            id: 'hamburgerWidth',
            label: __('Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                '%': {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 0.1
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-hamburger-menu`,
                    render: value => handleUnitPoint(value, 'width')
                }
            ]
        },
        {
            id: 'hamburgerSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 5,
            max: 300,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-hamburger-menu i`,
                    render: value => `font-size: ${value}px;`
                }
            ],
        },
        {
            id: 'hamburgerPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-hamburger-menu`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'hamburgerMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-hamburger-menu`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: '__hamburgerState',
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
            ],
            onChange: ({ __hamburgerState }) => setSwitcher({ ...switcher, hamburgerState: __hamburgerState })
        },
        {
            id: 'hamburgerColorNormal',
            show: switcher.hamburgerState === undefined || switcher.hamburgerState === 'normal',
            label: __('Icon Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-hamburger-menu`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'hamburgerBgNormal',
            show: switcher.hamburgerState === undefined || switcher.hamburgerState === 'normal',
            component: BackgroundControl,
            label: __('Normal Background', 'gutenverse'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-hamburger-menu`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'hamburgerBorderNormal_v2',
            show: switcher.hamburgerState === undefined || switcher.hamburgerState === 'normal',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-hamburger-menu`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'hamburgerColorHover',
            show: switcher.hamburgerState === 'hover',
            label: __('Hover Icon Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-hamburger-menu:hover`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'hamburgerBgHover',
            show: switcher.hamburgerState === 'hover',
            component: BackgroundControl,
            label: __('Hover Background', 'gutenverse'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-hamburger-menu:hover`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'hamburgerBorderHover_v2',
            show: switcher.hamburgerState === 'hover',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-hamburger-menu:hover`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'closeIconHeading',
            component: HeadingControl,
            label: __('Close Icon')
        },
        {
            id: 'closeWidth',
            label: __('Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                '%': {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 0.1
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
                    render: value => handleUnitPoint(value, 'width')
                }
            ]
        },
        {
            id: 'closeSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 5,
            max: 300,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu i`,
                    render: value => `font-size: ${value}px;`
                }
            ],
        },
        {
            id: 'closePadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'closeMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: '__closeState',
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
            ],
            onChange: ({ __closeState }) => setSwitcher({ ...switcher, closeState: __closeState })
        },
        {
            id: 'closeColorNormal',
            show: switcher.closeState === undefined || switcher.closeState === 'normal',
            label: __('Icon Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'closeBgNormal',
            show: switcher.closeState === undefined || switcher.closeState === 'normal',
            component: BackgroundControl,
            label: __('Normal Background', 'gutenverse'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'closeBorderNormal_v2',
            show: switcher.closeState === undefined || switcher.closeState === 'normal',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'closeColorHover',
            show: switcher.closeState === 'hover',
            label: __('Hover Icon Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu:hover`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'closeBgHover',
            show: switcher.closeState === 'hover',
            component: BackgroundControl,
            label: __('Hover Background', 'gutenverse'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu:hover`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'closeBorderHover_v2',
            show: switcher.closeState === 'hover',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu:hover`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
    ];
};
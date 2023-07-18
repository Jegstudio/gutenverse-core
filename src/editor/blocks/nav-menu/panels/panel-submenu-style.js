import { __ } from '@wordpress/i18n';
import { HeadingControl, BackgroundControl, ColorControl, DimensionControl, IconControl, SwitchControl, TypographyControl, BorderControl } from 'gutenverse-core/controls';
import { handleBackground, handleBorder, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const SubmenuItemStyle = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'submenuItemIndicator',
            label: __('Indicator Item', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'submenuIndicatorMargin',
            label: __('Indicator Margin', 'gutenverse'),
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
                    selector: `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a i`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'submenuIndicatorPadding',
            label: __('Indicator Padding', 'gutenverse'),
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
                    selector: `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a > i`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'submenuIndicatorBorder',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a i`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'submenuTypography',
            label: __('Submenu Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li  a`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'submenuSpacing',
            label: __('Submenu Spacing', 'gutenverse'),
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
            },
            style: [
                {
                    selector: `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li  a`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: '__submenuState',
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
                    value: 'active',
                    label: 'Active'
                }
            ],
            onChange: ({ __submenuState }) => setSwitcher({ ...switcher, itemState: __submenuState })
        },
        {
            id: 'submenuTextNormalColor',
            show: switcher.itemState === undefined || switcher.itemState === 'normal',
            label: __('Submenu Text Normal Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li > a`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'submenuIndicatorColor',
            show: switcher.itemState === undefined || switcher.itemState === 'normal',
            label: __('Indicator Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a > i`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'submenuTextNormalBg',
            show: switcher.itemState === undefined || switcher.itemState === 'normal',
            component: BackgroundControl,
            label: __('Submenu Text Normal Background', 'gutenverse'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li > a`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'submenuTextHoverColor',
            show: switcher.itemState === 'hover',
            label: __('Submenu Text Hover Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:hover > a`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'submenuIndicatorHoverColor',
            show: switcher.itemState === 'hover',
            label: __('Indicator Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children:hover > a > i`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'submenuTextHoverBg',
            show: switcher.itemState === 'hover',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:hover > a`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'submenuTextActiveColor',
            show: switcher.itemState === 'active',
            label: __('Submenu Text Active Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu > li.current-menu-item > a`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'submenuIndicatorActiveColor',
            show: switcher.itemState === 'active',
            label: __('Indicator Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children.current-menu-parent > a > i`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'submenuTextActiveBg',
            show: switcher.itemState === 'active',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu > li.current-menu-item > a`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'submenuItemBorderHeading',
            component: HeadingControl,
            label: __('Submenu Border')
        },
        {
            id: 'submenuItemBorder',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li > a`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'submenuFirstItemBorderHeading',
            component: HeadingControl,
            label: __('Submenu First Child Border')
        },
        {
            id: 'submenuFirstItemBorder',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:first-child > a`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'submenuLastItemBorderHeading',
            component: HeadingControl,
            label: __('Submenu Last Child Border')
        },
        {
            id: 'submenuLastItemBorder',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:last-child > a`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
    ];
};
import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderResponsiveControl, ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { handleBackground, handleBorderResponsive, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const itemStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'itemTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'itemSpacing',
            label: __('Item Spacing', 'gutenverse'),
            allowDeviceControl: true,
            component: DimensionControl,
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
                    selector: `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
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
                    value: 'active',
                    label: 'Active'
                }
            ],
            onChange: ({ __itemState }) => setSwitcher({ ...switcher, itemState: __itemState })
        },
        {
            id: 'itemTextNormalColor',
            show: switcher.itemState === undefined || switcher.itemState === 'normal',
            label: __('Item Text Normal Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'itemTextNormalBg',
            show: switcher.itemState === undefined || switcher.itemState === 'normal',
            component: BackgroundControl,
            label: __('Item Text Normal Background', 'gutenverse'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'itemTextHoverColor',
            show: switcher.itemState === 'hover',
            label: __('Item Text Hover Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li:hover > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li:hover > a`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'itemTextHoverBg',
            show: switcher.itemState === 'hover',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li:hover > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li:hover > a`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'itemTextActiveColor',
            show: switcher.itemState === 'active',
            label: __('Item Text Active Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-item > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-item > a`,
                    render: value => handleColor(value, 'color')
                },
                {
                    selector: `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-ancestor > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-ancestor > a`,
                    render: value => handleColor(value, 'color')
                },
            ],
        },
        {
            id: 'itemTextActiveBg',
            show: switcher.itemState === 'active',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-item > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-item > a`,
                    hasChild: true,
                    render: value => handleBackground(value)
                },
                {
                    selector: `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-ancestor > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-ancestor > a`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'itemMenuBorderNormal',
            show: switcher.itemState === undefined || switcher.itemState === 'normal',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'itemMenuBorderHover',
            show: switcher.itemState === 'hover',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li:hover > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li:hover > a`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'itemMenuBorderActive',
            show: switcher.itemState === 'active',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu > li.current-menu-ancestor > a,
                    .${elementId} .gutenverse-menu-wrapper .gutenverse-menu > ul > li.current-menu-ancestor > a`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },

    ];
};
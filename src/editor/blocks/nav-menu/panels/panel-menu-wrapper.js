import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';
import { handleBackground, handleColor, handleDimension } from 'gutenverse-core/styling';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const menuWrapperPanel = (props) => {
    const {
        elementId
    } = props;

    const deviceType = getDeviceType();

    return [
        {
            id: 'menuHeight',
            label: __('Menu Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 30,
            max: 300,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li > a,
                    .${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a`,
                    render: value => `height: ${value}px;`
                }
            ],
        },
        {
            id: 'menuBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper, .${elementId} .guten-nav-menu.break-point-tablet .gutenverse-menu-wrapper, .${elementId} .guten-nav-menu.break-point-mobile .gutenverse-menu-wrapper`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'mobileWrapperBackground',
            show: deviceType === 'Tablet' || deviceType === 'Mobile',
            label: __('Mobile Wrapper Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .break-point-mobile.guten-nav-menu .gutenverse-menu-wrapper`,
                    render: value => handleColor(value, 'background-color')
                },
                {
                    selector: `.${elementId} .break-point-tablet.guten-nav-menu .gutenverse-menu-wrapper`,
                    render: value => handleColor(value, 'background-color')
                }
            ],
        },
        {
            id: 'menuPadding',
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
                    selector: `.${elementId} .gutenverse-menu-wrapper > div`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'menuMargin',
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
                    selector: `.${elementId} .gutenverse-menu-wrapper > div`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'menuRadius',
            label: __('Border Radius', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                '%': {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .gutenverse-menu-wrapper`,
                    render: value => handleDimension(value, 'border-radius', false)
                }
            ]
        },
    ];
};
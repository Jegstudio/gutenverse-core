import { __ } from '@wordpress/i18n';
import { DimensionControl, RangeControl, SelectControl } from 'gutenverse-core-editor/controls';
import { handleDimension } from 'gutenverse-core/styling';

export const mobileMenuStyle = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'mobileLogoWidth',
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo img`,
                    render: value => `width: ${value}px;`
                }
            ],
        },
        {
            id: 'mobileLogoHeight',
            label: __('Height', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo img`,
                    render: value => `height: ${value}px;`
                }
            ],
        },
        {
            id: 'mobileLogoFit',
            label: __('Logo Fit', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Cover'),
                    value: 'cover'
                },
                {
                    label: __('Contain'),
                    value: 'contain'
                },
                {
                    label: __('Fill'),
                    value: 'fill'
                },
                {
                    label: __('Scale Down'),
                    value: 'scale-down'
                },
                {
                    label: __('None'),
                    value: 'none'
                },
            ],
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo img`,
                    render: value => `object-fit: ${value};`
                }
            ]
        },
        {
            id: 'mobileMenuMargin',
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
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'mobileMenuPadding',
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
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
    ];
};
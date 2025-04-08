import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { allowRenderBoxShadow, handleBackground, handleBorder, handleBorderResponsive, handleDimension } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const SubmenuPanelStyle = (props) => {
    const {
        elementId,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'submenuPanelPadding',
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
            },
            style: [
                {
                    selector: `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'submenuPanelMargin',
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
            },
            style: [
                {
                    selector: `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'submenuPanelBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'submenuPanelBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'submenuPanelBackground',
            component: BackgroundControl,
            label: __('Submenu Panel Background', 'gutenverse'),
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'submenuPanelWidth',
            label: __('Submenu Panel Width', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            style: [
                {
                    selector: `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
                    render: value => `width: ${value}px;`
                }
            ]
        },
        {
            id: 'submenuPanelShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};
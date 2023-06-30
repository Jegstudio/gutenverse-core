import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BoxShadowControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';
import { handleBackground, handleBorder, handleDimension } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBoxShadow } from 'gutenverse-core/controls';

export const SubmenuPanelStyle = (props) => {
    const {
        elementId,
    } = props;

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
                    selector: `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'submenuPanelBorder',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
                    hasChild: true,
                    render: value => handleBorder(value)
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
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
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
            min: 1,
            max: 1000,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
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
                    selector: `.${elementId} .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};
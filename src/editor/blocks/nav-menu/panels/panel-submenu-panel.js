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
        },
        {
            id: 'submenuPanelBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'submenuPanelBorder',
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
                }
            ],
        },
        {
            id: 'submenuPanelBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'submenuPanelBorderResponsive',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
                }
            ],
        },
        {
            id: 'submenuPanelBackground',
            component: BackgroundControl,
            label: __('Submenu Panel Background', 'gutenverse'),
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'submenuPanelBackground',
                    'type': 'background',
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
                },
            ],
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
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'submenuPanelWidth',
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ],
        },
        {
            id: 'submenuPanelShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'submenuPanelShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children .sub-menu`,
                }
            ],
        },
    ];
};
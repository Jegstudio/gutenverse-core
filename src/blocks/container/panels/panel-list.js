import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, maskPanel, positioningPanel, responsivePanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { layoutPanel } from './panel-layout';

export const panelList = () => {
    return [
        {
            title: __('Layout', 'gutenverse'),
            panelArray: layoutPanel,
            tabRole: TabSetting
        },
        {
            title: __('Display', 'gutenverse'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting
        },

        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: advancePanel,
            tabRole: TabSetting
        },
        {
            title: __('Positioning', 'gutenverse'),
            initialOpen: false,
            panelArray: positioningPanel,
            tabRole: TabSetting
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'container-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: `.${props.elementId}:not(.background-animated), .${props.elementId}.background-animated > .guten-background-animated .animated-layer, .${props.elementId}.empty-container`,
                hoverSelector: `.${props.elementId}:not(.background-animated):hover, .${props.elementId}.background-animated:hover > .guten-background-animated .animated-layer, .${props.elementId}.empty-container:hover`,
            }),
            tabRole: TabStyle
        },
        {
            title: __('Boxed Background', 'gutenverse'),
            initialOpen: false,
            show: (props) => props.containerLayout === 'boxed',
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'boxed-background',
                optionaName: 'boxedBackground',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: `.${props.elementId} .guten-inner-container`,
                hoverSelector: `.${props.elementId}:hover .guten-inner-container`,
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: borderPanel,
            tabRole: TabStyle
        },
        {
            title: __('Masking', 'gutenverse'),
            initialOpen: false,
            panelArray: maskPanel,
            tabRole: TabStyle
        },
        {
            title: __('Animation', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'container-animation'
            }),
            tabRole: TabStyle
        },
    ];
};

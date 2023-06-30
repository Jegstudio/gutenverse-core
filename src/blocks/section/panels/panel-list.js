import { layoutPanel } from './panel-layout';
import { structurePanel } from './panel-structure';
import { __ } from '@wordpress/i18n';
import { dividerPanel } from './panel-divider';
import { advancePanel, animationPanel, backgroundOverlayPanel, backgroundPanel, borderPanel, positioningPanel, responsivePanel, typographyPanel } from 'gutenverse-core/controls';
import { stickyPanel } from './panel-sticky';
import { advanceAnimationPanel } from 'gutenverse-core/controls';
import { backgroundAnimatedPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { dividerPanelAnimated } from './panel-divider-animated';

export const panelList = () => {
    return [
        {
            title: __('Layouts', 'gutenverse'),
            panelArray: layoutPanel,
            tabRole: TabSetting,
        },
        {
            title: __('Structure', 'gutenverse'),
            initialOpen: false,
            panelArray: structurePanel,
            id: 'structure',
            tabRole: TabSetting
        },
        {
            title: __('Sticky', 'gutenverse'),
            initialOpen: false,
            panelArray: stickyPanel,
            pro: true
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                blockType: 'section',
                styleId: 'section-background',
                normalOptions: ['default', 'gradient', 'video'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: `.${props.elementId}:not(.background-animated), .${props.elementId}.background-animated > .guten-background-animated .animated-layer`,
                hoverSelector: `.${props.elementId}:not(.background-animated):hover, .${props.elementId}.background-animated:hover > .guten-background-animated .animated-layer`,
            }),
            tabRole: TabStyle
        },
        {
            title: __('Background Overlay', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundOverlayPanel({
                ...props,
                styleId: 'column-background-overlay',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient']
            }),
            tabRole: TabStyle
        },
        {
            title: __('Background Animated', 'gutenverse'),
            initialOpen: false,
            panelArray: backgroundAnimatedPanel,
            pro: true
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'section-border'
            }),
            tabRole: TabStyle
        },
        {
            title: __('Typography', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => typographyPanel({
                ...props,
                styleId: 'section-typography'
            }),
            tabRole: TabStyle
        },
        {
            title: __('Shape Divider', 'gutenverse'),
            initialOpen: false,
            panelArray: dividerPanel,
            tabRole: TabSetting
        },
        {
            title: __('Shape Divider Animated', 'gutenverse'),
            initialOpen: false,
            panelArray: dividerPanelAnimated,
            pro: true
        },
        {
            title: __('Display', 'gutenverse'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting
        },
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'section-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Advance Animation', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'section'
            }),
            pro: true
        },
        {
            title: __('Positioning', 'gutenverse'),
            initialOpen: false,
            panelArray: positioningPanel,
            tabRole: TabSetting
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'section-advance',
            }),
            tabRole: TabSetting
        }
    ];
};
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
            title: __('Layouts', '--gctd--'),
            panelArray: layoutPanel,
            tabRole: TabSetting,
        },
        {
            title: __('Structure', '--gctd--'),
            initialOpen: false,
            panelArray: structurePanel,
            id: 'structure',
            tabRole: TabSetting
        },
        {
            title: __('Sticky', '--gctd--'),
            initialOpen: false,
            panelArray: stickyPanel,
            pro: true,
        },
        {
            title: __('Background', '--gctd--'),
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
            title: __('Background Overlay', '--gctd--'),
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
            title: __('Background Animated', '--gctd--'),
            initialOpen: false,
            panelArray: backgroundAnimatedPanel,
            pro: true,
        },
        {
            title: __('Border', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'section-border'
            }),
            tabRole: TabStyle
        },
        {
            title: __('Typography', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => typographyPanel({
                ...props,
                styleId: 'section-typography'
            }),
            tabRole: TabStyle
        },
        {
            title: __('Shape Divider', '--gctd--'),
            initialOpen: false,
            panelArray: dividerPanel,
            tabRole: TabSetting
        },
        {
            title: __('Shape Divider Animated', '--gctd--'),
            initialOpen: false,
            panelArray: dividerPanelAnimated,
            pro: true,
        },
        {
            title: __('Display', '--gctd--'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting
        },
        {
            title: __('Animation Effects', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'section-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Advance Animation', '--gctd--'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'section'
            }),
            pro: true,
        },
        {
            title: __('Positioning', '--gctd--'),
            initialOpen: false,
            panelArray: positioningPanel,
            tabRole: TabSetting
        },
        {
            title: __('Spacing', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'section-advance',
            }),
            tabRole: TabSetting
        }
    ];
};
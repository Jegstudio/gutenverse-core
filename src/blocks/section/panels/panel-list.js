import { layoutPanel } from './panel-layout';
import { structurePanel } from './panel-structure';
import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundOverlayPanel, backgroundPanel, borderPanel, cursorEffectPanel, mouseMoveEffectPanel, backgroundEffectPanel, maskPanel, positioningPanel, responsivePanel, transformPanel, typographyPanel, pointerEventPanel, conditionPanel } from 'gutenverse-core/controls';
import { dividerPanel } from './panel-divider';
import { stickyPanel } from './panel-sticky';
import { advanceAnimationPanel } from 'gutenverse-core/controls';
import { backgroundAnimatedPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { dividerPanelAnimated } from './panel-divider-animated';
import { blurPanel } from './panel-blur';

export const panelList = () => {
    return [
        // Settings
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
            title: __('Cursor Effect', '--gctd--'),
            initialOpen: false,
            panelArray: cursorEffectPanel,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Background Effect', '--gctd--'),
            initialOpen: false,
            panelArray: backgroundEffectPanel,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Background Animated', '--gctd--'),
            initialOpen: false,
            panelArray: backgroundAnimatedPanel,
            pro: true,
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
            title: __('Transform', '--gctd--'),
            initialOpen: false,
            panelArray: transformPanel,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Mouse Move Effect', '--gctd--'),
            initialOpen: false,
            panelArray: mouseMoveEffectPanel,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Advanced Animation', '--gctd--'),
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
        },
        {
            title: __('Condition', 'gutenverse'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },
        // Styles
        {
            title: __('Background', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                blockType: 'section',
                normalOptions: ['default', 'gradient', 'video', 'fluid', 'slide'],
                hoverOptions: ['default', 'gradient'],
                blockType: 'section'
            }),
            tabRole: TabStyle
        },
        {
            title: __('Background Overlay', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => backgroundOverlayPanel({
                ...props,
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient']
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
            title: __('Blur', '--gctd--'),
            initialOpen: false,
            panelArray: blurPanel,
            tabRole: TabStyle
        },
        {
            title: __('Pointer Event', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => pointerEventPanel({
                ...props,
                selector : `.section-${props.elementId}`
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
    ];
};
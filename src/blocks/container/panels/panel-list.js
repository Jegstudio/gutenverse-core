import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundOverlayPanel, backgroundPanel, borderPanel, cursorEffectPanel, maskPanel, positioningPanel, responsivePanel, backgroundEffectPanel, backgroundAnimatedPanel, transformPanel, mouseMoveEffectPanel, advanceAnimationPanel, conditionPanel, pointerEventPanel, typographyPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { layoutPanel } from './panel-layout';
import { dividerPanel } from './panel-divider';
import { dividerPanelAnimated } from './panel-divider-animated';
import { blurPanel } from './panel-blur';
import { stickyPanel } from './panel-sticky';

export const panelList = () => {
    return [
        {
            title: __('Layout', '--gctd--'),
            panelArray: layoutPanel,
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
                styleId: 'container-animation'
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
                blockType: 'container'
            }),
            pro: true,
        },
        {
            title: __('Positioning', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => positioningPanel({
                ...props,
                selector: `.guten-flex-container-editor.${props.elementId}, .guten-inner-container-editor>.guten-flex-container-editor.${props.elementId}.full-width`,
            }),
            tabRole: TabSetting
        },
        {
            title: __('Spacing', '--gctd--'),
            initialOpen: false,
            panelArray: advancePanel,
            tabRole: TabSetting
        },
        {
            title: __('Condition', '--gctd--'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },
        {
            title: __('Background', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                blockType: 'container',
                normalOptions: ['default', 'gradient', 'video', 'fluid', 'slide'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: `.${props.elementId}:not(.background-animated), .${props.elementId}.background-animated > .guten-background-animated .animated-layer, .${props.elementId}.empty-container`,
                hoverSelector: `.${props.elementId}:not(.background-animated):hover, .${props.elementId}.background-animated:hover > .guten-background-animated .animated-layer, .${props.elementId}.empty-container:hover`,
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
            title: __('Border', '--gctd--'),
            initialOpen: false,
            panelArray: borderPanel,
            tabRole: TabStyle
        },
        {
            title: __('Masking', '--gctd--'),
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
                selector: `.${props.elementId}`
            }),
            tabRole: TabStyle
        },
        {
            title: __('Typography', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => typographyPanel({
                ...props,
                styleId: 'container-typography'
            }),
            tabRole: TabStyle
        },
    ];
};

import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundOverlayPanel, backgroundPanel, borderPanel, cursorEffectPanel, maskPanel, positioningPanel, responsivePanel, backgroundEffectPanel, backgroundAnimatedPanel, transformPanel, mouseMoveEffectPanel, advanceAnimationPanel, conditionPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { layoutPanel } from './panel-layout';
import { dividerPanel } from './panel-divider';
import { dividerPanelAnimated } from './panel-divider-animated';

export const panelList = () => {
    return [
        {
            title: __('Layout', 'gutenverse'),
            panelArray: layoutPanel,
            tabRole: TabSetting
        },
        {
            title: __('Cursor Effect', 'gutenverse'),
            initialOpen: false,
            panelArray: cursorEffectPanel,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Background Effect', 'gutenverse'),
            initialOpen: false,
            panelArray: backgroundEffectPanel,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Background Animated', 'gutenverse'),
            initialOpen: false,
            panelArray: backgroundAnimatedPanel,
            pro: true,
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
            pro: true,
        },
        {
            title: __('Display', 'gutenverse'),
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
                blockType: 'section'
            }),
            pro: true,
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
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'container-background',
                normalOptions: ['default', 'gradient', 'video', 'fluid', 'slide'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: `.${props.elementId}:not(.background-animated), .${props.elementId}.background-animated > .guten-background-animated .animated-layer, .${props.elementId}.empty-container`,
                hoverSelector: `.${props.elementId}:not(.background-animated):hover, .${props.elementId}.background-animated:hover > .guten-background-animated .animated-layer, .${props.elementId}.empty-container:hover`,
            }),
            tabRole: TabStyle
        },
        {
            title: __('Background Overlay', 'gutenverse'),
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
        // {
        //     title: __('Blur', '--gctd--'),
        //     initialOpen: false,
        //     panelArray: blurPanel,
        //     tabRole: TabStyle
        // },
        // {
        //     title: __('Pointer Event', '--gctd--'),
        //     initialOpen: false,
        //     panelArray: (props) => pointerEventPanel({
        //         ...props,
        //         selector: `.section-${props.elementId}`
        //     }),
        //     tabRole: TabStyle
        // },
        // {
        //     title: __('Typography', '--gctd--'),
        //     initialOpen: false,
        //     panelArray: (props) => typographyPanel({
        //         ...props,
        //         styleId: 'section-typography'
        //     }),
        //     tabRole: TabStyle
        // },
    ];
};

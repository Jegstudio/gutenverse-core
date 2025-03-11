import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, backgroundOverlayPanel, borderPanel, responsivePanel, typographyPanel, maskPanel, cursorEffectPanel, backgroundAnimatedPanel, advanceAnimationPanel, mouseMoveEffectPanel, pointerEventPanel, backgroundEffectPanel, conditionPanel } from 'gutenverse-core/controls';
import { layoutPanel } from './panel-layout';
import { stickyPanel } from './panel-sticky';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { blurPanel } from './panel-blur';

export const panelList = () => {
    return [
        // Settings
        {
            title: __('Layouts', '--gctd--'),
            panelArray: layoutPanel,
            tabRole: TabSetting
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                selector: `.editor-styles-wrapper .is-root-container .${props.elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper`
            }),
            tabRole: TabSetting
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
                styleId: 'column-animation'
            }),
            tabRole: TabSetting
        },

        // Styles
        {
            title: __('Background', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                normalOptions: ['default', 'gradient', 'fluid', 'slide'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: `.editor-styles-wrapper .is-root-container .${props.elementId}:not(.background-animated) > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper, .${props.elementId}.background-animated > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper > .guten-background-animated .animated-layer`,
                hoverSelector: `.editor-styles-wrapper .is-root-container .${props.elementId}:not(.background-animated) > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:hover, .${props.elementId}.background-animated > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:hover > .guten-background-animated .animated-layer`
            }),
            tabRole: TabStyle
        },
        {
            title: __('Background Overlay', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => backgroundOverlayPanel({
                ...props,
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: ` .${props.elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper > .guten-background-overlay, .${props.elementId}.background-animated > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper > .guten-background-overlay`,
                hoverSelector: `.${props.elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:hover > .guten-background-overlay, .${props.elementId}.background-animated > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:hover > .guten-background-overlay`
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', '-gctd-'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                selector: `.editor-styles-wrapper .is-root-container .${props.elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper`,
            }),
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
            panelArray: pointerEventPanel,
            tabRole: TabStyle
        },
        {
            title: __('Typography', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => typographyPanel({
                ...props,
                styleId: 'column-typography'
            }),
            tabRole: TabStyle
        },

        // Pro
        {
            title: __('Sticky', '--gctd--'),
            panelArray: stickyPanel,
            pro: true,
        },
        // {
        //     title: __('Cursor Effect', '--gctd--'),
        //     initialOpen: false,
        //     panelArray: cursorEffectPanel,
        //     tabRole: TabSetting,
        //     pro: true,
        // },
        // {
        //     title: __('Background Effect', '--gctd--'),
        //     initialOpen: false,
        //     panelArray: (props) =>  backgroundEffectPanel({
        //         ...props,
        //         selector: `.${props.elementId}> .guten-column-resizeable> .sticky-wrapper> .guten-column-wrapper > .guten-background-effect`
        //     }),
        //     tabRole: TabSetting,
        //     pro: true,
        // },
        // {
        //     title: __('Mouse Move Effect', 'gutenverse'),
        //     initialOpen: false,
        //     panelArray: mouseMoveEffectPanel,
        //     tabRole: TabSetting,
        //     pro: true,
        // },
        {
            title: __('Background Animation', '--gctd--'),
            initialOpen: false,
            panelArray: backgroundAnimatedPanel,
            pro: true,
        },
        {
            title: __('Advanced Animation', '--gctd--'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'column'
            }),
            pro: true,
        },
        // {
        //     title: __('Condition', 'gutenverse'),
        //     panelArray: conditionPanel,
        //     initialOpen: false,
        //     pro: true
        // },
    ];
};
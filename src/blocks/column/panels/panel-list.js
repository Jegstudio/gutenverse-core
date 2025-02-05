import { __ } from '@wordpress/i18n';
import { layoutPanel } from './panel-layout';
import { advancePanel, animationPanel, backgroundPanel, backgroundOverlayPanel, borderPanel, responsivePanel, typographyPanel, maskPanel, cursorEffectPanel, backgroundAnimatedPanel, advanceAnimationPanel, mouseMoveEffectPanel, pointerEventPanel, backgroundEffectPanel, conditionPanel } from 'gutenverse-core/controls';
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
            title: __('Spacing', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'column-advance',
                selector: `.editor-styles-wrapper .is-root-container .${props.elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper`
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
            }),
            tabRole: TabStyle
        },
        // {
        //     title: __('Sticky', '--gctd--'),
        //     panelArray: stickyPanel,
        //     pro: true,
        // },
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
        //     title: __('Background Overlay', '--gctd--'),
        //     initialOpen: false,
        //     panelArray: (props) => backgroundOverlayPanel({
        //         ...props,
        //         normalOptions: ['default', 'gradient'],
        //         hoverOptions: ['default', 'gradient'],
        //     }),
        //     tabRole: TabStyle
        // },
        // {
        //     title: __('Blur', '--gctd--'),
        //     initialOpen: false,
        //     panelArray: blurPanel,
        //     tabRole: TabStyle
        // },
        // {
        //     title: __('Border', '--gctd--'),
        //     initialOpen: false,
        //     panelArray: (props) => borderPanel({
        //         ...props,
        //         styleId: 'column-border',
        //         selector: `.editor-styles-wrapper .is-root-container .${props.elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper`,
        //     }),
        //     tabRole: TabStyle
        // },
        // {
        //     title: __('Masking', '--gctd--'),
        //     initialOpen: false,
        //     panelArray: maskPanel,
        //     tabRole: TabStyle
        // },
        // {
        //     title: __('Pointer Event', '--gctd--'),
        //     initialOpen: false,
        //     panelArray: pointerEventPanel,
        //     tabRole: TabStyle
        // },
        // {
        //     title: __('Mouse Move Effect', 'gutenverse'),
        //     initialOpen: false,
        //     panelArray: mouseMoveEffectPanel,
        //     tabRole: TabSetting,
        //     pro: true,
        // },
        // {
        //     title: __('Typography', '--gctd--'),
        //     initialOpen: false,
        //     panelArray: (props) => typographyPanel({
        //         ...props,
        //         styleId: 'column-typography'
        //     }),
        //     tabRole: TabStyle
        // },
        // {
        //     title: __('Display', '--gctd--'),
        //     initialOpen: false,
        //     panelArray: responsivePanel,
        //     tabRole: TabSetting
        // },
        // {
        //     title: __('Animation Effects', '--gctd--'),
        //     initialOpen: false,
        //     panelArray: (props) => animationPanel({
        //         ...props,
        //         styleId: 'column-animation'
        //     }),
        //     tabRole: TabSetting
        // },
        // {
        //     title: __('Background Animation', '--gctd--'),
        //     initialOpen: false,
        //     panelArray: backgroundAnimatedPanel,
        //     pro: true,
        // },
        // {
        //     title: __('Advanced Animation', '--gctd--'),
        //     initialOpen: false,
        //     panelAdvance: true,
        //     panelArray: (props) => advanceAnimationPanel({
        //         ...props,
        //         blockType: 'column'
        //     }),
        //     pro: true,
        // },
        // {
        //     title: __('Condition', 'gutenverse'),
        //     panelArray: conditionPanel,
        //     initialOpen: false,
        //     pro: true
        // },
    ];
};